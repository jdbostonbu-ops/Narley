export type ReaderUser = {
  id: string;
  emailVerified: boolean;
};

export type ReaderAuthState = {
  loading: boolean;
  user: ReaderUser | null;
};

export type ReaderAuthView = "loading" | "auth" | "verify" | "tabs";

export const resolveReaderAuthView = (
  state: ReaderAuthState,
): ReaderAuthView => {
  if (state.loading) {
    return "loading";
  }

  if (state.user === null) {
    return "auth";
  }

  if (!state.user.emailVerified) {
    return "verify";
  }

  return "tabs";
};
