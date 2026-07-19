type DailyForecast = {
  time: readonly string[];
  weathercode: readonly number[];
};

type ForecastHeavySnowAlert =
  | { alert: true; type: "HEAVY_SNOW"; expectedAt: string }
  | { alert: false };

export const forecastHeavySnowAlert = (
  daily: DailyForecast
): ForecastHeavySnowAlert => {
  const weathercode = daily.weathercode[2];
  const expectedAt = daily.time[2];

  if ((weathercode !== 75 && weathercode !== 86) || expectedAt === undefined) {
    return { alert: false };
  }

  return {
    alert: true,
    type: "HEAVY_SNOW",
    expectedAt,
  };
};
