(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley % cd "/Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley"
echo "=== createResource signature ==="
sed -n '1,60p' apps/provider/src/resources/createResource.ts
echo "=== PATCH /resources/:id ==="
sed -n '896,960p' server/index.ts
echo "=== DELETE /resources/:id ==="
sed -n '995,1040p' server/index.ts
=== createResource signature ===
import { canWritePin } from "../auth/canWritePin";
import { validateResource } from "./validateResource";

type ResourceInput = {
  title: string;
  address: string;
  [key: string]: unknown;
};

type Provider = {
  id: string;
};

type ExistingResource = {
  status: string;
};

type AuditEvent = {
  resourceId: string;
  providerId: string;
  event: "created";
  timestamp: Date;
};

type CreateResourceDependencies = {
  membership: Parameters<typeof canWritePin>[1];
  findActiveByTitleAndAddress: (
    title: string,
    address: string,
  ) => Promise<ExistingResource | null>;
  insert: (
    resource: ResourceInput & { providerId: string },
  ) => Promise<{ id: string }>;
  recordAuditEvent: (event: AuditEvent) => Promise<unknown>;
};

type CreateResourceResult =
  | {
      ok: true;
      error?: never;
    }
  | {
      ok: false;
      error: string;
    };

export const createResource = async (
  resource: ResourceInput,
  provider: Provider,
  {
    membership,
    findActiveByTitleAndAddress,
    insert,
    recordAuditEvent,
  }: CreateResourceDependencies,
): Promise<CreateResourceResult> => {
  if (!canWritePin(provider, membership)) {
    return {
      ok: false,
      error: "A verified, authorized Provider is required to create a resource.",
=== PATCH /resources/:id ===
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
=== DELETE /resources/:id ===
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
(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley % grep -n "model Membership\|model Organization" prisma/schema.prisma
27:model Organization {
37:model Membership {
(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley % 