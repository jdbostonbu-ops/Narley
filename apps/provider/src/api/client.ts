export type LoginResponse = {
  session?: {
    userId: string;
  };
  error?: string;
};

const configuredBaseUrl = process.env.EXPO_PUBLIC_API_URL;

export const API_BASE_URL = configuredBaseUrl?.replace(/\/+$/, "") || "http://localhost:4000";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

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
    const payload: unknown = await response.json();
    const result = parseLoginResponse(payload);

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
