export type LoginResponse = {
  session?: {
    userId: string;
  };
  error?: string;
};

export type ApiResource = {
  id: string;
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  expiresAt: Date;
  notes: string;
  status: string;
  phone?: string;
  website?: string;
  organizationId: string;
};

export type CreateResourcePayload = Omit<
  ApiResource,
  "id" | "status" | "organizationId"
> & {
  providerId: string;
};

type LoadResourcesResult =
  | { ok: true; resources: readonly ApiResource[]; error?: never }
  | { ok: false; resources?: never; error: string };

type CreateResourceResult =
  | { ok: true; resource: ApiResource; error?: never }
  | { ok: false; resource?: never; error: string };

const configuredBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const API_BASE_URL = configuredBaseUrl?.replace(/\/+$/, "") || "http://localhost:4000";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

type JsonResponseResult =
  | { ok: true; payload: unknown; error?: never }
  | { ok: false; payload?: never; error: string };

const readJsonResponse = async (response: Response): Promise<JsonResponseResult> => {
  const body = await response.text();

  try {
    const payload: unknown = JSON.parse(body);
    return { ok: true, payload };
  } catch {
    return {
      ok: false,
      error: `API returned a non-JSON response (${response.status})`,
    };
  }
};

const parseApiResource = (value: unknown): ApiResource | null => {
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
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    typeof value.longitude !== "number" ||
    Number.isNaN(expiresAt.getTime()) ||
    typeof value.notes !== "string" ||
    typeof value.status !== "string" ||
    typeof value.organizationId !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title,
    category: value.category,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    expiresAt,
    notes: value.notes,
    status: value.status,
    organizationId: value.organizationId,
    ...(typeof value.phone === "string" ? { phone: value.phone } : {}),
    ...(typeof value.website === "string" ? { website: value.website } : {}),
  };
};

const parseLoginResponse = (value: unknown): LoginResponse => {
  if (!isRecord(value)) {
    return { error: "Invalid server response" };
  }

  const error = typeof value.error === "string" ? value.error : undefined;
  const sessionValue = value.session;
  const session = isRecord(sessionValue) && typeof sessionValue.userId === "string"
    ? { userId: sessionValue.userId }
    : undefined;

  if (session === undefined && error === undefined) {
    return { error: "Invalid server response" };
  }

  return {
    ...(session === undefined ? {} : { session }),
    ...(error === undefined ? {} : { error }),
  };
};

export const postLogin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { error: parsedResponse.error };
    }

    const result = parseLoginResponse(parsedResponse.payload);

    if (!response.ok && result.error === undefined) {
      return { error: "Login request failed" };
    }

    return result;
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "Login request failed",
    };
  }
};

export const getResources = async (): Promise<LoadResourcesResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources`);
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload) || !Array.isArray(payload.resources)) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to load resources";
      return { ok: false, error };
    }

    const resources = payload.resources.map(parseApiResource);

    if (resources.some((resource) => resource === null)) {
      return { ok: false, error: "Invalid resource response" };
    }

    return {
      ok: true,
      resources: resources.filter((resource): resource is ApiResource => resource !== null),
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to load resources",
    };
  }
};

export const postResource = async (
  resource: CreateResourcePayload,
): Promise<CreateResourceResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload)) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to create resource";
      return { ok: false, error };
    }

    const createdResource = parseApiResource(payload.resource);

    return createdResource === null
      ? { ok: false, error: "Invalid resource response" }
      : { ok: true, resource: createdResource };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to create resource",
    };
  }
};
