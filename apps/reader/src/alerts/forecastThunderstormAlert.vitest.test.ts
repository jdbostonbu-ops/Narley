import { describe, it, expect } from "vitest";
import { forecastThunderstormAlert } from "./forecastThunderstormAlert";

describe("forecastThunderstormAlert (ALERT-R-009 thunderstorm, 2-day advance)", () => {
  it("flags a thunderstorm when the index-2 day weathercode is 95, with that day's date", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 3, 95],
    };
    const result = forecastThunderstormAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("THUNDERSTORM");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("flags a thunderstorm when the index-2 day weathercode is 96 (with slight hail)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [1, 2, 96],
    };
    const result = forecastThunderstormAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("THUNDERSTORM");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("flags a thunderstorm when the index-2 day weathercode is 99 (with heavy hail)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 1, 99],
    };
    const result = forecastThunderstormAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("THUNDERSTORM");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("does not flag when index 2 is not a thunderstorm code", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 0, 65],
    };
    expect(forecastThunderstormAlert(daily).alert).toBe(false);
  });

  it("does not flag based on today (index 0) or tomorrow (index 1) thunderstorm", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [95, 99, 0],
    };
    expect(forecastThunderstormAlert(daily).alert).toBe(false);
  });

  it("does not flag when the forecast has no index 2 (too short)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20"],
      weathercode: [95, 99],
    };
    expect(forecastThunderstormAlert(daily).alert).toBe(false);
  });

  it("does not flag for an empty forecast", () => {
    expect(forecastThunderstormAlert({ time: [], weathercode: [] }).alert).toBe(false);
  });
});
