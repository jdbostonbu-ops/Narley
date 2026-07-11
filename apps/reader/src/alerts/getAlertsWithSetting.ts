import { getAlertsForLocation } from "./getAlertsForLocation";

type Location = Parameters<typeof getAlertsForLocation>[0];
type AlertDependencies = Parameters<typeof getAlertsForLocation>[2];

export const getAlertsWithSetting = async (
  location: Location,
  zip: string,
  weatherAlertsOn: boolean,
  deps: AlertDependencies
) => {
  if (!weatherAlertsOn) {
    return { alerts: [] };
  }

  return getAlertsForLocation(location, zip, deps);
};
