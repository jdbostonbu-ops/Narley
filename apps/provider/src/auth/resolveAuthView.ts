type AuthView = "loading" | "login" | "tabs";

type AuthState = {
  loading: boolean;
  user: { id: string } | null;
  membership: { status: string } | null;
};

export const resolveAuthView = (state: AuthState): AuthView => {
  if (state.loading) {
    return "loading";
  }

  if (state.user === null) {
    return "login";
  }

  if (state.membership?.status === "ACTIVE") {
    return "tabs";
  }

  return "login";
};
