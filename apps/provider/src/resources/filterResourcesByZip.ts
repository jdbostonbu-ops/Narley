import { extractZip } from "./extractZip";

type ResourceAddress = {
  address: string;
};

export const filterResourcesByZip = <Resource extends ResourceAddress>(
  resources: readonly Resource[],
  zip: string,
): Resource[] =>
  resources.filter((resource) => extractZip(resource.address) === zip);
