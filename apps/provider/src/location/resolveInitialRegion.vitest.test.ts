import { describe, it, expect } from "vitest";
import { resolveInitialRegion } from "./resolveInitialRegion";

const fallbackRegion = {
  latitude: 41.3557,
  longitude: -72.0995,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

describe("resolveInitialRegion (PMAP-013 provider map centers on GPS location)", () => {
  it("centers on the provider's GPS location when available", () => {
    const result = resolveInitialRegion(
      { latitude: 41.3081, longitude: -72.9282 },
      fallbackRegion,
    );

    expect(result.latitude).toBe(41.3081);
    expect(result.longitude).toBe(-72.9282);
  });

  it("follows the provider to a different location", () => {
    const result = resolveInitialRegion(
      { latitude: 41.3557, longitude: -72.0995 },
      fallbackRegion,
    );

    expect(result.latitude).toBe(41.3557);
    expect(result.longitude).toBe(-72.0995);
  });

  it("uses the fallback region when GPS location is null", () => {
    const result = resolveInitialRegion(null, fallbackRegion);

    expect(result).toEqual(fallbackRegion);
  });

  it("does not return the fallback when a real location is provided", () => {
    const result = resolveInitialRegion(
      { latitude: 41.3081, longitude: -72.9282 },
      fallbackRegion,
    );

    expect(result).not.toEqual(fallbackRegion);
  });
});
