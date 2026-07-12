import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

import { getAlertsWithSetting } from "../../reader/src/alerts/getAlertsWithSetting";
import { activeAlertCount } from "../src/reports/activeAlertCount";
import { fetchForecast } from "../src/weather/fetchForecast";
import {
  REPORT_ALERTS,
  type ProviderAlertCard,
} from "../constants/providerAlerts";

type WeatherAlertsValue = {
  weatherAlertsOn: boolean;
  setWeatherAlertsOn: (enabled: boolean) => Promise<void>;
  weatherAlerts: readonly ProviderAlertCard[];
  alertCount: number;
  loading: boolean;
  error: string | null;
};

const WEATHER_ALERTS_KEY = "provider.weatherAlerts.enabled";
const NEW_LONDON = { latitude: 41.3557, longitude: -72.0995 };
const NEW_LONDON_ZIP = "06320";
const WeatherAlertsContext = createContext<WeatherAlertsValue | null>(null);

export const WeatherAlertsProvider = ({ children }: { children: ReactNode }) => {
  const [weatherAlertsOn, setWeatherAlertsOnState] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<readonly ProviderAlertCard[]>([]);
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
        kind: "weather" as const,
        category: "Weather",
        status: "Active",
        title: alert.title,
        notes: alert.advice === null
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

  const alertsForCount = [...REPORT_ALERTS, ...weatherAlerts];
  const alertCount = activeAlertCount(alertsForCount, weatherAlertsOn);
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
