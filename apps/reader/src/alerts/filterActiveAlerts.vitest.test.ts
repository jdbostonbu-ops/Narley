import { describe, it, expect } from "vitest";
import { filterActiveAlerts } from "./filterActiveAlerts";

const heatAlert = (expectedAt: string) => ({ type: "HEAT" as const, expectedAt });
const nwsAlert = (expires: string) => ({
  event: "Flood Warning",
  headline: "Flood warning in effect",
  expires,
  severity: "Severe",
});

describe("filterActiveAlerts (ALERT-R-006)", () => {
  it("removes expired alerts and keeps active ones", () => {
    const now = new Date("2026-07-16T13:00:00Z");
    const activeHeat = heatAlert("2026-07-16T12:00:00Z");      // 1h ago, within 24h → active
    const expiredHeat = heatAlert("2026-07-15T11:00:00Z");     // >24h ago → expired
    const activeNws = nwsAlert("2026-07-16T18:00:00Z");        // expires later → active
    const expiredNws = nwsAlert("2026-07-16T10:00:00Z");       // expires passed → expired

    const result = filterActiveAlerts(
      [activeHeat, expiredHeat, activeNws, expiredNws],
      now,
    );

    expect(result).toContain(activeHeat);
    expect(result).toContain(activeNws);
    expect(result).not.toContain(expiredHeat);
    expect(result).not.toContain(expiredNws);
  });

  it("returns an empty list when all alerts are expired", () => {
    const now = new Date("2026-07-20T00:00:00Z");
    const result = filterActiveAlerts(
      [heatAlert("2026-07-15T11:00:00Z"), nwsAlert("2026-07-15T18:00:00Z")],
      now,
    );
    expect(result).toEqual([]);
  });

  it("returns all alerts when none are expired", () => {
    const now = new Date("2026-07-16T12:00:00Z");
    const alerts = [heatAlert("2026-07-16T11:00:00Z"), nwsAlert("2026-07-16T18:00:00Z")];
    const result = filterActiveAlerts(alerts, now);
    expect(result).toHaveLength(2);
  });

  it("does not mutate the input list", () => {
    const now = new Date("2026-07-20T00:00:00Z");
    const alerts = [heatAlert("2026-07-15T11:00:00Z"), nwsAlert("2026-07-16T18:00:00Z")];
    const original = [...alerts];
    filterActiveAlerts(alerts, now);
    expect(alerts).toEqual(original);
  });
})
