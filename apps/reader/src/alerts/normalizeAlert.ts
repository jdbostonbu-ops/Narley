type TemperatureAlert = {
  type: "HEAT" | "COLD";
  expectedAt: string;
};

type WeatherAlert = {
  type: "HEAVY_RAIN" | "HEAVY_SNOW" | "THUNDERSTORM" | "HIGH_WIND";
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
  alert: TemperatureAlert | WeatherAlert | NwsAlert,
  zip: string
): NormalizedAlert => {
  if ("type" in alert) {
    if (alert.type !== "HEAT" && alert.type !== "COLD") {
      const details = {
        HEAVY_RAIN: {
          title: "Heavy Rain",
          message: "Heavy rain",
          advice: "prepare for heavy rain",
        },
        HEAVY_SNOW: {
          title: "Heavy Snow",
          message: "Heavy snow",
          advice: "prepare for heavy snow",
        },
        THUNDERSTORM: {
          title: "Thunderstorm",
          message: "Thunderstorm",
          advice: "seek shelter",
        },
        HIGH_WIND: {
          title: "High Wind",
          message: "High wind",
          advice: "secure loose objects",
        },
      }[alert.type];

      return {
        title: details.title,
        message: `${details.message} expected at ${alert.expectedAt}`,
        location: zip,
        time: alert.expectedAt,
        severity: null,
        advice: details.advice,
      };
    }

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
