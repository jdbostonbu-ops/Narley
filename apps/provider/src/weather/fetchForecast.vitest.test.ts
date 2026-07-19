import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchForecast } from "./fetchForecast";

const location = { latitude: 41.35, longitude: -72.1 };

const dailyPayload = {
  daily: {
    time: ["2026-07-19", "2026-07-20", "2026-07-21"],
    temperature_2m_max: [80, 82, 88],
    weathercode: [1, 2, 95],
    windgusts_10m_max: [10, 20, 48],
  },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchForecast (ALERT-P-009 provider fetch includes daily weather fields)", () => {
  it("returns weathercode and windgusts_10m_max from the daily forecast", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => dailyPayload,
    } as Response);

    const forecast = await fetchForecast(location);

    expect(forecast.weathercode).toEqual([1, 2, 95]);
    expect(forecast.windgusts_10m_max).toEqual([10, 20, 48]);
  });

  it("still returns the daily time and temperature fields", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => dailyPayload,
    } as Response);

    const forecast = await fetchForecast(location);

    expect(forecast.time).toEqual(["2026-07-19", "2026-07-20", "2026-07-21"]);
    expect(forecast.temperature_2m).toEqual([80, 82, 88]);
  });

  it("requests weathercode and windgusts_10m_max in mph from Open-Meteo", async () => {
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => dailyPayload,
    } as Response);

    await fetchForecast(location);

    const requestedUrl = String(fetchSpy.mock.calls[0][0]);
    expect(requestedUrl).toContain("weathercode");
    expect(requestedUrl).toContain("windgusts_10m_max");
    expect(requestedUrl).toContain("windspeed_unit=mph");
  });

  it("throws when the forecast response is not ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(fetchForecast(location)).rejects.toThrow();
  });
});
