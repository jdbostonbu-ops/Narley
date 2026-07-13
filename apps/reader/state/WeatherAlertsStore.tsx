import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

import { fetchNwsAlerts } from "../src/alerts/fetchNwsAlerts";
import { fetchOpenMeteoForecast } from "../src/alerts/fetchOpenMeteoForecast";
import { filterActiveAlerts } from "../src/alerts/filterActiveAlerts";
import { forecastTemperatureAlert } from "../src/alerts/forecastTemperatureAlert";
import { getAlertsWithSetting } from "../src/alerts/getAlertsWithSetting";
import type { Alert } from "../src/alerts/isAlertExpired";
import { normalizeAlert } from "../src/alerts/normalizeAlert";
import { getUserLocation } from "../src/location/getUserLocation";

export type ReaderWeatherAlert = {
  id: string;
  title: string;
  message: string;
  metadata: string;
};

type WeatherAlertsValue = {
  weatherAlertsOn: boolean;
  setWeatherAlertsOn: (enabled: boolean) => Promise<void>;
  refreshWeatherAlerts: () => Promise<void>;
  weatherAlerts: readonly ReaderWeatherAlert[];
  alertCount: number;
  loading: boolean;
  error: string | null;
};

const WEATHER_ALERTS_KEY = "reader.weatherAlerts.enabled";
const WeatherAlertsContext = createContext<WeatherAlertsValue | null>(null);

export const WeatherAlertsProvider = ({ children }: { children: ReactNode }) => {
  const [weatherAlertsOn, setWeatherAlertsOnState] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<readonly ReaderWeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const restoredSetting = useRef(false);
  const weatherAlertsOnRef = useRef(false);

  const loadWeatherAlerts = useCallback(async (enabled: boolean): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      if (!enabled) {
        setWeatherAlerts([]);
        return;
      }

      const location = await getUserLocation();

      if (location === null) {
        setWeatherAlerts([]);
        setError(
          "Weather alerts need location access. Enable location permission to view alerts near you.",
        );
        return;
      }

      const rawAlerts: Alert[] = [];
      const locationLabel =
        `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;

      await getAlertsWithSetting(
        location,
        locationLabel,
        enabled,
        {
          fetchWeather: async (currentLocation) => {
            const forecast = await fetchOpenMeteoForecast(currentLocation);
            const temperatureAlert = forecastTemperatureAlert(forecast);

            if (temperatureAlert.alert) {
              rawAlerts.push(temperatureAlert);
            }

            return forecast;
          },
          fetchNws: async (currentLocation) => {
            const alerts = await fetchNwsAlerts(currentLocation);
            rawAlerts.push(...alerts);
            return [];
          },
        },
      );

      const activeAlerts = filterActiveAlerts(rawAlerts, new Date())
        .map((alert) => normalizeAlert(alert, locationLabel));

      setWeatherAlerts(activeAlerts.map((alert) => ({
        id: `weather-${alert.title}-${alert.time}`,
        title: alert.title,
        message: alert.advice === null
          ? alert.message
          : `${alert.message}. ${alert.advice}`,
        metadata: alert.time,
      })));
    } catch {
      setWeatherAlerts([]);
      setError("Unable to load weather alerts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const restoreSetting = async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(WEATHER_ALERTS_KEY);
        const enabled = storedValue === "true";

        if (!active) {
          return;
        }

        weatherAlertsOnRef.current = enabled;
        restoredSetting.current = true;
        setWeatherAlertsOnState(enabled);
        await loadWeatherAlerts(enabled);
      } catch {
        if (active) {
          setError("Unable to restore the Weather alerts preference.");
          setLoading(false);
        }
      }
    };

    void restoreSetting();

    return () => {
      active = false;
    };
  }, [loadWeatherAlerts]);

  const setWeatherAlertsOn = async (enabled: boolean) => {
    weatherAlertsOnRef.current = enabled;
    setWeatherAlertsOnState(enabled);

    try {
      await SecureStore.setItemAsync(WEATHER_ALERTS_KEY, String(enabled));
    } catch {
      setError("Unable to save the Weather alerts preference.");
    }

    await loadWeatherAlerts(enabled);
  };

  const refreshWeatherAlerts = useCallback(async (): Promise<void> => {
    if (!restoredSetting.current) {
      return;
    }

    await loadWeatherAlerts(weatherAlertsOnRef.current);
  }, [loadWeatherAlerts]);

  const alertCount = weatherAlertsOn ? weatherAlerts.length : 0;
  const value = useMemo(
    () => ({
      weatherAlertsOn,
      setWeatherAlertsOn,
      refreshWeatherAlerts,
      weatherAlerts,
      alertCount,
      loading,
      error,
    }),
    [
      weatherAlertsOn,
      refreshWeatherAlerts,
      weatherAlerts,
      alertCount,
      loading,
      error,
    ],
  );

  return (
    <WeatherAlertsContext.Provider value={value}>
      {children}
    </WeatherAlertsContext.Provider>
  );
};

export const useWeatherAlerts = (): WeatherAlertsValue => {
  const value = useContext(WeatherAlertsContext);

  if (value === null) {
    throw new Error("useWeatherAlerts must be used inside WeatherAlertsProvider");
  }

  return value;
};
