import { nwsAlerts } from "./nwsAlerts";
import { temperatureAlert } from "./temperatureAlert";

type Location = {
  latitude: number;
  longitude: number;
};

type WeatherResult = {
  temperature_2m: number;
};

type NwsFeature = {
  properties: {
    event: string;
  };
};

type Alert = {
  alert?: true;
  type?: "HEAT" | "COLD";
  event?: string;
};

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
  { fetchWeather, fetchNws }: AlertDependencies
): Promise<AlertsResult> => {
  const [weatherResult, nwsResult] = await Promise.allSettled([
    fetchWeather(location),
    fetchNws(location),
  ]);
  const alerts: Alert[] = [];
  const failures: Array<"weather" | "nws"> = [];

  if (weatherResult.status === "fulfilled") {
    const alert = temperatureAlert(weatherResult.value.temperature_2m);

    if (alert.alert) {
      alerts.push(alert);
    }
  } else {
    failures.push("weather");
  }

  if (nwsResult.status === "fulfilled") {
    alerts.push(...nwsAlerts(nwsResult.value));
  } else {
    failures.push("nws");
  }

  return { alerts, failures };
};
