import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { login } from "../apps/provider/src/auth/login";
import { validatePassword } from "../apps/provider/src/auth/passwordPolicy";
import { generateVerificationCode } from "../apps/reader/src/auth/generateVerificationCode";
import { readerLogin } from "../apps/reader/src/auth/readerLogin";
import { readerSignup } from "../apps/reader/src/auth/readerSignup";
import { verifyReaderEmailCode } from "../apps/reader/src/auth/verifyReaderEmailCode";
import { createResource } from "../apps/provider/src/resources/createResource";
import { updateResource } from "../apps/provider/src/resources/updateResource";
import { verifyReaderReport } from "../apps/provider/src/reports/verifyReaderReport";
import { callOpenAI } from "./openai";
import { prisma } from "./prisma";
import { sendVerificationEmail } from "./email";

const app = express();
app.use(cors());
app.use(express.json());

// Health check — confirms the server is up
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

type ReaderReport = {
  resourceId: string;
  address: string;
  reason: string;
};

const parseReaderReport = (value: unknown): ReaderReport | null => {
  if (!isRecord(value)) {
    return null;
  }

  const fields = [value.resourceId, value.address, value.reason];

  if (!fields.every((field) => typeof field === "string" && field.trim().length > 0)) {
    return null;
  }

  return {
    resourceId: String(value.resourceId).trim(),
    address: String(value.address).trim(),
    reason: String(value.reason).trim(),
  };
};

app.post("/reports", async (req, res) => {
  const report = parseReaderReport(req.body);

  if (report === null) {
    return res.status(400).json({ error: "resourceId, address, and reason are required" });
  }

  const alertCreation: {
    promise: ReturnType<typeof prisma.providerAlert.create> | null;
  } = { promise: null };

  try {
    const result = await verifyReaderReport(report, {
      callOpenAI,
      createProviderAlert: (alert) => {
        alertCreation.promise = prisma.providerAlert.create({
          data: {
            kind: "report",
            resourceId: alert.resourceId,
            address: alert.address,
            reason: alert.report.reason,
            findings: alert.findings,
            confidence: alert.confidence,
            uncertain: alert.uncertain,
            sources: alert.sources.map(({ url }) => url),
          },
        });

        return alertCreation.promise;
      },
    });

    if (!result.ok || alertCreation.promise === null) {
      return res.status(422).json({ ok: false, error: "Report could not be verified" });
    }

    await alertCreation.promise;
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: "Unable to verify report" });
  }
});

// POST /login — wires the tested login() to a real Prisma lookup
app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const result = await login(
    { email, password },
    {
      findUserByEmail: async (lookupEmail) =>
        prisma.user.findUnique({ where: { email: lookupEmail } }),
    },
  );

  if (result.error) {
    return res.status(401).json({ error: result.error });
  }

  return res.json({ session: result.session });
});

type ReaderAuthCredentials = {
  email: string;
  password: string;
};

const parseReaderAuthCredentials = (
  value: unknown,
): ReaderAuthCredentials | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.email !== "string" || typeof value.password !== "string") {
    return null;
  }

  return {
    email: value.email,
    password: value.password,
  };
};

app.post("/reader/signup", async (req, res) => {
  const credentials = parseReaderAuthCredentials(req.body);

  if (credentials === null) {
    return res.status(400).json({
      ok: false,
      error: "Email and password are required",
    });
  }

  try {
    const result = await readerSignup(credentials, {
      validatePassword,
      findUserByEmail: async (email) =>
        prisma.reader.findUnique({ where: { email } }),
      hashPassword: async (password) => bcrypt.hash(password, 12),
      createUser: async ({ email, passwordHash }) =>
        prisma.reader.create({
          data: {
            email,
            passwordHash,
            emailVerified: false,
          },
          select: {
            id: true,
            email: true,
            emailVerified: true,
          },
        }),
    });

    if (!result.ok) {
      const status = result.error === "An account with this email already exists"
        ? 409
        : 400;
      return res.status(status).json(result);
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        email: credentials.email,
        code,
        expiresAt,
        usedAt: null,
      },
    });
    await sendVerificationEmail(credentials.email, code);

    return res.status(201).json(result);
  } catch {
    return res.status(500).json({
      ok: false,
      error: "Unable to create reader account",
    });
  }
});

type ReaderVerificationRequest = {
  email: string;
  code: string;
};

const parseReaderVerificationRequest = (
  value: unknown,
): ReaderVerificationRequest | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.email !== "string" || typeof value.code !== "string") {
    return null;
  }

  return {
    email: value.email,
    code: value.code,
  };
};

