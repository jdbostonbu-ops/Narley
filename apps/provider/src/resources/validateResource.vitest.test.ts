import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";

const validResource = {
  title: "Food Pantry",
  category: "Food",
};

describe("validateResource — title (POST-002)", () => {
  it("accepts a resource with a non-empty title", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects an empty title", () => {
    const { valid, errors } = validateResource({ title: "" });
    expect(valid).toBe(false);
    expect(errors.some((e) => /title/i.test(e))).toBe(true);
  });

  it("rejects a whitespace-only title", () => {
    const { valid, errors } = validateResource({ title: "   " });
    expect(valid).toBe(false);
    expect(errors.some((e) => /title/i.test(e))).toBe(true);
  });

  it("rejects a missing title", () => {
    const { valid, errors } = validateResource({});
    expect(valid).toBe(false);
    expect(errors.some((e) => /title/i.test(e))).toBe(true);
  });
});
