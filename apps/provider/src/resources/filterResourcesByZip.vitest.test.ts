import { describe, it, expect } from "vitest";
import { filterResourcesByZip } from "./filterResourcesByZip";

describe("filterResourcesByZip (RMAP ZIP search)", () => {
  it("includes only resources whose address ZIP matches the searched ZIP", () => {
    const resources = [
      { id: "a", address: "102 Plant St, New London, CT 06320" },
      { id: "b", address: "55 Broad St, Mystic, CT 06355" },
      { id: "c", address: "7 Green St, New London, CT 06320" },
    ];
    const result = filterResourcesByZip(resources, "06320");
    expect(result.map((r) => r.id)).toEqual(["a", "c"]);
  });

  it("matches a resource with a ZIP+4 address against a 5-digit search", () => {
    const resources = [
      { id: "a", address: "102 Plant St, New London, CT 06320-1234" },
    ];
    const result = filterResourcesByZip(resources, "06320");
    expect(result.map((r) => r.id)).toEqual(["a"]);
  });

  it("returns an empty array when no resource matches the ZIP", () => {
    const resources = [
      { id: "a", address: "55 Broad St, Mystic, CT 06355" },
    ];
    expect(filterResourcesByZip(resources, "06320")).toEqual([]);
  });

  it("excludes resources with no extractable ZIP", () => {
    const resources = [
      { id: "a", address: "102 Plant St, New London, CT" },
      { id: "b", address: "7 Green St, New London, CT 06320" },
    ];
    const result = filterResourcesByZip(resources, "06320");
    expect(result.map((r) => r.id)).toEqual(["b"]);
  });

  it("returns an empty array for an empty resource list", () => {
    expect(filterResourcesByZip([], "06320")).toEqual([]);
  });
})
