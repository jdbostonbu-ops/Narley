import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAlertsWithSetting } from "./getAlertsWithSetting";

const fetchWeather = vi.fn();
const fetchNws = vi.fn();
const deps = { fetchWeather, fetchNws };

const location = { latitude: 41.35, longitude: -72.1 };

beforeEach(() => {
  vi.clearAllMocks();
  fetchWeather.mockResolvedValue({ temperature_2m: 95 });
  fetchNws.mockResolvedValue([{ properties: { event: "Tornado Warning" } }]);
});

describe("getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle)", () => {
  it("returns alerts from both sources when Weather Alerts is ON", async () => {
    const result = await getAlertsWithSetting(location, true, deps);
    expect(result.alerts.length).toBeGreaterThan(0);
  });

  it("returns no alerts when Weather Alerts is OFF", async () => {
    const result = await getAlertsWithSetting(location, false, deps);
    expect(result.alerts).toEqual([]);
  });

  it("does not call either API when Weather Alerts is OFF", async () => {
    await getAlertsWithSetting(location, false, deps);
    expect(fetchWeather).not.toHaveBeenCalled();
    expect(fetchNws).not.toHaveBeenCalled();
  });

  it("fetches from both sources when Weather Alerts is ON", async () => {
    await getAlertsWithSetting(location, true, deps);
    expect(fetchWeather).toHaveBeenCalledWith(location);
    expect(fetchNws).toHaveBeenCalledWith(location);
  });
})
