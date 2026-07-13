import { isAlertExpired, type Alert } from "./isAlertExpired";

export const filterActiveAlerts = (
  alerts: readonly Alert[],
  now: Date,
): Alert[] => alerts.filter((alert) => !isAlertExpired(alert, now));
