import Constants from "expo-constants";

export type ApiResource = {
  id: string;
  title: string;
  category: string;
  status: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  notes: string;
};

const configuredApiUrl = Constants.expoConfig?.extra?.apiUrl;
const configuredBaseUrl =
  typeof configuredApiUrl === "string" ? configuredApiUrl : undefined;

export const API_BASE_URL =
  configuredBaseUrl?.replace(/\/+$/, "") || "http://localhost:4000";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const parseResource = (value: unknown): ApiResource | null => {
  if (!isRecord(value)) {
    return null;
  }

  const expiresAt = new Date(
    typeof value.expiresAt === "string" ? value.expiresAt : Number.NaN,
  );

  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.category !== "string" ||
    typeof value.status !== "string" ||
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    !Number.isFinite(value.latitude) ||
    typeof value.longitude !== "number" ||
    !Number.isFinite(value.longitude) ||
    Number.isNaN(expiresAt.getTime()) ||
    typeof value.notes !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title,
    category: value.category,
    status: value.status,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    expiresAt,
    notes: value.notes,
  };
};

export const getResources = async (): Promise<ApiResource[]> => {
  const response = await fetch(`${API_BASE_URL}/resources`);
  const body = await response.text();
  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error(`API returned a non-JSON response (${response.status})`);
  }

  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.error === "string"
      ? payload.error
      : "Unable to load resources";
    throw new Error(message);
  }

  if (!isRecord(payload) || !Array.isArray(payload.resources)) {
    throw new Error("Invalid resource response");
  }

  const resources = payload.resources.map(parseResource);

  if (resources.some((resource) => resource === null)) {
    throw new Error("Invalid resource response");
  }

  return resources.filter(
    (resource): resource is ApiResource => resource !== null,
  );
};
