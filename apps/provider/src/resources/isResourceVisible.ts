type Resource = {
  status: string;
  expiresAt: Date;
};
export const isResourceVisible = <T extends Resource>(
  resource: T,
  now: Date,
): boolean =>
  resource.status === "ACTIVE" &&
  resource.expiresAt.getTime() > now.getTime();
