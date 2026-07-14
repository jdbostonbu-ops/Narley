import * as SecureStore from "expo-secure-store";

export type StoredProviderSession = {
  userId: string;
  token: string;
};

const SESSION_KEY = "provider.auth.session";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const parseStoredSession = (value: string): StoredProviderSession | null => {
  try {
    const parsed: unknown = JSON.parse(value);

    if (
      !isRecord(parsed) ||
      typeof parsed.userId !== "string" ||
      typeof parsed.token !== "string"
    ) {
      return null;
    }

    return { userId: parsed.userId, token: parsed.token };
  } catch {
    return null;
  }
};

export const loadProviderSession = async (): Promise<StoredProviderSession | null> => {
  const value = await SecureStore.getItemAsync(SESSION_KEY);
  return value === null ? null : parseStoredSession(value);
};

export const saveProviderSession = async (
  session: StoredProviderSession,
): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
};

export const clearProviderSession = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};

export const getProviderAuthToken = async (): Promise<string | null> => {
  const session = await loadProviderSession();
  return session?.token ?? null;
};
