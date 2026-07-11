import { getAlertsForLocation } from "./getAlertsForLocation";

type Location = Parameters<typeof getAlertsForLocation>[0];
type AlertDependencies = Parameters<typeof getAlertsForLocation>[1];

export const getAlertsWithSetting = async (
  location: Location,
  weatherAlertsOn: boolean,
  deps: AlertDependencies
) => {
  if (!weatherAlertsOn) {
    return { alerts: [] };
  }

  return getAlertsForLocation(location, deps);
};
