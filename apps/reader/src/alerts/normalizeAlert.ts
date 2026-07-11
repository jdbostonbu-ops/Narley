type TemperatureAlert = {
  type: "HEAT" | "COLD";
  expectedAt: string;
};

type NwsAlert = {
  event: string;
  headline: string;
  expires: string;
  severity: string;
};

type NormalizedAlert = {
  title: string;
  message: string;
  location: string;
  time: string;
  severity: string | null;
  advice: string | null;
};

export const normalizeAlert = (
  alert: TemperatureAlert | NwsAlert,
  zip: string
): NormalizedAlert => {
  if ("type" in alert) {
    const isHeat = alert.type === "HEAT";

    return {
      title: isHeat ? "Extreme Heat" : "Extreme Cold",
      message: `${isHeat ? "Extreme heat" : "Extreme cold"} expected at ${alert.expectedAt}`,
      location: zip,
      time: alert.expectedAt,
      severity: null,
      advice: isHeat ? "keep cool" : "bundle up",
    };
  }

  return {
    title: alert.event,
    message: alert.headline,
    location: zip,
    time: alert.expires,
    severity: alert.severity,
    advice: null,
  };
};
