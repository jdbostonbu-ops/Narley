import { describe, it, expect } from "vitest";
import { resolveDisplayedResources } from "./resolveDisplayedResources";

type TestResource = { id: string; address: string };

const resources: TestResource[] = [
  { id: "a", address: "1 Main St, New Haven, CT 06515" },
  { id: "b", address: "2 Oak Ave, New Haven, CT 06515" },
  { id: "c", address: "3 Elm Rd, New London, CT 06320" },
  { id: "d", address: "4 Pine St, Springfield, MO 65802" },
];

const idsOf = (list: readonly TestResource[]) => list.map((r) => r.id);

describe("resolveDisplayedResources (PMAP-014 provider cards filter to current location)", () => {
  it("with no search, filters cards to the provider's current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06515", null);
    expect(idsOf(result)).toEqual(["a", "b"]);
  });

  it("with no search, excludes resources outside the current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06515", null);
    expect(idsOf(result)).not.toContain("c");
    expect(idsOf(result)).not.toContain("d");
  });

  it("with no search, does not return all resources", () => {
    const result = resolveDisplayedResources(resources, "06515", null);
    expect(result.length).toBe(2);
  });

  it("follows the provider to a new current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06320", null);
    expect(idsOf(result)).toEqual(["c"]);
  });

  it("an active search ZIP overrides the current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06515", "65802");
    expect(idsOf(result)).toEqual(["d"]);
  });

  it("returns no cards when the current-location ZIP is unknown and no search is active", () => {
    const result = resolveDisplayedResources(resources, null, null);
    expect(result).toEqual([]);
  });
});
