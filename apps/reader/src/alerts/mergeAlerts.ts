import { isAlertExpired, type Alert } from "./isAlertExpired";

const getAlertKey = (alert: Alert): string =>
  "type" in alert
    ? `temperature:${alert.type}:${alert.expectedAt}`
    : `nws:${alert.event}:${alert.expires}`;

export const mergeAlerts = (
  previousAlerts: readonly Alert[],
  newAlerts: readonly Alert[],
  now: Date,
): Alert[] => {
  const mergedAlerts: Alert[] = [];
  const seenKeys = new Set<string>();

  const addAlert = (alert: Alert) => {
    const key = getAlertKey(alert);

    if (seenKeys.has(key)) {
      return;
    }

    seenKeys.add(key);
    mergedAlerts.push(alert);
  };

  previousAlerts
    .filter((alert) => !isAlertExpired(alert, now))
    .forEach(addAlert);
  newAlerts.forEach(addAlert);

  return mergedAlerts;
};
