import Constants from "expo-constants";

import { getProviderAuthToken } from "../auth/providerSessionStorage";

export type LoginResponse = {
  session?: {
    userId: string;
  };
  token?: string;
  error?: string;
};

export type RequestResetResponse =
  | { ok: true; message: string; error?: never }
  | { ok: false; message?: never; error: string };

export type ConfirmResetResponse =
  | { success: true; error?: never }
  | { success: false; error: string };

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

export type UpdateResourcePayload = Partial<Omit<
  ApiResource,
  "id" | "status" | "organizationId"
>>;

type UpdateResourceResult =
  | { ok: true; resource: ApiResource; error?: never }
  | { ok: false; resource?: never; error: string };

type DeleteResourceResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

export type ProviderReportPayload = {
  resourceTitle: string;
  address: string;
  phone?: string;
  website?: string;
  details: string;
};

export type SubmitProviderReportResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

export type ProviderAlertConfidence = "high" | "medium" | "low";

export type ProviderReportAlert = {
  id: string;
  kind: "report";
  resourceId: string | null;
  resourceTitle: string | null;
  address: string | null;
  reason: string | null;
  findings: string | null;
  confidence: ProviderAlertConfidence | null;
  uncertain: boolean;
  sources: readonly string[];
  createdAt: Date;
};

export type LoadProviderAlertsResult =
  | { ok: true; alerts: readonly ProviderReportAlert[]; error?: never }
  | { ok: false; alerts?: never; error: string };

export type DeleteProviderAlertResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

const configuredApiUrl = Constants.expoConfig?.extra?.apiUrl;
const configuredBaseUrl =
  typeof configuredApiUrl === "string" ? configuredApiUrl : undefined;

export const API_BASE_URL = configuredBaseUrl?.replace(/\/+$/, "") || "http://localhost:4000";

const getProviderAuthorizationHeaders = async (): Promise<Record<string, string>> => {
  const token = await getProviderAuthToken();
  return token === null ? {} : { Authorization: `Bearer ${token}` };
};

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

const parseNullableString = (value: unknown): string | null | undefined => {
  if (value === null) {
    return null;
  }

  return typeof value === "string" ? value : undefined;
};

const parseProviderReportAlert = (value: unknown): ProviderReportAlert | null => {
  if (!isRecord(value)) {
    return null;
  }

  const resourceId = parseNullableString(value.resourceId);
  const resourceTitle = parseNullableString(value.resourceTitle);
  const address = parseNullableString(value.address);
  const reason = parseNullableString(value.reason);
  const findings = parseNullableString(value.findings);
  const confidenceValue = parseNullableString(value.confidence);
  const confidence = confidenceValue === null ||
    confidenceValue === "high" ||
    confidenceValue === "medium" ||
    confidenceValue === "low"
    ? confidenceValue
    : undefined;
  const createdAt = new Date(
    typeof value.createdAt === "string" ? value.createdAt : Number.NaN,
  );

  if (
    typeof value.id !== "string" ||
    value.kind !== "report" ||
    resourceId === undefined ||
    resourceTitle === undefined ||
    address === undefined ||
    reason === undefined ||
    findings === undefined ||
    confidence === undefined ||
    typeof value.uncertain !== "boolean" ||
    !Array.isArray(value.sources) ||
    !value.sources.every((source) => typeof source === "string") ||
    Number.isNaN(createdAt.getTime())
  ) {
    return null;
  }

  return {
    id: value.id,
    kind: "report",
    resourceId,
    resourceTitle,
    address,
    reason,
    findings,
    confidence,
    uncertain: value.uncertain,
    sources: value.sources,
    createdAt,
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
  const token = typeof value.token === "string" ? value.token : undefined;

  if (
    (session === undefined || token === undefined) &&
    error === undefined
  ) {
    return { error: "Invalid server response" };
  }

  return {
    ...(session === undefined ? {} : { session }),
    ...(token === undefined ? {} : { token }),
    ...(error === undefined ? {} : { error }),
  };
};

const parseRequestResetResponse = (value: unknown): RequestResetResponse => {
  if (!isRecord(value) || typeof value.message !== "string") {
    return { ok: false, error: "Invalid server response" };
  }

  return { ok: true, message: value.message };
};

const parseConfirmResetResponse = (value: unknown): ConfirmResetResponse => {
  if (!isRecord(value) || typeof value.success !== "boolean") {
    return { success: false, error: "Invalid server response" };
  }

  if (value.success) {
    return { success: true };
  }

  return {
    success: false,
    error: typeof value.error === "string"
      ? value.error
      : "Reset link is invalid or expired",
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

export const postRequestReset = async (
  email: string,
): Promise<RequestResetResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/request-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const result = parseRequestResetResponse(parsedResponse.payload);

    if (!response.ok && result.ok) {
      return { ok: false, error: "Unable to request password reset" };
    }

    return result;
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error
        ? error.message
        : "Unable to request password reset",
    };
  }
};

