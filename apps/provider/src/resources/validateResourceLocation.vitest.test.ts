import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";
import { validResource } from "./validResource.fixture";

describe("validateResource — location (POST-005)", () => {
  it("accepts a resource with latitude and longitude", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects a missing latitude", () => {
    const { latitude, ...withoutLatitude } = validResource;
    const { valid, errors } = validateResource(withoutLatitude);
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|latitude/i.test(e))).toBe(true);
  });

  it("rejects a missing longitude", () => {
    const { longitude, ...withoutLongitude } = validResource;
    const { valid, errors } = validateResource(withoutLongitude);
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|longitude/i.test(e))).toBe(true);
  });

  it("rejects when both coordinates are missing", () => {
    const { latitude, longitude, ...withoutCoords } = validResource;
    const { valid, errors } = validateResource(withoutCoords);
    expect(valid).toBe(false);
    expect(errors.some((e) => /location|latitude|longitude/i.test(e))).toBe(true);
  });
});
