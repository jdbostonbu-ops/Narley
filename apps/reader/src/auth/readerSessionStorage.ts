import * as SecureStore from "expo-secure-store";

import type { ReaderUser } from "./resolveReaderAuthView";

export type StoredReaderSession = {
  user: ReaderUser;
  email: string;
  token: string | null;
};

const SESSION_KEY = "reader.auth.session";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const parseStoredSession = (value: string): StoredReaderSession | null => {
  try {
    const parsed: unknown = JSON.parse(value);

    if (!isRecord(parsed) || !isRecord(parsed.user)) {
      return null;
    }

    if (
      typeof parsed.email !== "string" ||
      typeof parsed.user.id !== "string" ||
      typeof parsed.user.emailVerified !== "boolean"
    ) {
      return null;
    }

    return {
      email: parsed.email,
      token: typeof parsed.token === "string" ? parsed.token : null,
      user: {
        id: parsed.user.id,
        emailVerified: parsed.user.emailVerified,
      },
    };
  } catch {
    return null;
  }
};

export const loadReaderSession = async (): Promise<StoredReaderSession | null> => {
  const value = await SecureStore.getItemAsync(SESSION_KEY);
  return value === null ? null : parseStoredSession(value);
};

export const saveReaderSession = async (
  session: StoredReaderSession,
): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
};

export const clearReaderSession = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};

export const getReaderAuthToken = async (): Promise<string | null> => {
  const session = await loadReaderSession();
  return session?.token ?? null;
};
