import { describe, it, expect } from "vitest";

import { addressReportInstructions } from "./addressReportInstructions";

describe("address report instructions (REPORT-A-000)", () => {
  it("applies the address rules when a reader reports a wrong address", () => {
    expect(addressReportInstructions("Wrong address / location").length).toBeGreaterThan(0);
  });

  it("does not apply the address rules to an hours report", () => {
    expect(addressReportInstructions("Wrong hours")).toEqual([]);
  });

  it("does not apply the address rules to a closure report", () => {
    expect(addressReportInstructions("Closed / no longer operating")).toEqual([]);
  });

  it("does not apply the address rules to an unapproved reason", () => {
    expect(addressReportInstructions("Bad vibes")).toEqual([]);
  });
})
