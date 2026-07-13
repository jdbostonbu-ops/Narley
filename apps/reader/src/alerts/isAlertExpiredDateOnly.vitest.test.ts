import { describe, it, expect } from "vitest";
import { isAlertExpired } from "./isAlertExpired";

// Open-Meteo DAILY data returns date-only strings like "2026-07-13".
// Rule (ALERT-R-006, date-only): a daily alert stays active through all of its
// own date AND the following day (local), expiring 24h after the local end of
// its date. It must NOT expire in the evening of its own date (the UTC-midnight bug).
const heatAlert = (expectedAt: string) => ({ type: "HEAT" as const, expectedAt });

describe("isAlertExpired with date-only expectedAt (ALERT-R-006)", () => {
  // Uses UTC timestamps with clear margins so results don't depend on the
  // machine timezone at boundary edges.

  it("stays active in the evening of the alert's own date (regression: UTC-midnight bug)", () => {
    // 9 PM EDT on 2026-07-13  == 2026-07-14T01:00:00Z
    expect(isAlertExpired(heatAlert("2026-07-13"), new Date("2026-07-14T01:00:00Z"))).toBe(false);
  });

  it("stays active midday the following day (2026-07-14)", () => {
    // ~noon EDT 2026-07-14 == 2026-07-14T16:00:00Z
    expect(isAlertExpired(heatAlert("2026-07-13"), new Date("2026-07-14T16:00:00Z"))).toBe(false);
  });

  it("IS expired midday two days later (2026-07-15) — clearly past the window", () => {
    // ~noon EDT 2026-07-15 == 2026-07-15T16:00:00Z
    expect(isAlertExpired(heatAlert("2026-07-13"), new Date("2026-07-15T16:00:00Z"))).toBe(true);
  });

  it("IS expired several days later", () => {
    expect(isAlertExpired(heatAlert("2026-07-13"), new Date("2026-07-18T12:00:00Z"))).toBe(true);
  });
})
