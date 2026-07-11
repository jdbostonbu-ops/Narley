type Resource = {
  status: string;
  expiresAt: Date;
};

export const isResourceVisible = (
  resource: Resource,
  now: Date,
): boolean =>
  resource.status === "ACTIVE" &&
  resource.expiresAt.getTime() > now.getTime();
