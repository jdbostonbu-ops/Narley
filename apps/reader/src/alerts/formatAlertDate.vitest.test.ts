import { describe, it, expect } from "vitest";
import { formatAlertDate } from "./formatAlertDate";

describe("formatAlertDate (ALERT-R-012 human-readable alert date)", () => {
  it("formats an ISO date as Weekday, Mon D, YYYY", () => {
    expect(formatAlertDate("2026-07-21")).toBe("Tuesday, Jul 21, 2026");
  });

  it("does not shift the day due to UTC/local timezone parsing", () => {
    // 2026-07-21 must render as Tuesday Jul 21, never Monday Jul 20
    expect(formatAlertDate("2026-07-21")).toBe("Tuesday, Jul 21, 2026");
    // a date that is especially prone to the UTC off-by-one
    expect(formatAlertDate("2026-01-01")).toBe("Thursday, Jan 1, 2026");
  });

  it("formats a single-digit day without a leading zero", () => {
    expect(formatAlertDate("2026-03-05")).toBe("Thursday, Mar 5, 2026");
  });

  it("includes the year", () => {
    expect(formatAlertDate("2025-12-25")).toBe("Thursday, Dec 25, 2025");
  });

  it("formats a date in a different month and weekday correctly", () => {
    expect(formatAlertDate("2026-11-26")).toBe("Thursday, Nov 26, 2026");
  });
});
