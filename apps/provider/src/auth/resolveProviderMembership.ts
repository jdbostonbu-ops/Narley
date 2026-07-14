export type DatabaseProviderMembership = {
  status: string;
  organizationId: string;
  organization: {
    status: string;
    active: boolean;
  };
};

export type ResolvedProviderMembership = {
  status: string;
  organizationId: string;
  org: {
    status: string;
    active: boolean;
  };
};

export const resolveProviderMembership = (
  membership: DatabaseProviderMembership | null,
): ResolvedProviderMembership | null =>
  membership === null
    ? null
    : {
        status: membership.status,
        organizationId: membership.organizationId,
        org: {
          status: membership.organization.status,
          active: membership.organization.active,
        },
      };
