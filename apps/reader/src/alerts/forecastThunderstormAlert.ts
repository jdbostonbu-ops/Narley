type DailyForecast = {
  time: readonly string[];
  weathercode: readonly number[];
};

type ForecastThunderstormAlert =
  | { alert: true; type: "THUNDERSTORM"; expectedAt: string }
  | { alert: false };

export const forecastThunderstormAlert = (
  daily: DailyForecast
): ForecastThunderstormAlert => {
  const weathercode = daily.weathercode[2];
  const expectedAt = daily.time[2];

  if (
    (weathercode !== 95 && weathercode !== 96 && weathercode !== 99) ||
    expectedAt === undefined
  ) {
    return { alert: false };
  }

  return {
    alert: true,
    type: "THUNDERSTORM",
    expectedAt,
  };
};
