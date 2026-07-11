type ResourceChanges = Record<string, unknown>;

type UpdateResourceDependencies = {
  update: (
    resourceId: string,
    changes: ResourceChanges,
  ) => Promise<unknown>;
  insert: (resource: ResourceChanges) => Promise<unknown>;
};

type UpdateResourceResult = {
  ok: true;
};

export const updateResource = async (
  resourceId: string,
  changes: ResourceChanges,
  dependencies: UpdateResourceDependencies,
): Promise<UpdateResourceResult> => {
  await dependencies.update(resourceId, changes);

  return { ok: true };
};
