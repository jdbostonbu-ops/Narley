import { describe, it, expect } from "vitest";

import { hoursReportInstructions } from "./hoursReportInstructions";

describe("hours report instructions (REPORT-H-000)", () => {
  it("applies the hours rules when a reader reports wrong hours", () => {
    expect(hoursReportInstructions("Wrong hours").length).toBeGreaterThan(0);
  });

  it("does not apply the hours rules to an address report", () => {
    expect(hoursReportInstructions("Wrong address / location")).toEqual([]);
  });

  it("does not apply the hours rules to a closure report", () => {
    expect(hoursReportInstructions("Closed / no longer operating")).toEqual([]);
  });

  it("does not apply the hours rules to an unapproved reason", () => {
    expect(hoursReportInstructions("Bad vibes")).toEqual([]);
  });
})
