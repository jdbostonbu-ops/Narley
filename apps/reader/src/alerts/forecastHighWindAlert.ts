type DailyForecast = {
  time: readonly string[];
  windgusts_10m_max: readonly number[];
};

type ForecastHighWindAlert =
  | { alert: true; type: "HIGH_WIND"; expectedAt: string }
  | { alert: false };

export const forecastHighWindAlert = (
  daily: DailyForecast
): ForecastHighWindAlert => {
  const windgusts = daily.windgusts_10m_max[2];
  const expectedAt = daily.time[2];

  if (windgusts === undefined || windgusts < 46 || expectedAt === undefined) {
    return { alert: false };
  }

  return {
    alert: true,
    type: "HIGH_WIND",
    expectedAt,
  };
};
