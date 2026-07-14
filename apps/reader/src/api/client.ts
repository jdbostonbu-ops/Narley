import Constants from "expo-constants";

import { getReaderAuthToken } from "../auth/readerSessionStorage";

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

export type ReaderSignupApiResult =
  | { ok: true; userId: string; error?: never }
  | { ok: false; userId?: never; error: string };

export type ReaderVerifyApiResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

export type ReaderLoginApiResult = {
  session?: {
    userId: string;
    emailVerified: boolean;
  };
  token?: string;
  error?: string;
};

export type ReaderRequestResetApiResult =
  | { ok: true; message: string; error?: never }
  | { ok: false; message?: never; error: string };

export type ReaderConfirmResetApiResult =
  | { success: true; error?: never }
  | { success: false; error: string };

export type SavedResourceInput = {
  resourceId: string;
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  notes?: string;
  status?: string;
};

export type SavedResourceRecord = SavedResourceInput & {
  id: string;
  readerId: string;
  savedAt: Date;
};

export type ReaderReportInput = {
  resourceId: string;
  address: string;
  reason: string;
};

export type PostReportResult = {
  ok: true;
};

const configuredApiUrl = Constants.expoConfig?.extra?.apiUrl;
const configuredBaseUrl =
  typeof configuredApiUrl === "string" ? configuredApiUrl : undefined;

export const API_BASE_URL =
  configuredBaseUrl?.replace(/\/+$/, "") || "http://localhost:4000";

const getReaderAuthorizationHeaders = async (): Promise<Record<string, string>> => {
  const token = await getReaderAuthToken();
  return token === null ? {} : { Authorization: `Bearer ${token}` };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

type JsonRequestResult =
  | { ok: true; responseOk: boolean; payload: unknown; error?: never }
  | { ok: false; responseOk?: never; payload?: never; error: string };

const postJson = async (
  path: string,
  body: Record<string, string>,
): Promise<JsonRequestResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseBody = await response.text();

    try {
      const payload: unknown = JSON.parse(responseBody);
      return { ok: true, responseOk: response.ok, payload };
    } catch {
      return {
        ok: false,
        error: `API returned a non-JSON response (${response.status})`,
      };
    }
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to reach the API",
    };
  }
};

export const postReaderSignup = async (
  email: string,
  password: string,
): Promise<ReaderSignupApiResult> => {
  const response = await postJson("/reader/signup", { email, password });

  if (!response.ok) {
    return { ok: false, error: response.error };
  }

  if (
    response.responseOk &&
    isRecord(response.payload) &&
    response.payload.ok === true &&
    typeof response.payload.userId === "string"
  ) {
    return { ok: true, userId: response.payload.userId };
  }

  const error = isRecord(response.payload) && typeof response.payload.error === "string"
    ? response.payload.error
    : "Unable to create reader account";
  return { ok: false, error };
};

export const postReaderVerify = async (
  email: string,
  code: string,
): Promise<ReaderVerifyApiResult> => {
  const response = await postJson("/reader/verify", { email, code });

  if (!response.ok) {
    return { ok: false, error: response.error };
  }

  if (
    response.responseOk &&
    isRecord(response.payload) &&
    response.payload.ok === true
  ) {
    return { ok: true };
  }

  const error = isRecord(response.payload) && typeof response.payload.error === "string"
    ? response.payload.error
    : "Invalid or expired verification code";
  return { ok: false, error };
};

export const postReaderLogin = async (
  email: string,
  password: string,
): Promise<ReaderLoginApiResult> => {
  const response = await postJson("/reader/login", { email, password });

  if (!response.ok) {
    return { error: response.error };
  }

  if (isRecord(response.payload)) {
    const sessionValue = response.payload.session;

    if (
      response.responseOk &&
      isRecord(sessionValue) &&
      typeof sessionValue.userId === "string" &&
      typeof sessionValue.emailVerified === "boolean" &&
      typeof response.payload.token === "string"
    ) {
      return {
        session: {
          userId: sessionValue.userId,
          emailVerified: sessionValue.emailVerified,
        },
        token: response.payload.token,
      };
    }

    if (typeof response.payload.error === "string") {
      return { error: response.payload.error };
    }
  }

  return { error: "Unable to log in" };
};

export const postReaderRequestReset = async (
  email: string,
): Promise<ReaderRequestResetApiResult> => {
  const response = await postJson("/reader/request-reset", { email });

  if (!response.ok) {
    return { ok: false, error: response.error };
  }

  if (
    response.responseOk &&
    isRecord(response.payload) &&
    typeof response.payload.message === "string"
  ) {
    return { ok: true, message: response.payload.message };
  }

  const error = isRecord(response.payload) && typeof response.payload.error === "string"
    ? response.payload.error
    : "Unable to request password reset";
  return { ok: false, error };
};

