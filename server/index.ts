import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { login } from "../apps/provider/src/auth/login";
import { createResource } from "../apps/provider/src/resources/createResource";
import { updateResource } from "../apps/provider/src/resources/updateResource";
import { prisma } from "./prisma";

const app = express();
app.use(cors());
app.use(express.json());

// Health check — confirms the server is up
app.get("/health", (_req, res) => {
  res.json({ ok: true });
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
