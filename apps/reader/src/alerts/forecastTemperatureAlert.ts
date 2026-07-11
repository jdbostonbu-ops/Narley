type HourlyForecast = {
  time: readonly string[];
  temperature_2m: readonly number[];
};

type ForecastTemperatureAlert =
  | { alert: true; type: "HEAT" | "COLD"; expectedAt: string }
  | { alert: false };

export const forecastTemperatureAlert = (
  hourly: HourlyForecast
): ForecastTemperatureAlert => {
  const thresholdIndex = hourly.temperature_2m.findIndex(
    (fahrenheit) => fahrenheit >= 91 || fahrenheit <= 32
  );

  if (thresholdIndex === -1) {
    return { alert: false };
  }

  const fahrenheit = hourly.temperature_2m[thresholdIndex];
  const expectedAt = hourly.time[thresholdIndex];

  return {
    alert: true,
    type: fahrenheit >= 91 ? "HEAT" : "COLD",
    expectedAt,
  };
};
