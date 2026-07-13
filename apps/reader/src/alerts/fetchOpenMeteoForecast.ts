import { mapOpenMeteoForecast } from "../../../provider/src/weather/mapOpenMeteoForecast";

type Location = {
  latitude: number;
  longitude: number;
};

type Forecast = NonNullable<ReturnType<typeof mapOpenMeteoForecast>>;

export const fetchOpenMeteoForecast = async (
  location: Location,
): Promise<Forecast> => {
  const latitude = encodeURIComponent(String(location.latitude));
  const longitude = encodeURIComponent(String(location.longitude));
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&daily=temperature_2m_max" +
    "&temperature_unit=fahrenheit" +
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

  return forecast;
};
