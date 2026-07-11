import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";

const validResource = {
  title: "Food Pantry",
  category: "Food",
  latitude: 41.31,
  longitude: -72.92,
};

describe("validateResource — location (POST-005)", () => {
  it("accepts a resource with latitude and longitude", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing latitude", () => {
    const { valid, errors } = validateResource({
      title: "Food Pantry",
      category: "Food",
      longitude: -72.92,
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|latitude/i.test(e))).toBe(true);
  });

  it("rejects a missing longitude", () => {
    const { valid, errors } = validateResource({
      title: "Food Pantry",
      category: "Food",
      latitude: 41.31,
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|longitude/i.test(e))).toBe(true);
  });

  it("rejects when both coordinates are missing", () => {
    const { valid, errors } = validateResource({
      title: "Food Pantry",
      category: "Food",
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|latitude|longitude/i.test(e))).toBe(true);
  });
});
