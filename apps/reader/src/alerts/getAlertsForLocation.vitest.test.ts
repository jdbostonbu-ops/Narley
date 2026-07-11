import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAlertsForLocation } from "./getAlertsForLocation";

const fetchWeather = vi.fn();
const fetchNws = vi.fn();
const deps = { fetchWeather, fetchNws };

const location = { latitude: 41.35, longitude: -72.1 };

const hotForecast = {
  time: ["2026-07-12T13:00", "2026-07-12T14:00"],
  temperature_2m: [88, 95],
};
const mildForecast = {
  time: ["2026-07-12T13:00", "2026-07-12T14:00"],
  temperature_2m: [72, 74],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAlertsForLocation (ALERT-R-001 combine + graceful failure)", () => {
  it("combines forecast temperature and NWS warnings for the location", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockResolvedValue([{ properties: { event: "Tornado Warning" } }]);

    const result = await getAlertsForLocation(location, deps);

    expect(fetchWeather).toHaveBeenCalledWith(location);
    expect(fetchNws).toHaveBeenCalledWith(location);
    expect(result.alerts.map((a) => a.type ?? a.event)).toEqual(["HEAT", "Tornado Warning"]);
  });

  it("includes the expected time on a forecast temperature alert", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockResolvedValue([]);

    const result = await getAlertsForLocation(location, deps);

    expect(result.alerts[0].type).toBe("HEAT");
    expect(result.alerts[0].expectedAt).toBe("2026-07-12T14:00");
  });

  it("still returns NWS warnings when the weather API fails", async () => {
    fetchWeather.mockRejectedValue(new Error("open-meteo down"));
    fetchNws.mockResolvedValue([{ properties: { event: "Flood Warning" } }]);

    const result = await getAlertsForLocation(location, deps);

    expect(result.alerts.map((a) => a.event)).toEqual(["Flood Warning"]);
    expect(result.failures).toContain("weather");
  });

  it("still returns forecast temperature alerts when the NWS API fails", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockRejectedValue(new Error("nws down"));

    const result = await getAlertsForLocation(location, deps);

    expect(result.alerts.map((a) => a.type)).toEqual(["HEAT"]);
    expect(result.failures).toContain("nws");
  });

  it("returns no alerts but flags both failures when both APIs fail", async () => {
    fetchWeather.mockRejectedValue(new Error("down"));
    fetchNws.mockRejectedValue(new Error("down"));

    const result = await getAlertsForLocation(location, deps);

    expect(result.alerts).toEqual([]);
    expect(result.failures).toEqual(expect.arrayContaining(["weather", "nws"]));
  });

  it("returns no alerts when the forecast is mild and NWS is empty", async () => {
    fetchWeather.mockResolvedValue(mildForecast);
    fetchNws.mockResolvedValue([]);

    const result = await getAlertsForLocation(location, deps);

    expect(result.alerts).toEqual([]);
    expect(result.failures).toEqual([]);
  });
})
