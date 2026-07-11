import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";
import { validResource } from "./validResource.fixture";

describe("validateResource — address (POST-007 required field)", () => {
  it("accepts a resource with an address", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing address", () => {
    const { address, ...withoutAddress } = validResource;
    const { valid, errors } = validateResource(withoutAddress);
    expect(valid).toBe(false);
    expect(errors.some((e) => /address/i.test(e))).toBe(true);
  });

  it("rejects an empty address", () => {
    const { valid, errors } = validateResource({ ...validResource, address: "" });
    expect(valid).toBe(false);
    expect(errors.some((e) => /address/i.test(e))).toBe(true);
  });

  it("rejects a whitespace-only address", () => {
    const { valid, errors } = validateResource({ ...validResource, address: "   " });
    expect(valid).toBe(false);
    expect(errors.some((e) => /address/i.test(e))).toBe(true);
  });
});
