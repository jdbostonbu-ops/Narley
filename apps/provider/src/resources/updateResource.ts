import { canEditResource } from "./canEditResource";

type ResourceChanges = Record<string, unknown>;

type UpdateAuditEvent = {
  resourceId: string;
  event: "updated";
  timestamp: Date;
};

type ExistingResource = {
  id: string;
  status: string;
};

type Resource = {
  organizationId: string;
};

type Membership = {
  organizationId: string;
  status: string;
};

type UpdateResourceDependencies = {
  resource: Resource;
  membership: Membership | null;
  update: (
    resourceId: string,
    changes: ResourceChanges,
  ) => Promise<unknown>;
  insert: (resource: ResourceChanges) => Promise<unknown>;
  recordAuditEvent: (event: UpdateAuditEvent) => Promise<unknown>;
  findActiveByTitleAndAddress: (
    title: string,
    address?: string,
  ) => Promise<ExistingResource | null>;
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
  const editor = dependencies.membership === null ? null : { id: "editor" };

  if (
    !canEditResource(
      editor,
      dependencies.membership,
      dependencies.resource,
    )
  ) {
    return {
      ok: false,
      error: "Not authorized to edit this organization's resource.",
    };
  }

  if (Object.prototype.hasOwnProperty.call(changes, "expiresAt")) {
    const expiresAt = changes.expiresAt;
    const now = new Date();

    if (
      !(expiresAt instanceof Date) ||
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() < now.getTime()
    ) {
      return {
        ok: false,
        error: "Expiration date must be a valid future date.",
      };
    }

    const oneYearFromNow = new Date(now);
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (expiresAt.getTime() > oneYearFromNow.getTime()) {
      return {
        ok: false,
        error:
          "Resources can be active for a maximum of 1 year. Choose a date within 1 year — you can extend again later by posting a new pin.",
      };
    }
  }

  if (typeof changes.title === "string") {
    const address =
      typeof changes.address === "string" ? changes.address : undefined;
    const matchingResource =
      await dependencies.findActiveByTitleAndAddress(changes.title, address);

    if (
      matchingResource?.status === "ACTIVE" &&
      matchingResource.id !== resourceId
    ) {
      return {
        ok: false,
        error: "Duplicate resource — edit, report, or use Custom",
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
