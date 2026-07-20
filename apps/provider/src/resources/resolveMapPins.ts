type ResourceCoordinates = {
  latitude?: number;
  longitude?: number;
};

type ResourceWithCoordinates<Resource> = Resource & {
  latitude: number;
  longitude: number;
};

export const resolveMapPins = <Resource extends ResourceCoordinates>(
  resources: readonly Resource[],
): Array<ResourceWithCoordinates<Resource>> =>
  resources.filter(
    (resource): resource is ResourceWithCoordinates<Resource> =>
      typeof resource.latitude === "number" &&
      Number.isFinite(resource.latitude) &&
      resource.latitude >= -90 &&
      resource.latitude <= 90 &&
      typeof resource.longitude === "number" &&
      Number.isFinite(resource.longitude) &&
      resource.longitude >= -180 &&
      resource.longitude <= 180,
  );
