import { describe, it, expect } from "vitest";

import { closedReportInstructions } from "./closedReportInstructions";

describe("closed report instructions (REPORT-C-000)", () => {
  it("applies the closure rules when a reader reports the resource closed", () => {
    expect(closedReportInstructions("Closed / no longer operating").length).toBeGreaterThan(0);
  });

  it("does not apply the closure rules to a wrong hours report", () => {
    expect(closedReportInstructions("Wrong hours")).toEqual([]);
  });

  it("does not apply the closure rules to a phone report", () => {
    expect(closedReportInstructions("Phone disconnected / no longer working")).toEqual([]);
  });

  it("does not apply the closure rules to an unapproved reason", () => {
    expect(closedReportInstructions("Bad vibes")).toEqual([]);
  });
})
