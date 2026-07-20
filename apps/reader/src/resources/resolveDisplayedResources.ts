import { filterResourcesByZip } from "../../../provider/src/resources/filterResourcesByZip";

type ResourceAddress = {
  address: string;
};

export const resolveDisplayedResources = <Resource extends ResourceAddress>(
  resources: readonly Resource[],
  currentLocationZip: string | null,
  activeSearchZip: string | null,
): Resource[] => {
  const displayedZip = activeSearchZip ?? currentLocationZip;

  return displayedZip === null
    ? []
    : filterResourcesByZip(resources, displayedZip);
};
