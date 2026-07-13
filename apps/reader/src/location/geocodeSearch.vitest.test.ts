import { beforeEach, describe, expect, it, vi } from "vitest";

import { geocodeSearch } from "./geocodeSearch";

const fetcher = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("geocodeSearch", () => {
  it("returns coordinates for a city and encodes the query", async () => {
    fetcher.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ latitude: 41.3083, longitude: -72.9279 }],
      }),
    });

    const result = await geocodeSearch("New Haven, CT", { fetcher });

    expect(fetcher).toHaveBeenCalledWith(expect.stringContaining("name=New%20Haven%2C%20CT"));
    expect(result).toEqual({
      ok: true,
      latitude: 41.3083,
      longitude: -72.9279,
    });
  });

  it("returns coordinates for a five-digit ZIP code", async () => {
    fetcher.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ latitude: 41.3557, longitude: -72.0995 }],
      }),
    });

    const result = await geocodeSearch("06320", { fetcher });

    expect(result.ok).toBe(true);
    expect(fetcher).toHaveBeenCalledWith(expect.stringContaining("name=06320"));
  });

  it("returns Location not found when the geocoder has no results", async () => {
    fetcher.mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });

    await expect(geocodeSearch("Not A Place", { fetcher })).resolves.toEqual({
      ok: false,
      error: "Location not found",
    });
  });

  it("rejects malformed coordinates", async () => {
    fetcher.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [{ latitude: "41.3", longitude: null }],
      }),
    });

    await expect(geocodeSearch("New Haven", { fetcher })).resolves.toEqual({
      ok: false,
      error: "Location not found",
    });
  });

  it("returns a gentle prompt for an empty query without fetching", async () => {
    await expect(geocodeSearch("   ", { fetcher })).resolves.toEqual({
      ok: false,
      error: "Enter a city or ZIP code",
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("returns an error when the geocoder request fails", async () => {
    fetcher.mockRejectedValue(new Error("network unavailable"));

    await expect(geocodeSearch("New Haven", { fetcher })).resolves.toEqual({
      ok: false,
      error: "Unable to search for that location",
    });
  });
});
