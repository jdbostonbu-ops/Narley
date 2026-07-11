import { describe, it, expect } from "vitest";
import { forecastTemperatureAlert } from "./forecastTemperatureAlert";

describe("forecastTemperatureAlert (ALERT-R-001 forecast thresholds)", () => {
  it("flags heat at the first hour that reaches 91F, with its time", () => {
    const hourly = {
      time: ["2026-07-12T12:00", "2026-07-12T13:00", "2026-07-12T14:00"],
      temperature_2m: [85, 91, 95],
    };
    const result = forecastTemperatureAlert(hourly);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("HEAT");
    expect(result.expectedAt).toBe("2026-07-12T13:00");
  });

  it("flags cold at the first hour that reaches 32F, with its time", () => {
    const hourly = {
      time: ["2026-07-12T02:00", "2026-07-12T03:00", "2026-07-12T04:00"],
      temperature_2m: [40, 35, 32],
    };
    const result = forecastTemperatureAlert(hourly);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("COLD");
    expect(result.expectedAt).toBe("2026-07-12T04:00");
  });

  it("reports the earliest crossing when several hours exceed the threshold", () => {
    const hourly = {
      time: ["2026-07-12T14:00", "2026-07-12T15:00", "2026-07-12T16:00"],
      temperature_2m: [92, 94, 96],
    };
    const result = forecastTemperatureAlert(hourly);
    expect(result.expectedAt).toBe("2026-07-12T14:00");
  });

  it("does not flag when no hour crosses a threshold", () => {
    const hourly = {
      time: ["2026-07-11T20:00", "2026-07-11T21:00", "2026-07-11T22:00"],
      temperature_2m: [80.8, 80.1, 77.5],
    };
    const result = forecastTemperatureAlert(hourly);
    expect(result.alert).toBe(false);
  });

  it("does not flag just inside the thresholds (90F and 33F)", () => {
    const hourly = {
      time: ["2026-07-12T14:00", "2026-07-12T02:00"],
      temperature_2m: [90, 33],
    };
    expect(forecastTemperatureAlert(hourly).alert).toBe(false);
  });

  it("returns no alert for an empty forecast", () => {
    expect(forecastTemperatureAlert({ time: [], temperature_2m: [] }).alert).toBe(false);
  });
})
