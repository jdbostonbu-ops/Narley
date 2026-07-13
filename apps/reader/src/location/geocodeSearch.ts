export type SearchCoordinates = {
  latitude: number;
  longitude: number;
};

type GeocodeResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

export type GeocodeSearchFetcher = (url: string) => Promise<GeocodeResponse>;

type GeocodeSearchDependencies = {
  fetcher?: GeocodeSearchFetcher;
};

export type GeocodeSearchResult =
  | { ok: true; latitude: number; longitude: number; error?: never }
  | { ok: false; latitude?: never; longitude?: never; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const defaultFetcher: GeocodeSearchFetcher = async (url) => fetch(url);

const parseOpenMeteoCoordinates = (
  payload: unknown,
  query: string,
): SearchCoordinates | null => {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    return null;
  }

  const validResults = payload.results.filter((result): result is Record<string, unknown> =>
    isRecord(result) &&
    typeof result.latitude === "number" &&
    Number.isFinite(result.latitude) &&
    typeof result.longitude === "number" &&
    Number.isFinite(result.longitude));
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const exactResults = validResults.filter((result) =>
    typeof result.name === "string" &&
    result.name.trim().toLocaleLowerCase() === normalizedQuery);
  const exactResult = exactResults.reduce<Record<string, unknown> | undefined>(
    (mostPopulous, candidate) => {
      if (mostPopulous === undefined) {
        return candidate;
      }

      const currentPopulation = typeof mostPopulous.population === "number"
        ? mostPopulous.population
        : -1;
      const candidatePopulation = typeof candidate.population === "number"
        ? candidate.population
        : -1;

      return candidatePopulation > currentPopulation
        ? candidate
        : mostPopulous;
    },
    undefined,
  );
  const result = exactResult ?? validResults[0];

  return result === undefined
    ? null
    : {
        latitude: result.latitude as number,
        longitude: result.longitude as number,
      };
};

const parsePostalCoordinates = (payload: unknown): SearchCoordinates | null => {
  if (!isRecord(payload) || !Array.isArray(payload.places)) {
    return null;
  }

  const place: unknown = payload.places[0];

  if (!isRecord(place)) {
    return null;
  }

  const latitude = typeof place.latitude === "string"
    ? Number(place.latitude)
    : place.latitude;
  const longitude = typeof place.longitude === "string"
    ? Number(place.longitude)
    : place.longitude;

  return typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    typeof longitude === "number" &&
    Number.isFinite(longitude)
    ? { latitude, longitude }
    : null;
};

const getPostalFallbackUrl = (query: string): string | null => {
  if (/^\d{5}$/.test(query)) {
    return `https://api.zippopotam.us/us/${query}`;
  }

  const cityStateMatch = /^(.+),\s*([A-Za-z]{2})$/.exec(query);

  if (cityStateMatch === null) {
    return null;
  }

  const city = cityStateMatch[1].trim();
  const state = cityStateMatch[2].toLocaleUpperCase();

  return city.length === 0
    ? null
    : `https://api.zippopotam.us/us/${state}/${encodeURIComponent(city)}`;
};

export const geocodeSearch = async (
  query: string,
  { fetcher = defaultFetcher }: GeocodeSearchDependencies = {},
): Promise<GeocodeSearchResult> => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return { ok: false, error: "Enter a city or ZIP code" };
  }

  const url = [
    "https://geocoding-api.open-meteo.com/v1/search",
    `?name=${encodeURIComponent(trimmedQuery)}`,
    "&count=100",
    "&language=en",
    "&format=json",
    "&countryCode=US",
  ].join("");

  try {
    const response = await fetcher(url);
    const payload = response.ok ? await response.json() : null;
    const coordinates = parseOpenMeteoCoordinates(payload, trimmedQuery);

    if (coordinates !== null) {
      return { ok: true, ...coordinates };
    }

    const fallbackUrl = getPostalFallbackUrl(trimmedQuery);

    if (fallbackUrl === null) {
      return response.ok
        ? { ok: false, error: "Location not found" }
        : { ok: false, error: "Unable to search for that location" };
    }

    const fallbackResponse = await fetcher(fallbackUrl);

    if (!fallbackResponse.ok) {
      return { ok: false, error: "Location not found" };
    }

    const fallbackCoordinates = parsePostalCoordinates(
      await fallbackResponse.json(),
    );

    return fallbackCoordinates === null
      ? { ok: false, error: "Location not found" }
      : { ok: true, ...fallbackCoordinates };
  } catch {
    return { ok: false, error: "Unable to search for that location" };
  }
};
