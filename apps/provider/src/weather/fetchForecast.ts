import { mapOpenMeteoForecast } from "./mapOpenMeteoForecast";

type Forecast = NonNullable<ReturnType<typeof mapOpenMeteoForecast>>;

const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=41.3557" +
  "&longitude=-72.0995" +
  "&daily=temperature_2m_max" +
  "&temperature_unit=fahrenheit" +
  "&forecast_days=7" +
  "&timezone=America%2FNew_York";

export const fetchForecast = async (): Promise<Forecast> => {
  const response = await fetch(OPEN_METEO_URL);

  if (!response.ok) {
    throw new Error("Unable to load weather forecast");
  }

  const payload: unknown = await response.json();
  const forecast = mapOpenMeteoForecast(payload);

  if (forecast === null) {
    throw new Error("Invalid weather forecast response");
  }

  return forecast;
};
