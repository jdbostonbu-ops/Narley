import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";
import { validResource } from "./validResource.fixture";

const DAY = 24 * 60 * 60 * 1000;

describe("validateResource — expiration (POST-009)", () => {
  it("accepts a valid future expiration within one year", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing expiration date", () => {
    const { expiresAt, ...withoutExpiration } = validResource;
    const { valid, errors } = validateResource(withoutExpiration);
    expect(valid).toBe(false);
    expect(errors.some((e) => /expiration/i.test(e))).toBe(true);
  });

  it("rejects an invalid date", () => {
    const { valid, errors } = validateResource({
      ...validResource,
      expiresAt: new Date("not a date"),
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /expiration/i.test(e))).toBe(true);
  });

  it("rejects a past date", () => {
    const { valid, errors } = validateResource({
      ...validResource,
      expiresAt: new Date(Date.now() - DAY),
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /expiration/i.test(e))).toBe(true);
  });

  it("rejects an expiration more than one year out", () => {
    const { valid, errors } = validateResource({
      ...validResource,
      expiresAt: new Date(Date.now() + 366 * DAY),
    });
    expect(valid).toBe(false);
    expect(errors.some((e) => /year/i.test(e))).toBe(true);
  });
});
