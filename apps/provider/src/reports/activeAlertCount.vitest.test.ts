import { describe, it, expect } from "vitest";
import { activeAlertCount } from "./activeAlertCount";

const reportAlert = { kind: "report" };
const weatherAlert = { kind: "weather" };

describe("activeAlertCount (ALERT-P-006)", () => {
  it("counts report alerts regardless of the Weather Alerts setting", () => {
    const alerts = [reportAlert, reportAlert, reportAlert];
    expect(activeAlertCount(alerts, false)).toBe(3);
    expect(activeAlertCount(alerts, true)).toBe(3);
  });

  it("counts weather alerts only when Weather Alerts is on", () => {
    const alerts = [weatherAlert, weatherAlert];
    expect(activeAlertCount(alerts, true)).toBe(2);
    expect(activeAlertCount(alerts, false)).toBe(0);
  });

  it("counts report alerts plus weather alerts when the setting is on", () => {
    const alerts = [reportAlert, weatherAlert, reportAlert, weatherAlert];
    expect(activeAlertCount(alerts, true)).toBe(4);
  });

  it("counts only report alerts when the setting is off", () => {
    const alerts = [reportAlert, weatherAlert, reportAlert, weatherAlert];
    expect(activeAlertCount(alerts, false)).toBe(2);
  });

  it("returns zero for an empty alert list", () => {
    expect(activeAlertCount([], true)).toBe(0);
    expect(activeAlertCount([], false)).toBe(0);
  });

  it("returns zero when only weather alerts exist and the setting is off", () => {
    expect(activeAlertCount([weatherAlert, weatherAlert], false)).toBe(0);
  });
})
