export const shouldReloadOnForeground = (
  previousState: string,
  nextState: string,
): boolean => previousState !== "active" && nextState === "active";
