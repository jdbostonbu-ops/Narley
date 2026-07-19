import { describe, it, expect } from "vitest";
import { normalizeAlert } from "./normalizeAlert";

const zip = "06320";

describe("normalizeAlert (ALERT-R-002 common alert fields)", () => {
  it("normalizes a HEAT forecast alert with advice, no severity", () => {
    const alert = normalizeAlert(
      { type: "HEAT", expectedAt: "2026-07-12T14:00" },
      zip
    );
    expect(alert.title).toBe("Extreme Heat");
    expect(alert.message).toBe("Extreme heat expected at 2026-07-12T14:00");
    expect(alert.location).toBe("06320");
    expect(alert.time).toBe("2026-07-12T14:00");
    expect(alert.advice).toBe("keep cool");
    expect(alert.severity).toBeNull();
  });

  it("normalizes a COLD forecast alert with advice, no severity", () => {
    const alert = normalizeAlert(
      { type: "COLD", expectedAt: "2026-07-12T02:00" },
      zip
    );
    expect(alert.title).toBe("Extreme Cold");
    expect(alert.message).toBe("Extreme cold expected at 2026-07-12T02:00");
    expect(alert.location).toBe("06320");
    expect(alert.time).toBe("2026-07-12T02:00");
    expect(alert.advice).toBe("bundle up");
    expect(alert.severity).toBeNull();
  });

  it("normalizes an NWS alert with severity, no advice", () => {
    const alert = normalizeAlert(
      {
        event: "Tornado Warning",
        headline: "Tornado Warning issued July 12 until 3:30 PM",
        expires: "2026-07-12T15:30",
        severity: "Severe",
      },
      zip
    );
    expect(alert.title).toBe("Tornado Warning");
    expect(alert.message).toBe("Tornado Warning issued July 12 until 3:30 PM");
    expect(alert.location).toBe("06320");
    expect(alert.time).toBe("2026-07-12T15:30");
    expect(alert.severity).toBe("Severe");
    expect(alert.advice).toBeNull();
  });

  it("gives every normalized alert the same fields", () => {
    const temp = normalizeAlert({ type: "HEAT", expectedAt: "2026-07-12T14:00" }, zip);
    const nws = normalizeAlert(
      { event: "Flood Warning", headline: "Flood Warning", expires: "2026-07-12T20:00", severity: "Severe" },
      zip
    );
    const keys = ["title", "message", "location", "time", "severity", "advice"];
    for (const k of keys) {
      expect(temp).toHaveProperty(k);
      expect(nws).toHaveProperty(k);
    }
  });
})

describe("normalizeAlert (ALERT-R-013 weather messages use formatted date)", () => {
  const zip = "06320";

  it("formats a HEAVY_RAIN message with the human-readable date", () => {
    const alert = normalizeAlert({ type: "HEAVY_RAIN", expectedAt: "2026-07-21" }, zip);
    expect(alert.message).toBe("Heavy rain expected on Tuesday, Jul 21, 2026");
    expect(alert.message).not.toContain("2026-07-21");
  });

  it("formats a HEAVY_SNOW message with the human-readable date", () => {
    const alert = normalizeAlert({ type: "HEAVY_SNOW", expectedAt: "2026-07-21" }, zip);
    expect(alert.message).toBe("Heavy snow expected on Tuesday, Jul 21, 2026");
    expect(alert.message).not.toContain("2026-07-21");
  });

  it("formats a THUNDERSTORM message with the human-readable date", () => {
    const alert = normalizeAlert({ type: "THUNDERSTORM", expectedAt: "2026-07-21" }, zip);
    expect(alert.message).toBe("Thunderstorm expected on Tuesday, Jul 21, 2026");
    expect(alert.message).not.toContain("2026-07-21");
  });

  it("formats a HIGH_WIND message with the human-readable date", () => {
    const alert = normalizeAlert({ type: "HIGH_WIND", expectedAt: "2026-07-21" }, zip);
    expect(alert.message).toBe("High wind expected on Tuesday, Jul 21, 2026");
    expect(alert.message).not.toContain("2026-07-21");
  });

  it("leaves temperature alert messages unchanged", () => {
    const alert = normalizeAlert({ type: "HEAT", expectedAt: "2026-07-12T14:00" }, zip);
    expect(alert.message).toBe("Extreme heat expected at 2026-07-12T14:00");
  });
});
