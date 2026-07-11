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

type CreateResourceDependencies = {
  findActiveByTitleAndAddress: (
    title: string,
    address: string,
  ) => Promise<ExistingResource | null>;
  insert: (
    resource: ResourceInput & { providerId: string },
  ) => Promise<unknown>;
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

  await insert({
    ...resource,
    providerId: provider.id,
  });

  return { ok: true };
};
