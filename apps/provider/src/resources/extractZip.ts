export const extractZip = (address: string): string | null => {
  const match = address.match(/\b(\d{5})(?:-\d{4})?\b/);

  return match?.[1] ?? null;
};