app.post("/reader/verify", async (req, res) => {
  const input = parseReaderVerificationRequest(req.body);

  if (input === null) {
    return res.status(400).json({ ok: false });
  }

  try {
    const result = await verifyReaderEmailCode(input, {
      findCode: async (email, code) =>
        prisma.verificationCode.findFirst({
          where: { email, code },
          orderBy: { createdAt: "desc" },
        }),
      markEmailVerified: async (email) => {
        await prisma.reader.update({
          where: { email },
          data: { emailVerified: true },
        });
      },
      consumeCode: async (email, code) => {
        await prisma.verificationCode.updateMany({
          where: { email, code },
          data: { usedAt: new Date() },
        });
      },
    });

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch {
    return res.status(500).json({
      ok: false,
      error: "Unable to verify reader email",
    });
  }
});

app.post("/reader/login", async (req, res) => {
  const credentials = parseReaderAuthCredentials(req.body);

  if (credentials === null) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await readerLogin(credentials, {
      findUserByEmail: async (email) =>
        prisma.reader.findUnique({ where: { email } }),
      verifyPassword: async (password, passwordHash) =>
        bcrypt.compare(password, passwordHash),
    });

    if (result.error !== undefined) {
      return res.status(401).json({ error: result.error });
    }

    return res.json({ session: result.session });
  } catch {
    return res.status(500).json({ error: "Unable to log in reader" });
  }
});

type ResourceRequest = {
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  phone?: string;
  website?: string;
  notes: string;
  providerId: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readOptionalString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const parseResourceRequest = (value: unknown): ResourceRequest | null => {
  if (!isRecord(value)) {
    return null;
  }

  const expiresAt = new Date(
    typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
  );

  if (
    typeof value.title !== "string" ||
    typeof value.category !== "string" ||
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    typeof value.longitude !== "number" ||
    typeof value.providerId !== "string"
  ) {
    return null;
  }

  return {
    title: value.title,
    category: value.category,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    expiresAt,
    phone: readOptionalString(value.phone),
    website: readOptionalString(value.website),
    notes: typeof value.notes === "string" ? value.notes : "",
    providerId: value.providerId,
  };
};

app.post("/resources", async (req, res) => {
  const request = parseResourceRequest(req.body);

  if (request === null) {
    return res.status(400).json({ error: "Invalid resource data" });
  }

  const resourceInput = {
    title: request.title,
    category: request.category,
    address: request.address,
    latitude: request.latitude,
    longitude: request.longitude,
    expiresAt: request.expiresAt,
    phone: request.phone,
    website: request.website,
  };
  const creation: {
    resource: Awaited<ReturnType<typeof prisma.resource.create>> | null;
  } = { resource: null };

  try {
    const result = await createResource(
      resourceInput,
      { id: request.providerId },
      {
        membership: {
          status: "ACTIVE",
          org: { status: "VERIFIED", active: true },
        },
        findActiveByTitleAndAddress: async (title, address) =>
          prisma.resource.findFirst({
            where: { title, address, status: "ACTIVE" },
          }),
        insert: async (resource) => {
          creation.resource = await prisma.resource.create({
            data: {
              title: resource.title,
              category: request.category,
              address: resource.address,
              latitude: request.latitude,
              longitude: request.longitude,
              expiresAt: request.expiresAt,
              status: "ACTIVE",
              phone: request.phone,
              website: request.website,
              providerId: resource.providerId,
              organizationId: "org_hum",
            },
          });

          return { id: creation.resource.id };
        },
        recordAuditEvent: async (event) => prisma.auditEvent.create({ data: event }),
      },
    );

    if (!result.ok) {
      const status = result.error.includes("Duplicate") ? 409 : 400;
      return res.status(status).json({ error: result.error });
    }

    if (creation.resource === null) {
      return res.status(500).json({ error: "Resource was not created" });
    }

    return res.status(201).json({
      resource: {
        ...creation.resource,
        notes: request.notes,
      },
    });
  } catch {
    return res.status(500).json({ error: "Unable to create resource" });
  }
});

app.get("/resources", async (_req, res) => {
  try {
    const resources = await prisma.resource.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "asc" },
    });

    return res.json({
      resources: resources.map((resource) => ({
        id: resource.id,
        title: resource.title,
        category: resource.category,
        address: resource.address,
        latitude: resource.latitude,
        longitude: resource.longitude,
        expiresAt: resource.expiresAt,
        notes: "",
        status: resource.status,
        phone: resource.phone ?? undefined,
        website: resource.website ?? undefined,
        organizationId: resource.organizationId,
      })),
    });
  } catch {
    return res.status(500).json({ error: "Unable to load resources" });
  }
});

