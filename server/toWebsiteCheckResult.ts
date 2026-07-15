import type { WebsiteCheckResult } from "./websiteCheckObservation";

export const toWebsiteCheckResult = (status: number): WebsiteCheckResult => {
  if (status === 404) {
    return "404";
  }

  if (status === 403) {
    return "could-not-reach";
  }

  return "reached-not-404";
};
