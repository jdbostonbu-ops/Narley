import { describe, it, expect } from "vitest";
import { isAlertExpired } from "./isAlertExpired";

const heatAlert = (expectedAt: string) => ({ type: "HEAT" as const, expectedAt });
const nwsAlert = (expires: string) => ({
  event: "Tornado Warning",
  headline: "Tornado warning in effect",
  expires,
  severity: "Severe",
});

describe("isAlertExpired (ALERT-R-006)", () => {
  it("temperature alert is NOT expired before expectedAt + 24h", () => {
    // expectedAt is 1 hour ago; +24h window still open
    const now = new Date("2026-07-15T12:00:00Z");
    const alert = heatAlert("2026-07-15T11:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(false);
  });

  it("temperature alert IS expired at more than 24h past expectedAt", () => {
    // expectedAt was ~25 hours before now
    const now = new Date("2026-07-16T13:00:00Z");
    const alert = heatAlert("2026-07-15T11:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(true);
  });

  it("temperature alert is NOT expired exactly at expectedAt (well within 24h)", () => {
    const now = new Date("2026-07-15T11:00:00Z");
    const alert = heatAlert("2026-07-15T11:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(false);
  });

  it("NWS alert is NOT expired before its expires timestamp", () => {
    const now = new Date("2026-07-15T12:00:00Z");
    const alert = nwsAlert("2026-07-15T18:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(false);
  });

  it("NWS alert IS expired after its expires timestamp", () => {
    const now = new Date("2026-07-15T19:00:00Z");
    const alert = nwsAlert("2026-07-15T18:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(true);
  });

  it("uses the NWS expires field, NOT a 24h rule, for NWS alerts", () => {
    // 2 hours past expires — expired by NWS rule, even though <24h
    const now = new Date("2026-07-15T20:00:00Z");
    const alert = nwsAlert("2026-07-15T18:00:00Z");
    expect(isAlertExpired(alert, now)).toBe(true);
  });
})
