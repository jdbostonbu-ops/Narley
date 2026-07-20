import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const ZIP_PATTERN = /^(\d{5})(?:-\d{4})?$/;

export const getZipForLocation = async (
  location: Coordinates,
): Promise<string | null> => {
  try {
    const addresses = await Location.reverseGeocodeAsync(location);

    for (const address of addresses) {
      const postalCode = address.postalCode?.trim();

      if (postalCode === undefined) {
        continue;
      }

      const match = ZIP_PATTERN.exec(postalCode);

      if (match !== null) {
        return match[1];
      }
    }

    return null;
  } catch {
    return null;
  }
};
