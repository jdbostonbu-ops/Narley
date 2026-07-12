import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

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
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
};

const AuthContext = createContext<ProviderAuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    dispatch({ type: "LOGIN_START" });

    const result = await postLogin(email, password);

    if (result.session !== undefined) {
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

  const logout = () => dispatch({ type: "LOGOUT" });

  const value = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      login,
      logout,
    }),
    [state.user, state.loading],
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
