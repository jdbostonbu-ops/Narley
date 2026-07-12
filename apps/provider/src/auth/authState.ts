export type ProviderUser = {
  id: string;
};

export type AuthState = {
  user: ProviderUser | null;
  loading: boolean;
};

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; user: ProviderUser }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" };

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      return { user: action.user, loading: false };
    case "LOGIN_FAILURE":
    case "LOGOUT":
      return { user: null, loading: false };
  }
};
