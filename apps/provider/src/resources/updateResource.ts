type ResourceChanges = Record<string, unknown>;

type UpdateAuditEvent = {
  resourceId: string;
  event: "updated";
  timestamp: Date;
};

type UpdateResourceDependencies = {
  update: (
    resourceId: string,
    changes: ResourceChanges,
  ) => Promise<unknown>;
  insert: (resource: ResourceChanges) => Promise<unknown>;
  recordAuditEvent: (event: UpdateAuditEvent) => Promise<unknown>;
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
  await dependencies.recordAuditEvent({
    resourceId,
    event: "updated",
    timestamp: new Date(),
  });

  return { ok: true };
};
