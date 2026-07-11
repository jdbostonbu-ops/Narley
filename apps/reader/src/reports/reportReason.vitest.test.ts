import { describe, it, expect } from "vitest";
import { REPORT_REASONS, isValidReportReason } from "./reportReason";

describe("report reasons (REPORT-001)", () => {
  it("the approved set is exactly the four reader reasons", () => {
    expect([...REPORT_REASONS].sort()).toEqual(
      [
        "Closed / no longer operating",
        "No more resources available",
        "Wrong address / location",
        "Wrong hours",
      ].sort()
    );
  });

  it("accepts 'Closed / no longer operating'", () => {
    expect(isValidReportReason("Closed / no longer operating")).toBe(true);
  });

  it("accepts 'Wrong hours'", () => {
    expect(isValidReportReason("Wrong hours")).toBe(true);
  });

  it("accepts 'Wrong address / location'", () => {
    expect(isValidReportReason("Wrong address / location")).toBe(true);
  });

  it("accepts 'No more resources available'", () => {
    expect(isValidReportReason("No more resources available")).toBe(true);
  });

  it("rejects a reason outside the approved set", () => {
    expect(isValidReportReason("Bad vibes")).toBe(false);
  });

  it("rejects an empty reason", () => {
    expect(isValidReportReason("")).toBe(false);
  });
})
