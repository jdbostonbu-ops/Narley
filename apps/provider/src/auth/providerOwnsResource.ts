export type OrganizationOwner = {
  organizationId: string | null;
};

export const providerOwnsResource = (
  provider: OrganizationOwner,
  resource: OrganizationOwner,
): boolean =>
  provider.organizationId !== null &&
  resource.organizationId !== null &&
  provider.organizationId === resource.organizationId;