const parseResourceChanges = (
  value: unknown,
): Record<string, unknown> | null => {
  if (!isRecord(value)) {
    return null;
  }

  const changes: Record<string, unknown> = {};

  for (const field of ["title", "category", "address", "phone", "website", "notes"] as const) {
    if (typeof value[field] === "string" || value[field] === null) {
      changes[field] = value[field];
    }
  }

  for (const field of ["latitude", "longitude"] as const) {
    if (typeof value[field] === "number") {
      changes[field] = value[field];
    }
  }

  if (Object.prototype.hasOwnProperty.call(value, "expiresAt")) {
    changes.expiresAt = new Date(
      typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
    );
  }

  return changes;
};

app.patch("/resources/:id", async (req, res) => {
  const resourceId = req.params.id;
  const changes = parseResourceChanges(req.body);

  if (changes === null) {
    return res.status(400).json({ error: "Invalid resource changes" });
  }

  try {
    const currentResource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (currentResource === null) {
      return res.status(404).json({ error: "Resource not found" });
    }

    const membership = {
      status: "ACTIVE",
      organizationId: "org_hum",
      org: { status: "VERIFIED", active: true },
    };
    const updateResult: {
      resource: Awaited<ReturnType<typeof prisma.resource.update>> | null;
    } = { resource: null };
    const result = await updateResource(resourceId, changes, {
      resource: { organizationId: currentResource.organizationId },
      membership,
      update: async (id, approvedChanges) => {
        const data = {
          ...(typeof approvedChanges.title === "string"
            ? { title: approvedChanges.title }
            : {}),
          ...(typeof approvedChanges.category === "string"
            ? { category: approvedChanges.category }
            : {}),
          ...(typeof approvedChanges.address === "string"
            ? { address: approvedChanges.address }
            : {}),
          ...(typeof approvedChanges.latitude === "number"
            ? { latitude: approvedChanges.latitude }
            : {}),
          ...(typeof approvedChanges.longitude === "number"
            ? { longitude: approvedChanges.longitude }
            : {}),
          ...(approvedChanges.expiresAt instanceof Date
            ? { expiresAt: approvedChanges.expiresAt }
            : {}),
          ...(typeof approvedChanges.phone === "string" || approvedChanges.phone === null
            ? { phone: approvedChanges.phone }
            : {}),
          ...(typeof approvedChanges.website === "string" || approvedChanges.website === null
            ? { website: approvedChanges.website }
            : {}),
        };
        updateResult.resource = await prisma.resource.update({
          where: { id },
          data,
        });
        return updateResult.resource;
      },
      insert: async () => undefined,
      recordAuditEvent: async (event) => prisma.auditEvent.create({
        data: { ...event, providerId: currentResource.providerId },
      }),
      findActiveByTitleAndAddress: async (title, address) =>
        prisma.resource.findFirst({
          where: {
            title,
            ...(address === undefined ? {} : { address }),
            status: "ACTIVE",
          },
        }),
    });

    if (!result.ok) {
      const status = result.error.includes("authorized")
        ? 403
        : result.error.includes("Duplicate")
          ? 409
          : 400;
      return res.status(status).json({ error: result.error });
    }

    if (updateResult.resource === null) {
      return res.status(500).json({ error: "Resource was not updated" });
    }

    return res.json({
      resource: {
        ...updateResult.resource,
        notes: typeof changes.notes === "string" ? changes.notes : "",
      },
    });
  } catch {
    return res.status(500).json({ error: "Unable to update resource" });
  }
});

app.delete("/resources/:id", async (req, res) => {
  const resourceId = req.params.id;

  try {
    const currentResource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: { id: true },
    });

    if (currentResource === null) {
      return res.status(404).json({ error: "Resource not found" });
    }

    await prisma.resource.update({
      where: { id: resourceId },
      data: { status: "EXPIRED" },
    });

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to delete resource" });
  }
});

app.use((_req, res) => {
  return res.status(404).json({ error: "API endpoint not found" });
});

const jsonErrorHandler: ErrorRequestHandler = (_error, _req, res, _next) => {
  res.status(500).json({ error: "Internal server error" });
};

app.use(jsonErrorHandler);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Narley API running on http://localhost:${PORT}`);
});
