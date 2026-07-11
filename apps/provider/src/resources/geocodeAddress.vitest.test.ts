import { describe, it, expect, vi, beforeEach } from "vitest";
import { geocodeAddress } from "./geocodeAddress";

const geocode = vi.fn();
const deps = { geocode };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("geocodeAddress (POST-007)", () => {
  it("returns coordinates for an address the geocoder resolves", async () => {
    geocode.mockResolvedValue({ latitude: 41.31, longitude: -72.92 });

    const result = await geocodeAddress("123 Main St, New Haven, CT", deps);

    expect(result.ok).toBe(true);
    expect(result.latitude).toBe(41.31);
    expect(result.longitude).toBe(-72.92);
  });

  it("returns an invalid-address error when the geocoder finds no match", async () => {
    geocode.mockResolvedValue(null);

    const result = await geocodeAddress("asdfghjkl nowhere", deps);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/invalid address/i);
    expect(result.latitude).toBeUndefined();
    expect(result.longitude).toBeUndefined();
  });

  it("does not preserve coordinates when the geocoder throws", async () => {
    geocode.mockRejectedValue(new Error("network down"));

    const result = await geocodeAddress("123 Main St", deps);

    expect(result.ok).toBe(false);
    expect(result.latitude).toBeUndefined();
    expect(result.longitude).toBeUndefined();
  });
});
