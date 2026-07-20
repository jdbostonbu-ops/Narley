import { describe, it, expect } from "vitest";
import { forecastHeavyRainAlert } from "./forecastHeavyRainAlert";

describe("forecastHeavyRainAlert (ALERT-P-009 / ALERT-R-007 heavy rain, 2-day advance)", () => {
  it("flags heavy rain when the index-2 day weathercode is 65, with that day's date", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 3, 65],
    };
    const result = forecastHeavyRainAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HEAVY_RAIN");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("flags heavy rain when the index-2 day weathercode is 82 (violent showers)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [1, 2, 82],
    };
    const result = forecastHeavyRainAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HEAVY_RAIN");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("does not flag when index 2 is light or moderate rain (61, 63, 80, 81)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 0, 63],
    };
    expect(forecastHeavyRainAlert(daily).alert).toBe(false);
  });

  it("does not flag based on today (index 0) or tomorrow (index 1) heavy rain", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [65, 82, 0],
    };
    expect(forecastHeavyRainAlert(daily).alert).toBe(false);
  });

  it("does not flag when the forecast has no index 2 (too short)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20"],
      weathercode: [65, 82],
    };
    expect(forecastHeavyRainAlert(daily).alert).toBe(false);
  });

  it("does not flag for an empty forecast", () => {
    expect(forecastHeavyRainAlert({ time: [], weathercode: [] }).alert).toBe(false);
  });
});
