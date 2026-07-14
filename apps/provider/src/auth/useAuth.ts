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

import { postLogin } from "../api/client";
import {
  authReducer,
  initialAuthState,
  type ProviderUser,
} from "./authState";

type LoginResult =
  | { ok: true; error?: never }
  | { ok: false; error: string };

export type ProviderAuthState = {
  user: ProviderUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
};

type StoredProviderSession = {
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

const AuthContext = createContext<ProviderAuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [token, setToken] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(SESSION_KEY);
        const session = storedValue === null
          ? null
          : parseStoredSession(storedValue);

        if (!active) {
          return;
        }

        if (session === null) {
          setToken(null);
          dispatch({ type: "LOGOUT" });
        } else {
          setToken(session.token);
          dispatch({
            type: "LOGIN_SUCCESS",
            user: { id: session.userId },
          });
        }
      } catch {
        if (active) {
          setToken(null);
          dispatch({ type: "LOGOUT" });
        }
      } finally {
        if (active) {
          setRestoring(false);
        }
      }
    };

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    dispatch({ type: "LOGIN_START" });

    const result = await postLogin(email, password);

    if (result.session !== undefined && result.token !== undefined) {
      try {
        await SecureStore.setItemAsync(
          SESSION_KEY,
          JSON.stringify({
            userId: result.session.userId,
            token: result.token,
          }),
        );
      } catch {
        dispatch({ type: "LOGIN_FAILURE" });
        return { ok: false, error: "Unable to save the provider session" };
      }

      setToken(result.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        user: { id: result.session.userId },
      });
      return { ok: true };
    }

    const error = result.error ?? "Login request failed";
    dispatch({ type: "LOGIN_FAILURE" });
    return { ok: false, error };
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setToken(null);
    dispatch({ type: "LOGOUT" });
  };

  const value = useMemo(
    () => ({
      user: state.user,
      token,
      loading: state.loading || restoring,
      login,
      logout,
    }),
    [state.user, state.loading, token, restoring],
  );

  return createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): ProviderAuthState => {
  const value = useContext(AuthContext);

  if (value === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
};
