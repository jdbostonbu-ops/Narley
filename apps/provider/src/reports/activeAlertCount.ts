type Alert = {
  kind: string;
};

export const activeAlertCount = (
  alerts: readonly Alert[],
  weatherAlertsOn: boolean
): number =>
  alerts.filter(
    ({ kind }) =>
      kind === "report" || (weatherAlertsOn && kind === "weather")
  ).length;
