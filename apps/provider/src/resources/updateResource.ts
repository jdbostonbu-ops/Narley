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

type UpdateResourceResult =
  | {
      ok: true;
      error?: never;
    }
  | {
      ok: false;
      error: string;
    };

export const updateResource = async (
  resourceId: string,
  changes: ResourceChanges,
  dependencies: UpdateResourceDependencies,
): Promise<UpdateResourceResult> => {
  if (Object.prototype.hasOwnProperty.call(changes, "expiresAt")) {
    const expiresAt = changes.expiresAt;

    if (
      !(expiresAt instanceof Date) ||
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() < Date.now()
    ) {
      return {
        ok: false,
        error: "Expiration date must be a valid future date.",
      };
    }
  }

  await dependencies.update(resourceId, changes);
  await dependencies.recordAuditEvent({
    resourceId,
    event: "updated",
    timestamp: new Date(),
  });

  return { ok: true };
};
