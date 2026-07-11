export const RESOURCE_STATUSES = ["ACTIVE", "EXPIRED"] as const;

export type ResourceStatus = (typeof RESOURCE_STATUSES)[number];

export const isValidResourceStatus = (
  value: unknown,
): value is ResourceStatus =>
  RESOURCE_STATUSES.some((status) => status === value);
