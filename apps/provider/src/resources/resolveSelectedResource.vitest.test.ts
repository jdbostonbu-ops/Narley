import { describe, it, expect } from "vitest";
import { resolveSelectedResource } from "./resolveSelectedResource";

type TestResource = { id: string; address: string };

const allResources: TestResource[] = [
  { id: "a", address: "1 Main St, New Haven, CT 06515" },
  { id: "b", address: "2 Oak Ave, New Haven, CT 06515" },
  { id: "c", address: "3 Elm Rd, New London, CT 06320" },
];

describe("resolveSelectedResource (PMAP-016 tap any pin shows its card on demand)", () => {
  it("resolves the selected resource from the full resource set by id", () => {
    const result = resolveSelectedResource(allResources, "a");
    expect(result).toEqual(allResources[0]);
  });

  it("resolves a resource outside the current-location filter (e.g. another ZIP)", () => {
    const result = resolveSelectedResource(allResources, "c");
    expect(result).toEqual(allResources[2]);
  });

  it("returns null when no id is selected", () => {
    const result = resolveSelectedResource(allResources, null);
    expect(result).toBe(null);
  });

  it("returns null when the id is not found", () => {
    const result = resolveSelectedResource(allResources, "missing");
    expect(result).toBe(null);
  });
});
