import { describe, it, expect } from "vitest";
import { resolveMapPins } from "./resolveMapPins";

type TestResource = { id: string; address: string; latitude: number; longitude: number };

const visibleResources: TestResource[] = [
  { id: "a", address: "1 Main St, New Haven, CT 06515", latitude: 41.31, longitude: -72.93 },
  { id: "b", address: "2 Oak Ave, New Haven, CT 06515", latitude: 41.32, longitude: -72.92 },
  { id: "c", address: "3 Elm Rd, New London, CT 06320", latitude: 41.35, longitude: -72.1 },
  { id: "d", address: "4 Pine St, Springfield, MO 65802", latitude: 37.21, longitude: -93.29 },
];

const idsOf = (list: readonly TestResource[]) => list.map((r) => r.id);

describe("resolveMapPins (PMAP-017 map renders all resource pins regardless of card filter)", () => {
  it("renders a pin for every visible resource regardless of location", () => {
    const result = resolveMapPins(visibleResources);
    expect(idsOf(result)).toEqual(["a", "b", "c", "d"]);
  });

  it("includes resources outside the current-location ZIP (other areas still show as pins)", () => {
    const result = resolveMapPins(visibleResources);
    expect(idsOf(result)).toContain("c");
    expect(idsOf(result)).toContain("d");
  });

  it("does not filter pins down to a single location", () => {
    const result = resolveMapPins(visibleResources);
    expect(result.length).toBe(4);
  });

  it("only includes resources with valid coordinates", () => {
    const withMissingCoords = [
      ...visibleResources,
      { id: "e", address: "5 No Coords Ln", latitude: NaN, longitude: NaN },
    ];
    const result = resolveMapPins(withMissingCoords);
    expect(idsOf(result)).not.toContain("e");
  });
});
