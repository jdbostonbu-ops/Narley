import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

import {
  postReaderLogin,
  postReaderSignup,
  postReaderVerify,
} from "../api/client";
import type { ReaderAuthState, ReaderUser } from "./resolveReaderAuthView";

type ReaderAuthAction =
  | { type: "SUCCESS"; user: ReaderUser }
  | { type: "RESTORE"; user: ReaderUser | null }
  | { type: "LOGOUT" };

type ReaderAuthResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

export type ReaderAuthContextValue = ReaderAuthState & {
  email: string | null;
  submitting: boolean;
  signup: (email: string, password: string) => Promise<ReaderAuthResult>;
  verify: (email: string, code: string) => Promise<ReaderAuthResult>;
  login: (email: string, password: string) => Promise<ReaderAuthResult>;
  logout: () => Promise<void>;
};

type StoredReaderSession = {
  user: ReaderUser;
  email: string;
};

const SESSION_KEY = "reader.auth.session";
const initialState: ReaderAuthState = { user: null, loading: true };

const reducer = (
  state: ReaderAuthState,
  action: ReaderAuthAction,
): ReaderAuthState => {
  switch (action.type) {
    case "SUCCESS":
      return { user: action.user, loading: false };
    case "RESTORE":
      return { user: action.user, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
  }
};

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
      user: {
        id: parsed.user.id,
        emailVerified: parsed.user.emailVerified,
      },
    };
  } catch {
    return null;
  }
};

const persistSession = async (
  user: ReaderUser,
  email: string,
): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify({ user, email }));
};

const ReaderAuthContext = createContext<ReaderAuthContextValue | null>(null);

export const ReaderAuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(SESSION_KEY);
        const storedSession = storedValue === null
          ? null
          : parseStoredSession(storedValue);

        if (!active) {
          return;
        }

        setEmail(storedSession?.email ?? null);
        dispatch({ type: "RESTORE", user: storedSession?.user ?? null });
      } catch {
        if (active) {
          setEmail(null);
          dispatch({ type: "RESTORE", user: null });
        }
      }
    };

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const signup = async (
    signupEmail: string,
    password: string,
  ): Promise<ReaderAuthResult> => {
    setSubmitting(true);
    try {
      const result = await postReaderSignup(signupEmail, password);

      if (!result.ok) {
        return { ok: false, error: result.error };
      }

      const user = { id: result.userId, emailVerified: false };
      await persistSession(user, signupEmail);
      setEmail(signupEmail);
      dispatch({ type: "SUCCESS", user });
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to save the reader session" };
    } finally {
      setSubmitting(false);
    }
  };

  const verify = async (
    verificationEmail: string,
    code: string,
  ): Promise<ReaderAuthResult> => {
    if (state.user === null) {
      return { ok: false, error: "No reader account is awaiting verification" };
    }

    setSubmitting(true);
    try {
      const result = await postReaderVerify(verificationEmail, code);

      if (!result.ok) {
        return { ok: false, error: result.error };
      }

      const user = { ...state.user, emailVerified: true };
      await persistSession(user, verificationEmail);
      setEmail(verificationEmail);
      dispatch({ type: "SUCCESS", user });
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to save the verified session" };
    } finally {
      setSubmitting(false);
    }
  };

  const login = async (
    loginEmail: string,
    password: string,
  ): Promise<ReaderAuthResult> => {
    setSubmitting(true);
    try {
      const result = await postReaderLogin(loginEmail, password);

      if (result.session === undefined) {
        return { ok: false, error: result.error ?? "Invalid email or password" };
      }

      const user = {
        id: result.session.userId,
        emailVerified: result.session.emailVerified,
      };
      await persistSession(user, loginEmail);
      setEmail(loginEmail);
      dispatch({ type: "SUCCESS", user });
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to save the reader session" };
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setEmail(null);
    dispatch({ type: "LOGOUT" });
  };

  const value = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      email,
      submitting,
      signup,
      verify,
      login,
      logout,
    }),
    [state.user, state.loading, email, submitting],
  );

  return createElement(ReaderAuthContext.Provider, { value }, children);
};

export const useReaderAuth = (): ReaderAuthContextValue => {
  const value = useContext(ReaderAuthContext);

  if (value === null) {
    throw new Error("useReaderAuth must be used inside ReaderAuthProvider");
  }

  return value;
};
