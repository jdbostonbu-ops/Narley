import { nwsAlerts } from "./nwsAlerts";

type Location = {
  latitude: number;
  longitude: number;
};

type NwsFeature = Parameters<typeof nwsAlerts>[0][number];
type NwsAlert = ReturnType<typeof nwsAlerts>[number];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): boolean =>
  value === undefined || typeof value === "string";

const isNwsFeature = (value: unknown): value is NwsFeature => {
  if (!isRecord(value) || !isRecord(value.properties)) {
    return false;
  }

  const { event, headline, expires, severity } = value.properties;

  return typeof event === "string" &&
    isOptionalString(headline) &&
    isOptionalString(expires) &&
    isOptionalString(severity);
};

export const fetchNwsAlerts = async (
  location: Location,
): Promise<NwsAlert[]> => {
  try {
    const latitude = encodeURIComponent(String(location.latitude));
    const longitude = encodeURIComponent(String(location.longitude));
    const response = await fetch(
      `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`,
      {
        headers: {
          Accept: "application/geo+json",
          "User-Agent": "Narley/1.0",
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !Array.isArray(payload.features)) {
      return [];
    }

    return nwsAlerts(payload.features.filter(isNwsFeature));
  } catch {
    return [];
  }
};
