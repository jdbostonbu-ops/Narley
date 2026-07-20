import { describe, it, expect } from "vitest";
import { resolveDisplayedResources } from "./resolveDisplayedResources";

type TestResource = { id: string; address: string };

const resources: TestResource[] = [
  { id: "a", address: "1 Main St, New London, CT 06320" },
  { id: "b", address: "2 Oak Ave, New London, CT 06320" },
  { id: "c", address: "3 Elm Rd, Springfield, MO 65802" },
  { id: "d", address: "4 Pine St, Boston, MA 02108" },
];

const idsOf = (list: readonly TestResource[]) => list.map((r) => r.id);

describe("resolveDisplayedResources (RMAP-012 cards filter to current location)", () => {
  it("with no search, filters cards to the user's current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06320", null);
    expect(idsOf(result)).toEqual(["a", "b"]);
  });

  it("with no search, excludes resources outside the current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06320", null);
    expect(idsOf(result)).not.toContain("c");
    expect(idsOf(result)).not.toContain("d");
  });

  it("with no search, does not return all resources", () => {
    const result = resolveDisplayedResources(resources, "06320", null);
    expect(result.length).toBe(2);
  });

  it("follows the user to a new current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "02108", null);
    expect(idsOf(result)).toEqual(["d"]);
  });

  it("an active search ZIP overrides the current-location ZIP", () => {
    const result = resolveDisplayedResources(resources, "06320", "65802");
    expect(idsOf(result)).toEqual(["c"]);
  });

  it("returns no cards when the current-location ZIP is unknown and no search is active", () => {
    const result = resolveDisplayedResources(resources, null, null);
    expect(result).toEqual([]);
  });
});
