import { canWritePin } from "../auth/canWritePin";

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
    };
  }

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
