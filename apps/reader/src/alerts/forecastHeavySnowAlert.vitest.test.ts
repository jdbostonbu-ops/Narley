import { describe, it, expect } from "vitest";
import { forecastHeavySnowAlert } from "./forecastHeavySnowAlert";

describe("forecastHeavySnowAlert (ALERT-R-008 heavy snow, 2-day advance)", () => {
  it("flags heavy snow when the index-2 day weathercode is 75, with that day's date", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 3, 75],
    };
    const result = forecastHeavySnowAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HEAVY_SNOW");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("flags heavy snow when the index-2 day weathercode is 86 (heavy snow showers)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [1, 2, 86],
    };
    const result = forecastHeavySnowAlert(daily);
    expect(result.alert).toBe(true);
    if (result.alert) {
      expect(result.type).toBe("HEAVY_SNOW");
      expect(result.expectedAt).toBe("2026-07-21");
    }
  });

  it("does not flag when index 2 is light or moderate snow (71, 73, 77, 85)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [0, 0, 73],
    };
    expect(forecastHeavySnowAlert(daily).alert).toBe(false);
  });

  it("does not flag based on today (index 0) or tomorrow (index 1) heavy snow", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20", "2026-07-21"],
      weathercode: [75, 86, 0],
    };
    expect(forecastHeavySnowAlert(daily).alert).toBe(false);
  });

  it("does not flag when the forecast has no index 2 (too short)", () => {
    const daily = {
      time: ["2026-07-19", "2026-07-20"],
      weathercode: [75, 86],
    };
    expect(forecastHeavySnowAlert(daily).alert).toBe(false);
  });

  it("does not flag for an empty forecast", () => {
    expect(forecastHeavySnowAlert({ time: [], weathercode: [] }).alert).toBe(false);
  });
});
