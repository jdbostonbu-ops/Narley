import { mapOpenMeteoForecast } from "./mapOpenMeteoForecast";

type Forecast = NonNullable<ReturnType<typeof mapOpenMeteoForecast>> & {
  weathercode: readonly number[];
  windgusts_10m_max: readonly number[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isNumberArrayWithLength = (
  value: unknown,
  expectedLength: number
): value is number[] =>
  Array.isArray(value) &&
  value.length === expectedLength &&
  value.every((item) => typeof item === "number");

type Location = {
  latitude: number;
  longitude: number;
};

export const fetchForecast = async (location: Location): Promise<Forecast> => {
  const latitude = encodeURIComponent(String(location.latitude));
  const longitude = encodeURIComponent(String(location.longitude));
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&daily=temperature_2m_max,weathercode,windgusts_10m_max" +
    "&temperature_unit=fahrenheit" +
    "&windspeed_unit=mph" +
    "&forecast_days=7" +
    "&timezone=auto";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to load weather forecast");
  }

  const payload: unknown = await response.json();
  const forecast = mapOpenMeteoForecast(payload);

  if (forecast === null) {
    throw new Error("Invalid weather forecast response");
  }

  if (!isRecord(payload) || !isRecord(payload.daily)) {
    throw new Error("Invalid weather forecast response");
  }

  const { weathercode, windgusts_10m_max } = payload.daily;
  const forecastLength = forecast.time.length;

  if (
    !isNumberArrayWithLength(weathercode, forecastLength) ||
    !isNumberArrayWithLength(windgusts_10m_max, forecastLength)
  ) {
    throw new Error("Invalid weather forecast response");
  }

  return {
    ...forecast,
    weathercode,
    windgusts_10m_max,
  };
};
