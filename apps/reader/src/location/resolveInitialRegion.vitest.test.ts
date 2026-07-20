import { describe, it, expect } from "vitest";
import { resolveInitialRegion } from "./resolveInitialRegion";

const fallbackRegion = {
  latitude: 41.3557,
  longitude: -72.0995,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

describe("resolveInitialRegion (RMAP-011 map centers on GPS location)", () => {
  it("centers on the user's GPS location when available", () => {
    const result = resolveInitialRegion(
      { latitude: 42.3601, longitude: -71.0589 },
      fallbackRegion,
    );

    expect(result.latitude).toBe(42.3601);
    expect(result.longitude).toBe(-71.0589);
  });

  it("follows the user to a different location", () => {
    const result = resolveInitialRegion(
      { latitude: 40.7128, longitude: -74.006 },
      fallbackRegion,
    );

    expect(result.latitude).toBe(40.7128);
    expect(result.longitude).toBe(-74.006);
  });

  it("uses the fallback region when GPS location is null", () => {
    const result = resolveInitialRegion(null, fallbackRegion);

    expect(result).toEqual(fallbackRegion);
  });

  it("does not return the fallback when a real location is provided", () => {
    const result = resolveInitialRegion(
      { latitude: 42.3601, longitude: -71.0589 },
      fallbackRegion,
    );

    expect(result).not.toEqual(fallbackRegion);
  });
});
