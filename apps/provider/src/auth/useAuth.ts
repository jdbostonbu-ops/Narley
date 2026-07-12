import { useReducer } from "react";

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

export const useAuth = (): ProviderAuthState => {
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

  return {
    user: state.user,
    loading: state.loading,
    login,
    logout,
  };
};
