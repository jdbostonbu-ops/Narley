import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { login } from "../apps/provider/src/auth/login";
import { createResource } from "../apps/provider/src/resources/createResource";
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
