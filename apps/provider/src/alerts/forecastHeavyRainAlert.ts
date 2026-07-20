type DailyForecast = {
  time: readonly string[];
  weathercode: readonly number[];
};

type ForecastHeavyRainAlert =
  | { alert: true; type: "HEAVY_RAIN"; expectedAt: string }
  | { alert: false };

export const forecastHeavyRainAlert = (
  daily: DailyForecast
): ForecastHeavyRainAlert => {
  const weathercode = daily.weathercode[2];
  const expectedAt = daily.time[2];

  if ((weathercode !== 65 && weathercode !== 82) || expectedAt === undefined) {
    return { alert: false };
  }

  return {
    alert: true,
    type: "HEAVY_RAIN",
    expectedAt,
  };
};
