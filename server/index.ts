import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { login } from "../apps/provider/src/auth/login";
import { validatePassword } from "../apps/provider/src/auth/passwordPolicy";
import {
  confirmPasswordReset,
  requestPasswordReset,
} from "../apps/provider/src/auth/passwordReset";
import { generateVerificationCode } from "../apps/reader/src/auth/generateVerificationCode";
import { readerLogin } from "../apps/reader/src/auth/readerLogin";
import { readerSignup } from "../apps/reader/src/auth/readerSignup";
import { verifyReaderEmailCode } from "../apps/reader/src/auth/verifyReaderEmailCode";
import { createResource } from "../apps/provider/src/resources/createResource";
import { updateResource } from "../apps/provider/src/resources/updateResource";
import { verifyReaderReport } from "../apps/provider/src/reports/verifyReaderReport";
import { callOpenAI } from "./openai";
import { signAuthToken } from "./authToken";
import { prisma } from "./prisma";
import {
  sendPasswordResetEmail,
  sendReaderPasswordResetEmail,
  sendVerificationEmail,
} from "./email";

const app = express();
app.use(cors());
app.use(express.json());

// Health check — confirms the server is up
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const RESET_REQUEST_MESSAGE =
  "If that email is registered, a reset link is on its way.";

const providerPasswordResetDependencies = {
  findUserByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    }),
  saveResetToken: (userId: string, token: string, expiresAt: Date) =>
    prisma.resetToken.create({
      data: { userId, token, expiresAt },
    }),
  sendResetEmail: (email: string, token: string) =>
    sendPasswordResetEmail(email, token),
  findResetToken: (token: string) =>
    prisma.resetToken.findUnique({
      where: { token },
      select: { userId: true, expiresAt: true, usedAt: true },
    }),
  updatePassword: (userId: string, passwordHash: string) =>
    prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    }),
  consumeResetToken: (token: string) =>
    prisma.resetToken.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  invalidateSessions: (_userId: string): Promise<void> => Promise.resolve(),
};

app.post("/request-reset", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  try {
    const result = await requestPasswordReset(
      email,
      providerPasswordResetDependencies,
    );
    return res.json(result);
  } catch (error: unknown) {
    console.error("Provider password-reset request failed:", error);
    return res.json({ message: RESET_REQUEST_MESSAGE });
  }
});

app.post("/confirm-reset", async (req, res) => {
  const token = typeof req.body?.token === "string" ? req.body.token.trim() : "";
  const newPassword = typeof req.body?.newPassword === "string"
    ? req.body.newPassword
    : "";
  const passwordValidation = validatePassword(newPassword);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      error: passwordValidation.errors.join(" "),
    });
  }

  if (token.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Reset link is invalid or expired",
    });
  }

  try {
    const result = await confirmPasswordReset(
      { token, newPassword },
      providerPasswordResetDependencies,
    );

    return result.success
      ? res.json(result)
      : res.status(400).json({
        success: false,
        error: "Reset link is invalid or expired",
      });
  } catch (error: unknown) {
    console.error("Provider password-reset confirmation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
});

const readerPasswordResetDependencies = {
  findUserByEmail: async (email: string) => {
    const reader = await prisma.reader.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    console.log(
      "[Narley] Reader password reset lookup:",
      reader === null ? "not found" : reader.id,
    );
    return reader;
  },
  saveResetToken: (readerId: string, token: string, expiresAt: Date) =>
    prisma.readerResetToken.create({
      data: { readerId, token, expiresAt },
    }),
  sendResetEmail: async (email: string, token: string) => {
    console.log("[Narley] Calling Resend for reader password reset:", {
      recipient: email,
      from: "onboarding@resend.dev",
    });

    try {
      await sendReaderPasswordResetEmail(email, token);
      console.log("[Narley] Reader password reset Resend call completed successfully");
    } catch (error: unknown) {
      console.error("[Narley] Reader password reset Resend call failed:", error);
      throw error;
    }
  },
  findResetToken: async (token: string) => {
    const resetToken = await prisma.readerResetToken.findUnique({
      where: { token },
      select: { readerId: true, expiresAt: true, usedAt: true },
    });

    return resetToken === null
      ? null
      : {
        userId: resetToken.readerId,
        expiresAt: resetToken.expiresAt,
        usedAt: resetToken.usedAt,
      };
  },
  updatePassword: (readerId: string, passwordHash: string) =>
    prisma.reader.update({
      where: { id: readerId },
      data: { passwordHash },
    }),
  consumeResetToken: (token: string) =>
    prisma.readerResetToken.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  invalidateSessions: (_readerId: string): Promise<void> => Promise.resolve(),
};

app.post("/reader/request-reset", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  console.log("[Narley] /reader/request-reset email received:", email);

  try {
    const result = await requestPasswordReset(
      email,
      readerPasswordResetDependencies,
    );
    return res.json(result);
  } catch (error: unknown) {
    console.error("Reader password-reset request failed:", error);
    return res.json({ message: RESET_REQUEST_MESSAGE });
  }
});

