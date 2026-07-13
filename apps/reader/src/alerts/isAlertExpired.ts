export type TemperatureAlert = {
  type: "HEAT" | "COLD";
  expectedAt: string;
};

export type NwsAlert = {
  event: string;
  headline: string;
  expires: string;
  severity: string;
};

export type Alert = TemperatureAlert | NwsAlert;

const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const isAlertExpired = (alert: Alert, now: Date): boolean => {
  if ("type" in alert) {
    const expiresAt =
      new Date(alert.expectedAt).getTime() +
      TWENTY_FOUR_HOURS_IN_MILLISECONDS;

    return now.getTime() > expiresAt;
  }

  return now.getTime() > new Date(alert.expires).getTime();
};
