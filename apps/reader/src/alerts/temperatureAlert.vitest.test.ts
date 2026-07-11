import { describe, it, expect } from "vitest";
import { temperatureAlert } from "./temperatureAlert";

describe("temperatureAlert (ALERT-R-001 thresholds)", () => {
  it("flags a hot alert at exactly 91°F", () => {
    const result = temperatureAlert(91);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("HEAT");
  });

  it("flags a hot alert above 91°F", () => {
    const result = temperatureAlert(98);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("HEAT");
  });

  it("flags a cold alert at exactly 32°F", () => {
    const result = temperatureAlert(32);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("COLD");
  });

  it("flags a cold alert below 32°F", () => {
    const result = temperatureAlert(20);
    expect(result.alert).toBe(true);
    expect(result.type).toBe("COLD");
  });

  it("does not flag a temperature between the thresholds", () => {
    const result = temperatureAlert(72);
    expect(result.alert).toBe(false);
  });

  it("does not flag just above the cold threshold (33°F)", () => {
    expect(temperatureAlert(33).alert).toBe(false);
  });

  it("does not flag just below the hot threshold (90°F)", () => {
    expect(temperatureAlert(90).alert).toBe(false);
  });
})
