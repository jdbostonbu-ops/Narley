export type ProviderAuthState = {
  user: unknown | null;
  loading: boolean;
};

export const useAuth = (): ProviderAuthState => ({
  user: null,
  loading: false,
});
