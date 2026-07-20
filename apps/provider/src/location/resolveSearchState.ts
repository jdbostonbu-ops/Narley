type SearchState =
  | { mode: "gps"; activeZip: null }
  | { mode: "search"; activeZip: string | null };

export const resolveSearchState = (query: string): SearchState => {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return { mode: "gps", activeZip: null };
  }

  return {
    mode: "search",
    activeZip: /^\d{5}$/.test(trimmedQuery) ? trimmedQuery : null,
  };
};
