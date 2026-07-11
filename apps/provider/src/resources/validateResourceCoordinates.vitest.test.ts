import { describe, it, expect } from "vitest";
import { validateResource } from "./validateResource";
import { validResource } from "./validResource.fixture";

describe("validateResource — coordinate ranges (POST-006)", () => {
  it("accepts coordinates within valid ranges", () => {
    expect(validateResource(validResource).valid).toBe(true);
  });

  it("rejects latitude below -90", () => {
    const { valid, errors } = validateResource({ ...validResource, latitude: -91 });
    expect(valid).toBe(false);
    expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
  });

  it("rejects latitude above 90", () => {
    const { valid, errors } = validateResource({ ...validResource, latitude: 91 });
    expect(valid).toBe(false);
    expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
  });

  it("rejects longitude below -180", () => {
    const { valid, errors } = validateResource({ ...validResource, longitude: -181 });
    expect(valid).toBe(false);
    expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
  });

  it("rejects longitude above 180", () => {
    const { valid, errors } = validateResource({ ...validResource, longitude: 181 });
    expect(valid).toBe(false);
    expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
  });

  it("rejects NaN latitude", () => {
    const { valid, errors } = validateResource({ ...validResource, latitude: NaN });
    expect(valid).toBe(false);
    expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
  });

  it("rejects infinite longitude", () => {
    const { valid, errors } = validateResource({ ...validResource, longitude: Infinity });
    expect(valid).toBe(false);
    expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
  });

  it("accepts boundary values (-90, 90, -180, 180)", () => {
    expect(validateResource({ ...validResource, latitude: -90, longitude: -180 }).valid).toBe(true);
    expect(validateResource({ ...validResource, latitude: 90, longitude: 180 }).valid).toBe(true);
  });
});
