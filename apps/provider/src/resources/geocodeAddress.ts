type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeocodeDependencies = {
  geocode: (address: string) => Promise<Coordinates | null>;
};

type GeocodeAddressResult =
  | {
      ok: true;
      latitude: number;
      longitude: number;
      error?: never;
    }
  | {
      ok: false;
      error?: string;
      latitude?: never;
      longitude?: never;
    };

export const geocodeAddress = async (
  address: string,
  { geocode }: GeocodeDependencies,
): Promise<GeocodeAddressResult> => {
  try {
    const coordinates = await geocode(address);

    if (coordinates === null) {
      return {
        ok: false,
        error: "Invalid address",
      };
    }

    return {
      ok: true,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };
  } catch {
    return { ok: false };
  }
};