export const postReaderConfirmReset = async (
  token: string,
  newPassword: string,
): Promise<ReaderConfirmResetApiResult> => {
  const response = await postJson("/reader/confirm-reset", { token, newPassword });

  if (!response.ok) {
    return { success: false, error: response.error };
  }

  if (
    response.responseOk &&
    isRecord(response.payload) &&
    response.payload.success === true
  ) {
    return { success: true };
  }

  const error = isRecord(response.payload) && typeof response.payload.error === "string"
    ? response.payload.error
    : "Reset link is invalid or expired";
  return { success: false, error };
};

export const postReport = async (
  report: ReaderReportInput,
): Promise<PostReportResult> => {
  const response = await postJson("/reports", {
    resourceId: report.resourceId,
    address: report.address,
    reason: report.reason,
  });

  if (!response.ok) {
    throw new Error(response.error);
  }

  if (
    response.responseOk &&
    isRecord(response.payload) &&
    (response.payload.ok === true || response.payload.success === true)
  ) {
    return { ok: true };
  }

  const error = isRecord(response.payload) && typeof response.payload.error === "string"
    ? response.payload.error
    : "Unable to submit report";
  throw new Error(error);
};

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

const parseSavedResource = (value: unknown): SavedResourceRecord | null => {
  if (!isRecord(value)) {
    return null;
  }

  const savedAt = new Date(
    typeof value.savedAt === "string" ? value.savedAt : Number.NaN,
  );

  if (
    typeof value.id !== "string" ||
    typeof value.readerId !== "string" ||
    typeof value.resourceId !== "string" ||
    typeof value.title !== "string" ||
    typeof value.category !== "string" ||
    typeof value.address !== "string" ||
    typeof value.latitude !== "number" ||
    !Number.isFinite(value.latitude) ||
    typeof value.longitude !== "number" ||
    !Number.isFinite(value.longitude) ||
    Number.isNaN(savedAt.getTime()) ||
    (value.notes !== null && value.notes !== undefined && typeof value.notes !== "string") ||
    (value.status !== null && value.status !== undefined && typeof value.status !== "string")
  ) {
    return null;
  }

  return {
    id: value.id,
    readerId: value.readerId,
    resourceId: value.resourceId,
    title: value.title,
    category: value.category,
    address: value.address,
    latitude: value.latitude,
    longitude: value.longitude,
    savedAt,
    ...(typeof value.notes === "string" ? { notes: value.notes } : {}),
    ...(typeof value.status === "string" ? { status: value.status } : {}),
  };
};

const readJsonPayload = async (response: Response): Promise<unknown> => {
  const body = await response.text();

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new Error(`API returned a non-JSON response (${response.status})`);
  }
};

const readApiError = (payload: unknown, fallback: string): string =>
  isRecord(payload) && typeof payload.error === "string"
    ? payload.error
    : fallback;

export const saveResource = async (
  resource: SavedResourceInput,
): Promise<SavedResourceRecord> => {
  const authorizationHeaders = await getReaderAuthorizationHeaders();
  const response = await fetch(`${API_BASE_URL}/reader/saved`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authorizationHeaders,
    },
    body: JSON.stringify({ resource }),
  });
  const payload = await readJsonPayload(response);

  if (!response.ok) {
    throw new Error(readApiError(payload, "Unable to save resource"));
  }

  const savedResource = isRecord(payload)
    ? parseSavedResource(payload.savedResource)
    : null;

  if (savedResource === null) {
    throw new Error("Invalid saved resource response");
  }

  return savedResource;
};

export const getSavedResources = async (): Promise<SavedResourceRecord[]> => {
  const authorizationHeaders = await getReaderAuthorizationHeaders();
  const response = await fetch(`${API_BASE_URL}/reader/saved`, {
    headers: authorizationHeaders,
  });
  const payload = await readJsonPayload(response);

  if (!response.ok) {
    throw new Error(readApiError(payload, "Unable to load saved resources"));
  }

  if (!isRecord(payload) || !Array.isArray(payload.savedResources)) {
    throw new Error("Invalid saved resources response");
  }

  const savedResources = payload.savedResources.map(parseSavedResource);

  if (savedResources.some((resource) => resource === null)) {
    throw new Error("Invalid saved resources response");
  }

  return savedResources.filter(
    (resource): resource is SavedResourceRecord => resource !== null,
  );
};

export const deleteSavedResource = async (id: string): Promise<void> => {
  const authorizationHeaders = await getReaderAuthorizationHeaders();
  const response = await fetch(`${API_BASE_URL}/reader/saved/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authorizationHeaders,
  });
  const payload = await readJsonPayload(response);

  if (!response.ok || !isRecord(payload) || payload.ok !== true) {
    throw new Error(readApiError(payload, "Unable to delete saved resource"));
  }
};
