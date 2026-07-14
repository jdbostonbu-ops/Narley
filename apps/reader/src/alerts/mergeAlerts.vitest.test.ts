import { describe, it, expect } from "vitest";

import { mergeAlerts } from "./mergeAlerts";
import type { Alert } from "./isAlertExpired";

const heatToday: Alert = { type: "HEAT", expectedAt: "2026-07-14" };
const now = new Date("2026-07-14T18:00:00.000Z");

describe("mergeAlerts (ALERT-R-006 — heat alert persists 24h)", () => {
  it("retains a still-unexpired previous alert even when the new forecast generates none", () => {
    const merged = mergeAlerts([heatToday], [], now);
    expect(merged).toContainEqual(heatToday);
  });

  it("drops a previous alert that is already expired", () => {
    const oldHeat: Alert = { type: "HEAT", expectedAt: "2026-07-01" };
    const merged = mergeAlerts([oldHeat], [], now);
    expect(merged).not.toContainEqual(oldHeat);
  });

  it("adds a newly generated alert", () => {
    const newCold: Alert = { type: "COLD", expectedAt: "2026-07-14" };
    const merged = mergeAlerts([], [newCold], now);
    expect(merged).toContainEqual(newCold);
  });

  it("does not duplicate an alert present in both previous and new", () => {
    const merged = mergeAlerts([heatToday], [heatToday], now);
    const heatMatches = merged.filter(
      (alert) => "type" in alert && alert.type === "HEAT" && alert.expectedAt === "2026-07-14",
    );
    expect(heatMatches).toHaveLength(1);
  });
});
