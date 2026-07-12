import { describe, expect, it } from "vitest";

import { mapOpenMeteoForecast } from "./mapOpenMeteoForecast";

describe("mapOpenMeteoForecast", () => {
  it("maps daily Open-Meteo maximum temperatures to the tested forecast shape", () => {
    expect(mapOpenMeteoForecast({
      daily: {
        time: ["2026-07-12", "2026-07-13"],
        temperature_2m_max: [88, 94],
      },
    })).toEqual({
      time: ["2026-07-12", "2026-07-13"],
      temperature_2m: [88, 94],
    });
  });

  it("rejects malformed or mismatched forecast arrays", () => {
    expect(mapOpenMeteoForecast({ daily: { time: ["2026-07-12"], temperature_2m_max: [] } })).toBeNull();
    expect(mapOpenMeteoForecast({ daily: null })).toBeNull();
  });
});
