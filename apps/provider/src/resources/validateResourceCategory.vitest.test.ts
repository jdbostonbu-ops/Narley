import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";
import { validResource } from "./validResource.fixture";

describe("validateResource — category (POST-003)", () => {
  it("accepts a resource with a category selected", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing category", () => {
    const { category, ...withoutCategory } = validResource;
    const { valid, errors } = validateResource(withoutCategory);
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });

  it("rejects an empty category", () => {
    const { valid, errors } = validateResource({ ...validResource, category: "" });
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });

  it("rejects a whitespace-only category", () => {
    const { valid, errors } = validateResource({ ...validResource, category: "   " });
    expect(valid).toBe(false);
    expect(errors.some((e) => /category/i.test(e))).toBe(true);
  });
});
