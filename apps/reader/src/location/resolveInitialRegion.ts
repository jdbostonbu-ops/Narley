type Coordinates = {
  latitude: number;
  longitude: number;
};

type MapRegion = Coordinates & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export const resolveInitialRegion = (
  location: Coordinates | null,
  fallbackRegion: MapRegion,
): MapRegion => {
  if (location === null) {
    return fallbackRegion;
  }

  return {
    ...fallbackRegion,
    latitude: location.latitude,
    longitude: location.longitude,
  };
};
