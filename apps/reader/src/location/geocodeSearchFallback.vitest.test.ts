import { describe, expect, it, vi } from "vitest";

import { geocodeSearch } from "./geocodeSearch";

describe("geocodeSearch structured-query fallbacks", () => {
  it("prefers an exact plain-city match over a similarly named result", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          { name: "London", latitude: 39.88645, longitude: -83.44825 },
          {
            name: "New London",
            latitude: 39.58532,
            longitude: -91.40098,
            population: 950,
          },
          {
            name: "New London",
            latitude: 41.35565,
            longitude: -72.09952,
            population: 27179,
          },
        ],
      }),
    });

    await expect(geocodeSearch("New London", { fetcher })).resolves.toEqual({
      ok: true,
      latitude: 41.35565,
      longitude: -72.09952,
    });
  });

  it("uses the city and state fallback when Open-Meteo has no match", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ generationtime_ms: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          places: [{ latitude: "41.3507", longitude: "-72.1062" }],
        }),
      });

    const result = await geocodeSearch("New London, CT", { fetcher });

    expect(fetcher).toHaveBeenNthCalledWith(
      2,
      "https://api.zippopotam.us/us/CT/New%20London",
    );
    expect(result).toEqual({
      ok: true,
      latitude: 41.3507,
      longitude: -72.1062,
    });
  });

  it("uses the ZIP fallback when Open-Meteo has no match", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ generationtime_ms: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          places: [{ latitude: "41.3507", longitude: "-72.1062" }],
        }),
      });

    const result = await geocodeSearch("06320", { fetcher });

    expect(fetcher).toHaveBeenNthCalledWith(
      2,
      "https://api.zippopotam.us/us/06320",
    );
    expect(result).toEqual({
      ok: true,
      latitude: 41.3507,
      longitude: -72.1062,
    });
  });

  it("returns Location not found when the structured fallback is empty", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ generationtime_ms: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ places: [] }),
      });

    await expect(geocodeSearch("New London, CT", { fetcher })).resolves.toEqual({
      ok: false,
      error: "Location not found",
    });
  });
});
