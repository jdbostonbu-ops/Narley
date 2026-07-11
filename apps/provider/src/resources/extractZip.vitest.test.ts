import { describe, it, expect } from "vitest";
import { extractZip } from "./extractZip";

describe("extractZip (RMAP ZIP search)", () => {
  it("extracts the 5-digit ZIP from a complete address", () => {
    expect(extractZip("102 Plant St, New London, CT 06320")).toBe("06320");
  });

  it("extracts the ZIP when it is at the end with no trailing text", () => {
    expect(extractZip("55 Broad St, Mystic, CT 06355")).toBe("06355");
  });

  it("returns null when there is no 5-digit ZIP", () => {
    expect(extractZip("102 Plant St, New London, CT")).toBeNull();
  });

  it("returns null for an empty address", () => {
    expect(extractZip("")).toBeNull();
  });
})
