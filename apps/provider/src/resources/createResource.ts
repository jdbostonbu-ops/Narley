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
    findActiveByTitleAndAddress,
    insert,
    recordAuditEvent,
  }: CreateResourceDependencies,
): Promise<CreateResourceResult> => {
  const existingResource = await findActiveByTitleAndAddress(
    resource.title,
    resource.address,
  );

  if (existingResource?.status === "ACTIVE") {
    return {
      ok: false,
      error: "Duplicate resource, unable to process",
    };
  }

  const createdResource = await insert({
    ...resource,
    providerId: provider.id,
  });

  await recordAuditEvent({
    resourceId: createdResource.id,
    providerId: provider.id,
    event: "created",
    timestamp: new Date(),
  });

  return { ok: true };
};