app.post("/reader/confirm-reset", async (req, res) => {
  const token = typeof req.body?.token === "string" ? req.body.token.trim() : "";
  const newPassword = typeof req.body?.newPassword === "string"
    ? req.body.newPassword
    : "";
  const passwordValidation = validatePassword(newPassword);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      success: false,
      error: passwordValidation.errors.join(" "),
    });
  }

  if (token.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Reset link is invalid or expired",
    });
  }

  try {
    const result = await confirmPasswordReset(
      { token, newPassword },
      readerPasswordResetDependencies,
    );

    return result.success
      ? res.json(result)
      : res.status(400).json({
        success: false,
        error: "Reset link is invalid or expired",
      });
  } catch (error: unknown) {
    console.error("Reader password-reset confirmation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
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
    const resource = await prisma.resource.findUnique({
      where: { id: report.resourceId },
      select: { title: true },
    });

    if (resource === null) {
      return res.status(404).json({ ok: false, error: "Resource not found" });
    }

    const result = await verifyReaderReport(report, {
      callOpenAI: (readerReport) =>
        callOpenAI({
          ...readerReport,
          title: resource.title,
        }),
      createProviderAlert: (alert) => {
        alertCreation.promise = prisma.providerAlert.create({
          data: {
            kind: "report",
            resourceId: alert.resourceId,
            resourceTitle: resource.title,
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

app.get("/provider/alerts", async (_req, res) => {
  try {
    const alerts = await prisma.providerAlert.findMany({
      where: { kind: "report" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        kind: true,
        resourceId: true,
        resourceTitle: true,
        address: true,
        reason: true,
        findings: true,
        confidence: true,
        uncertain: true,
        sources: true,
        createdAt: true,
      },
    });

    const missingTitleResourceIds = alerts.flatMap((alert) =>
      alert.resourceTitle === null && alert.resourceId !== null
        ? [alert.resourceId]
        : []);
    const resources = missingTitleResourceIds.length === 0
      ? []
      : await prisma.resource.findMany({
        where: { id: { in: missingTitleResourceIds } },
        select: { id: true, title: true },
      });
    const resourceTitles = new Map(
      resources.map((resource) => [resource.id, resource.title]),
    );
    const alertsWithTitles = alerts.map((alert) => ({
      ...alert,
      resourceTitle: alert.resourceTitle ??
        (alert.resourceId === null ? null : resourceTitles.get(alert.resourceId) ?? null),
    }));

    return res.json({ alerts: alertsWithTitles });
  } catch {
    return res.status(500).json({
      alerts: [],
      error: "Unable to load provider alerts",
    });
  }
});

app.delete("/provider/alerts/:id", async (req, res) => {
  try {
    await prisma.providerAlert.delete({
      where: { id: req.params.id },
    });

    return res.json({ ok: true });
  } catch (error: unknown) {
    console.error("Unable to delete provider alert:", error);
    return res.status(500).json({
      ok: false,
      error: "Unable to delete provider alert",
    });
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

  if (result.error || result.session === undefined) {
    return res.status(401).json({ error: result.error });
  }

  const token = signAuthToken({
    userId: result.session.userId,
    type: "provider",
  });
  return res.json({ session: result.session, token });
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

    if (result.error !== undefined || result.session === undefined) {
      return res.status(401).json({ error: result.error });
    }

    const token = signAuthToken({
      userId: result.session.userId,
      type: "reader",
    });
    return res.json({ session: result.session, token });
  } catch {
    return res.status(500).json({ error: "Unable to log in reader" });
  }
});

type SavedResourceRequest = {
  readerId: string;
  resource: {
    resourceId: string;
    title: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    notes?: string;
    status?: string;
  };
};

const parseSavedResourceRequest = (
  value: unknown,
): SavedResourceRequest | null => {
  if (!isRecord(value) || !isRecord(value.resource)) {
    return null;
  }

  const resource = value.resource;

  if (
    typeof value.readerId !== "string" ||
    typeof resource.resourceId !== "string" ||
    typeof resource.title !== "string" ||
    typeof resource.category !== "string" ||
    typeof resource.address !== "string" ||
    typeof resource.latitude !== "number" ||
    !Number.isFinite(resource.latitude) ||
    typeof resource.longitude !== "number" ||
    !Number.isFinite(resource.longitude) ||
    (resource.notes !== undefined && typeof resource.notes !== "string") ||
    (resource.status !== undefined && typeof resource.status !== "string")
  ) {
    return null;
  }

  return {
    readerId: value.readerId,
    resource: {
      resourceId: resource.resourceId,
      title: resource.title,
      category: resource.category,
      address: resource.address,
      latitude: resource.latitude,
      longitude: resource.longitude,
      ...(typeof resource.notes === "string" ? { notes: resource.notes } : {}),
      ...(typeof resource.status === "string" ? { status: resource.status } : {}),
    },
  };
};

app.post("/reader/saved", async (req, res) => {
  const request = parseSavedResourceRequest(req.body);

  if (request === null) {
    return res.status(400).json({ error: "Invalid saved resource data" });
  }

  const data = {
    readerId: request.readerId,
    ...request.resource,
  };

  try {
    try {
      const savedResource = await prisma.savedResource.create({ data });
      return res.status(201).json({ savedResource });
    } catch (error: unknown) {
      const existingSavedResource = await prisma.savedResource.findUnique({
        where: {
          readerId_resourceId: {
            readerId: request.readerId,
            resourceId: request.resource.resourceId,
          },
        },
      });

      if (existingSavedResource !== null) {
        return res.json({ savedResource: existingSavedResource });
      }

      throw error;
    }
  } catch {
    return res.status(500).json({ error: "Unable to save resource" });
  }
});

app.get("/reader/saved", async (req, res) => {
  const readerId = req.query.readerId;

  if (typeof readerId !== "string" || readerId.length === 0) {
    return res.status(400).json({ error: "readerId is required" });
  }

  try {
    const savedResources = await prisma.savedResource.findMany({
      where: { readerId },
      orderBy: { savedAt: "desc" },
    });
    return res.json({ savedResources });
  } catch {
    return res.status(500).json({ error: "Unable to load saved resources" });
  }
});

app.delete("/reader/saved/:id", async (req, res) => {
  try {
    await prisma.savedResource.delete({ where: { id: req.params.id } });
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unable to delete saved resource" });
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
      where: {
        status: "ACTIVE",
        expiresAt: { gt: new Date() },
      },
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
