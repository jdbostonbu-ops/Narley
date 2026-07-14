import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

import { fetchNwsAlerts } from "../../reader/src/alerts/fetchNwsAlerts";
import { filterActiveAlerts } from "../../reader/src/alerts/filterActiveAlerts";
import { forecastTemperatureAlert } from "../../reader/src/alerts/forecastTemperatureAlert";
import { getAlertsWithSetting } from "../../reader/src/alerts/getAlertsWithSetting";
import type { Alert } from "../../reader/src/alerts/isAlertExpired";
import { mergeAlerts } from "../../reader/src/alerts/mergeAlerts";
import { normalizeAlert } from "../../reader/src/alerts/normalizeAlert";
import {
  deleteProviderAlert,
  getProviderAlerts,
  type ProviderReportAlert,
} from "../src/api/client";
import { getUserLocation } from "../src/location/getUserLocation";
import { activeAlertCount } from "../src/reports/activeAlertCount";
import { fetchForecast } from "../src/weather/fetchForecast";
import type { ProviderAlertCard } from "../constants/providerAlerts";

type WeatherAlertsValue = {
  weatherAlertsOn: boolean;
  setWeatherAlertsOn: (enabled: boolean) => Promise<void>;
  refreshWeatherAlerts: () => Promise<void>;
  refreshReportAlerts: () => Promise<void>;
  deleteReportAlert: (id: string) => Promise<void>;
  weatherAlerts: readonly ProviderAlertCard[];
  reportAlerts: readonly ProviderReportAlert[];
  alertCount: number;
  loading: boolean;
  error: string | null;
  reportsLoading: boolean;
  reportsError: string | null;
};

const WEATHER_ALERTS_KEY = "provider.weatherAlerts.enabled";
const WeatherAlertsContext = createContext<WeatherAlertsValue | null>(null);

export const WeatherAlertsProvider = ({ children }: { children: ReactNode }) => {
  const [weatherAlertsOn, setWeatherAlertsOnState] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState<readonly ProviderAlertCard[]>([]);
  const [reportAlerts, setReportAlerts] = useState<readonly ProviderReportAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const restoredSetting = useRef(false);
  const weatherAlertsOnRef = useRef(false);
  const rawAlertsRef = useRef<readonly Alert[]>([]);
  const locationLabelRef = useRef("");

  const applyMergedAlerts = useCallback((
    newAlerts: readonly Alert[],
    locationLabel: string,
  ): void => {
    const now = new Date();
    const activeAlerts = filterActiveAlerts(
      mergeAlerts(rawAlertsRef.current, newAlerts, now),
      now,
    );
    rawAlertsRef.current = activeAlerts;

    const normalizedAlerts = activeAlerts
      .map((alert) => normalizeAlert(alert, locationLabel));

    setWeatherAlerts(normalizedAlerts.map((alert) => ({
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
  }, []);

  const loadWeatherAlerts = useCallback(async (enabled: boolean): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      if (!enabled) {
        rawAlertsRef.current = [];
        locationLabelRef.current = "";
        setWeatherAlerts([]);
        return;
      }

      const location = await getUserLocation();

      if (location === null) {
        rawAlertsRef.current = [];
        locationLabelRef.current = "";
        setWeatherAlerts([]);
        setError(
          "Weather alerts need location access. Enable location permission to view alerts near you.",
        );
        return;
      }

      const rawAlerts: Alert[] = [];
      const locationLabel =
        `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
      locationLabelRef.current = locationLabel;

      const result = await getAlertsWithSetting(
        location,
        locationLabel,
        enabled,
        {
          fetchWeather: async (currentLocation) => {
            const forecast = await fetchForecast(currentLocation);
            const temperatureAlert = forecastTemperatureAlert(forecast);

            if (temperatureAlert.alert) {
              rawAlerts.push(temperatureAlert);
            }

            return forecast;
          },
          fetchNws: async (currentLocation) => {
            const alerts = await fetchNwsAlerts(currentLocation, {
              throwOnError: true,
            });
            rawAlerts.push(...alerts);
            return [];
          },
        },
      );

      if ("failures" in result && result.failures.length > 0) {
        applyMergedAlerts([], locationLabel);
        setError(
          "Unable to load weather alerts. Reopen this tab to try again.",
        );
        return;
      }

      applyMergedAlerts(rawAlerts, locationLabel);
    } catch {
      applyMergedAlerts([], locationLabelRef.current);
      setError("Unable to load weather alerts.");
    } finally {
      setLoading(false);
    }
  }, [applyMergedAlerts]);

  const loadReportAlerts = useCallback(async (): Promise<void> => {
    setReportsLoading(true);
    setReportsError(null);

    const result = await getProviderAlerts();

    if (result.ok) {
      setReportAlerts(result.alerts);
    } else {
      setReportsError(result.error);
    }

    setReportsLoading(false);
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

  useEffect(() => {
    void loadReportAlerts();
  }, [loadReportAlerts]);

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
    if (!restoredSetting.current || !weatherAlertsOnRef.current) {
      return;
    }

    await loadWeatherAlerts(true);
  }, [loadWeatherAlerts]);

  const refreshReportAlerts = useCallback(async (): Promise<void> => {
    await loadReportAlerts();
  }, [loadReportAlerts]);

  const deleteReportAlert = useCallback(async (id: string): Promise<void> => {
    setReportsError(null);
    const result = await deleteProviderAlert(id);

    if (!result.ok) {
      setReportsError(result.error);
      return;
    }

    setReportAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== id));
  }, []);

  const reportAlertsForCount = reportAlerts.map(() => ({ kind: "report" }));
  const alertsForCount = [...reportAlertsForCount, ...weatherAlerts];
  const alertCount = activeAlertCount(alertsForCount, weatherAlertsOn);
  const value = useMemo(
    () => ({
      weatherAlertsOn,
      setWeatherAlertsOn,
      refreshWeatherAlerts,
      refreshReportAlerts,
      deleteReportAlert,
      weatherAlerts,
      reportAlerts,
      alertCount,
      loading,
      error,
      reportsLoading,
      reportsError,
    }),
    [
      weatherAlertsOn,
      refreshWeatherAlerts,
      refreshReportAlerts,
      deleteReportAlert,
      weatherAlerts,
      reportAlerts,
      alertCount,
      loading,
      error,
      reportsLoading,
      reportsError,
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
