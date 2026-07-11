import { isResourceVisible } from "./isResourceVisible";

type ResourceVisibilityFields = {
  status: string;
  expiresAt: Date;
};

export const getReaderVisibleResources = <
  Resource extends ResourceVisibilityFields,
>(resources: readonly Resource[], now: Date): Resource[] =>
  resources.filter((resource) => isResourceVisible(resource, now));
