import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";

const validResource = {
  title: "Food Pantry",
  category: "Food",
  latitude: 41.31,
  longitude: -72.92,
};

describe("validateResource — category (POST-003)", () => {
  it("accepts a resource with a category selected", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing category", () => {
    const { valid, errors } = validateResource({ title: "Food Pantry" });
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });

  it("rejects an empty category", () => {
    const { valid, errors } = validateResource({
      title: "Food Pantry",
      category: "",
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });

  it("rejects a whitespace-only category", () => {
    const { valid, errors } = validateResource({
      title: "Food Pantry",
      category: "   ",
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });
});
