import { describe, it, expect } from "vitest";
import { nwsAlerts } from "./nwsAlerts";

const feature = (event: string) => ({ properties: { event } });

describe("nwsAlerts (ALERT-R-001 NWS warnings)", () => {
  it("surfaces a Tornado Warning", () => {
    const result = nwsAlerts([feature("Tornado Warning")]);
    expect(result.map((a) => a.event)).toEqual(["Tornado Warning"]);
  });

  it("surfaces hurricane, flood, winter storm, and severe thunderstorm warnings", () => {
    const result = nwsAlerts([
      feature("Hurricane Warning"),
      feature("Flood Warning"),
      feature("Flash Flood Warning"),
      feature("Winter Storm Warning"),
      feature("Severe Thunderstorm Warning"),
    ]);
    expect(result).toHaveLength(5);
  });

  it("filters out a Watch (not a Warning)", () => {
    const result = nwsAlerts([feature("Tornado Watch")]);
    expect(result).toEqual([]);
  });

  it("filters out events not on the named list", () => {
    const result = nwsAlerts([
      feature("Rip Current Statement"),
      feature("Special Weather Statement"),
      feature("Heat Advisory"),
    ]);
    expect(result).toEqual([]);
  });

  it("keeps only the warnings from a mixed list", () => {
    const result = nwsAlerts([
      feature("Tornado Warning"),
      feature("Tornado Watch"),
      feature("Rip Current Statement"),
      feature("Flood Warning"),
    ]);
    expect(result.map((a) => a.event)).toEqual(["Tornado Warning", "Flood Warning"]);
  });

  it("returns an empty list when there are no features", () => {
    expect(nwsAlerts([])).toEqual([]);
  });
})
