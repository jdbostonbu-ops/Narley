type User = {
  id: string;
};

type Membership = {
  organizationId: string;
  status: string;
};

type Resource = {
  organizationId: string;
};

export const canEditResource = (
  user: User | null,
  membership: Membership | null,
  resource: Resource,
): boolean =>
  user !== null &&
  membership !== null &&
  membership.status === "ACTIVE" &&
  membership.organizationId === resource.organizationId;