export const postConfirmReset = async (
  token: string,
  newPassword: string,
): Promise<ConfirmResetResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/confirm-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { success: false, error: parsedResponse.error };
    }

    const result = parseConfirmResetResponse(parsedResponse.payload);

    if (!response.ok && result.success) {
      return { success: false, error: "Unable to reset password" };
    }

    return result;
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to reset password",
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

export const getProviderAlerts = async (): Promise<LoadProviderAlertsResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const response = await fetch(`${API_BASE_URL}/provider/alerts`, {
      headers: authorizationHeaders,
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload) || !Array.isArray(payload.alerts)) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to load provider alerts";
      return { ok: false, error };
    }

    const alerts = payload.alerts.map(parseProviderReportAlert);

    if (alerts.some((alert) => alert === null)) {
      return { ok: false, error: "Invalid provider alerts response" };
    }

    return {
      ok: true,
      alerts: alerts.filter((alert): alert is ProviderReportAlert => alert !== null),
    };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to load provider alerts",
    };
  }
};

export const deleteProviderAlert = async (
  id: string,
): Promise<DeleteProviderAlertResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const response = await fetch(`${API_BASE_URL}/provider/alerts/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authorizationHeaders,
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload) || payload.ok !== true) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to delete provider alert";
      return { ok: false, error };
    }

    return { ok: true };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error
        ? error.message
        : "Unable to delete provider alert",
    };
  }
};

export const postProviderReport = async (
  report: ProviderReportPayload,
): Promise<SubmitProviderReportResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const response = await fetch(`${API_BASE_URL}/provider/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeaders,
      },
      body: JSON.stringify(report),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!isRecord(payload) || payload.ok !== true) {
      return {
        ok: false,
        error: isRecord(payload) && typeof payload.error === "string"
          ? payload.error
          : "Unable to send report to Narley",
      };
    }

    return { ok: true };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to send report to Narley",
    };
  }
};

export const postResource = async (
  resource: CreateResourcePayload,
): Promise<CreateResourceResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const response = await fetch(`${API_BASE_URL}/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeaders,
      },
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

export const patchResource = async (
  resourceId: string,
  changes: UpdateResourcePayload,
): Promise<UpdateResourceResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const body = {
      ...changes,
      ...(Object.prototype.hasOwnProperty.call(changes, "phone")
        ? { phone: changes.phone ?? null }
        : {}),
      ...(Object.prototype.hasOwnProperty.call(changes, "website")
        ? { website: changes.website ?? null }
        : {}),
    };
    const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authorizationHeaders,
      },
      body: JSON.stringify(body),
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload)) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to update resource";
      return { ok: false, error };
    }

    const updatedResource = parseApiResource(payload.resource);
    return updatedResource === null
      ? { ok: false, error: "Invalid resource response" }
      : { ok: true, resource: updatedResource };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to update resource",
    };
  }
};

export const deleteResource = async (
  resourceId: string,
): Promise<DeleteResourceResult> => {
  try {
    const authorizationHeaders = await getProviderAuthorizationHeaders();
    const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
      method: "DELETE",
      headers: authorizationHeaders,
    });
    const parsedResponse = await readJsonResponse(response);

    if (!parsedResponse.ok) {
      return { ok: false, error: parsedResponse.error };
    }

    const payload = parsedResponse.payload;

    if (!response.ok || !isRecord(payload) || payload.ok !== true) {
      const error = isRecord(payload) && typeof payload.error === "string"
        ? payload.error
        : "Unable to delete resource";
      return { ok: false, error };
    }

    return { ok: true };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to delete resource",
    };
  }
};
