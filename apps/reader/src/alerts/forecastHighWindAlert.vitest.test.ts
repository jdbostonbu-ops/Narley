import { describe, it, expect } from "vitest";
import { forecastHighWindAlert } from "./forecastHighWindAlert";

describe("forecastHighWindAlert (ALERT-R-010 high wind, 2-day advance)", () => {
  it("flags high wind when the index-2 day gust is above 46 mph, with that day's date", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      windgusts_10m_max: [10, 20, 55],
    };
    const result = forecastHighWindAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HIGH_WIND");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("flags high wind when the index-2 day gust is exactly 46 mph (inclusive boundary)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      windgusts_10m_max: [10, 20, 46],
    };
    const result = forecastHighWindAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HIGH_WIND");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("does not flag when the index-2 day gust is 45 mph (just below threshold)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      windgusts_10m_max: [10, 20, 45],
    };
    expect(forecastHighWindAlert(daily).alert).toBe(false);
  });

  it("does not flag based on today (index 0) or tomorrow (index 1) high wind", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      windgusts_10m_max: [60, 70, 10],
    };
    expect(forecastHighWindAlert(daily).alert).toBe(false);
  });

  it("does not flag when the forecast has no index 2 (too short)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20"],
      windgusts_10m_max: [60, 70],
    };
    expect(forecastHighWindAlert(daily).alert).toBe(false);
  });

  it("does not flag for an empty forecast", () => {
    expect(forecastHighWindAlert({ time: [], windgusts_10m_max: [] }).alert).toBe(false);
  });
});
