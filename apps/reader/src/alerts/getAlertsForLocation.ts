import { forecastHeavyRainAlert } from "./forecastHeavyRainAlert";
import { forecastHeavySnowAlert } from "./forecastHeavySnowAlert";
import { forecastHighWindAlert } from "./forecastHighWindAlert";
import { forecastTemperatureAlert } from "./forecastTemperatureAlert";
import { forecastThunderstormAlert } from "./forecastThunderstormAlert";
import { normalizeAlert } from "./normalizeAlert";
import { nwsAlerts } from "./nwsAlerts";

type Location = {
  latitude: number;
  longitude: number;
};

type WeatherResult = {
  time: readonly string[];
  temperature_2m: readonly number[];
  weathercode?: readonly number[];
  windgusts_10m_max?: readonly number[];
};

type NwsFeature = {
  properties: {
    event: string;
    headline?: string;
    expires?: string;
    severity?: string;
  };
};

type Alert = ReturnType<typeof normalizeAlert>;

type AlertDependencies = {
  fetchWeather: (location: Location) => Promise<WeatherResult>;
  fetchNws: (location: Location) => Promise<readonly NwsFeature[]>;
};

type AlertsResult = {
  alerts: Alert[];
  failures: Array<"weather" | "nws">;
};

export const getAlertsForLocation = async (
  location: Location,
  zip: string,
  { fetchWeather, fetchNws }: AlertDependencies
): Promise<AlertsResult> => {
  const [weatherResult, nwsResult] = await Promise.allSettled([
    fetchWeather(location),
    fetchNws(location),
  ]);
  const alerts: Alert[] = [];
  const failures: Array<"weather" | "nws"> = [];

  if (weatherResult.status === "fulfilled") {
    const forecast = weatherResult.value;
    const weathercodeForecast = {
      time: forecast.time,
      weathercode: forecast.weathercode ?? [],
    };
    const windForecast = {
      time: forecast.time,
      windgusts_10m_max: forecast.windgusts_10m_max ?? [],
    };
    const forecastAlerts = [
      forecastTemperatureAlert(forecast),
      forecastHeavyRainAlert(weathercodeForecast),
      forecastHeavySnowAlert(weathercodeForecast),
      forecastThunderstormAlert(weathercodeForecast),
      forecastHighWindAlert(windForecast),
    ];

    for (const alert of forecastAlerts) {
      if (alert.alert) {
        alerts.push(normalizeAlert(alert, zip));
      }
    }
  } else {
    failures.push("weather");
  }

  if (nwsResult.status === "fulfilled") {
    alerts.push(
      ...nwsAlerts(nwsResult.value).map((alert) => normalizeAlert(alert, zip))
    );
  } else {
    failures.push("nws");
  }

  return { alerts, failures };
};
