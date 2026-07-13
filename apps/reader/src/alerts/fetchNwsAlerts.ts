import { nwsAlerts } from "./nwsAlerts";

type Location = {
  latitude: number;
  longitude: number;
};

type NwsFeature = Parameters<typeof nwsAlerts>[0][number];
type NwsAlert = ReturnType<typeof nwsAlerts>[number];

type FetchNwsAlertsOptions = {
  throwOnError?: boolean;
};

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
  options: FetchNwsAlertsOptions = {},
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
      if (options.throwOnError) {
        throw new Error("Unable to load NWS alerts");
      }

      return [];
    }

    const payload: unknown = await response.json();

    if (!isRecord(payload) || !Array.isArray(payload.features)) {
      if (options.throwOnError) {
        throw new Error("Invalid NWS alerts response");
      }

      return [];
    }

    return nwsAlerts(payload.features.filter(isNwsFeature));
  } catch (error: unknown) {
    if (options.throwOnError) {
      throw error;
    }

    return [];
  }
};
