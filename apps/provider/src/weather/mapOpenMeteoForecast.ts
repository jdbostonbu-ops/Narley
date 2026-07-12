type TestedForecast = {
  time: readonly string[];
  temperature_2m: readonly number[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const mapOpenMeteoForecast = (
  value: unknown,
): TestedForecast | null => {
  if (!isRecord(value) || !isRecord(value.daily)) {
    return null;
  }

  const time = value.daily.time;
  const temperatures = value.daily.temperature_2m_max;

  if (
    !Array.isArray(time) ||
    !time.every((item) => typeof item === "string") ||
    !Array.isArray(temperatures) ||
    !temperatures.every((item) => typeof item === "number") ||
    time.length !== temperatures.length
  ) {
    return null;
  }

  return {
    time,
    temperature_2m: temperatures,
  };
};
