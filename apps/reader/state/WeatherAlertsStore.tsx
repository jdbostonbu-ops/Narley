import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

import { getAlertsWithSetting } from "../src/alerts/getAlertsWithSetting";
import { fetchForecast } from "../../provider/src/weather/fetchForecast";

export type ReaderWeatherAlert = {
  id: string;
  title: string;
  message: string;
  metadata: string;
};

type WeatherAlertsValue = {
  weatherAlertsOn: boolean;
  setWeatherAlertsOn: (enabled: boolean) => Promise<void>;
  weatherAlerts: readonly ReaderWeatherAlert[];
  alertCount: number;
  loading: boolean;
  error: string | null;
};

const WEATHER_ALERTS_KEY = "reader.weatherAlerts.enabled";
const NEW_LONDON = { latitude: 41.3557, longitude: -72.0995 };
const NEW_LONDON_ZIP = "06320";
const WeatherAlertsContext = createContext<WeatherAlertsValue | null>(null);

export const WeatherAlertsProvider = ({ children }: { children: ReactNode }) => {
  const [weatherAlertsOn, setWeatherAlertsOnState] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<readonly ReaderWeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherAlerts = async (enabled: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAlertsWithSetting(
        NEW_LONDON,
        NEW_LONDON_ZIP,
        enabled,
        {
          fetchWeather: async () => fetchForecast(),
          fetchNws: async () => [],
        },
      );
      setWeatherAlerts(result.alerts.map((alert) => ({
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
  };

  useEffect(() => {
    let active = true;

    const restoreSetting = async () => {
      try {
        const storedValue = await SecureStore.getItemAsync(WEATHER_ALERTS_KEY);
        const enabled = storedValue === "true";

        if (!active) {
          return;
        }

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
  }, []);

  const setWeatherAlertsOn = async (enabled: boolean) => {
    setWeatherAlertsOnState(enabled);

    try {
      await SecureStore.setItemAsync(WEATHER_ALERTS_KEY, String(enabled));
    } catch {
      setError("Unable to save the Weather alerts preference.");
    }

    await loadWeatherAlerts(enabled);
  };

  const alertCount = weatherAlertsOn ? weatherAlerts.length : 0;
  const value = useMemo(
    () => ({
      weatherAlertsOn,
      setWeatherAlertsOn,
      weatherAlerts,
      alertCount,
      loading,
      error,
    }),
    [weatherAlertsOn, weatherAlerts, alertCount, loading, error],
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
