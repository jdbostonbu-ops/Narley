import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAlertsForLocation } from "./getAlertsForLocation";

const fetchWeather = vi.fn();
const fetchNws = vi.fn();
const deps = { fetchWeather, fetchNws };

const location = { latitude: 41.35, longitude: -72.1 };
const zip = "06320";

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

describe("getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure)", () => {
  it("returns normalized alerts from both sources", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockResolvedValue([
      { properties: { event: "Tornado Warning", headline: "Tornado Warning until 3:30 PM", expires: "2026-07-12T15:30", severity: "Severe" } },
    ]);

    const result = await getAlertsForLocation(location, zip, deps);

    expect(fetchWeather).toHaveBeenCalledWith(location);
    expect(fetchNws).toHaveBeenCalledWith(location);

    const titles = result.alerts.map((a) => a.title);
    expect(titles).toEqual(["Extreme Heat", "Tornado Warning"]);

    // every alert carries the common shape
    for (const a of result.alerts) {
      for (const key of ["title", "message", "location", "time", "severity", "advice"]) {
        expect(a).toHaveProperty(key);
      }
      expect(a.location).toBe("06320");
    }
  });

  it("normalizes the forecast alert with advice and expected time", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockResolvedValue([]);

    const [alert] = (await getAlertsForLocation(location, zip, deps)).alerts;
    expect(alert.title).toBe("Extreme Heat");
    expect(alert.time).toBe("2026-07-12T14:00");
    expect(alert.advice).toBe("keep cool");
    expect(alert.severity).toBeNull();
  });

  it("still returns NWS warnings when the weather API fails", async () => {
    fetchWeather.mockRejectedValue(new Error("open-meteo down"));
    fetchNws.mockResolvedValue([
      { properties: { event: "Flood Warning", headline: "Flood Warning", expires: "2026-07-12T20:00", severity: "Severe" } },
    ]);

    const result = await getAlertsForLocation(location, zip, deps);
    expect(result.alerts.map((a) => a.title)).toEqual(["Flood Warning"]);
    expect(result.failures).toContain("weather");
  });

  it("still returns forecast temperature alerts when the NWS API fails", async () => {
    fetchWeather.mockResolvedValue(hotForecast);
    fetchNws.mockRejectedValue(new Error("nws down"));

    const result = await getAlertsForLocation(location, zip, deps);
    expect(result.alerts.map((a) => a.title)).toEqual(["Extreme Heat"]);
    expect(result.failures).toContain("nws");
  });

  it("returns no alerts but flags both failures when both APIs fail", async () => {
    fetchWeather.mockRejectedValue(new Error("down"));
    fetchNws.mockRejectedValue(new Error("down"));

    const result = await getAlertsForLocation(location, zip, deps);
    expect(result.alerts).toEqual([]);
    expect(result.failures).toEqual(expect.arrayContaining(["weather", "nws"]));
  });

  it("returns no alerts when the forecast is mild and NWS is empty", async () => {
    fetchWeather.mockResolvedValue(mildForecast);
    fetchNws.mockResolvedValue([]);

    const result = await getAlertsForLocation(location, zip, deps);
    expect(result.alerts).toEqual([]);
    expect(result.failures).toEqual([]);
  });
})
