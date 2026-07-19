import { describe, it, expect } from "vitest";
import { createReport } from "./createReport";

describe("createReport (REPORT-002)", () => {
  it("creates a report from resourceId, address, and selected reason", () => {
    const result = createReport({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
      reason: "Wrong hours",
    });

    expect(result.ok).toBe(true);
    expect(result.report).toMatchObject({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
      reason: "Wrong hours",
    });
  });

  it("rejects a missing reason with a clear message", () => {
    const result = createReport({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
      reason: "",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBe("must select a reason to send report");
    expect(result.report).toBeUndefined();
  });

  it("rejects when no reason is provided at all", () => {
    const result = createReport({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBe("must select a reason to send report");
  });

  it("does not include or touch the resource itself, only report data", () => {
    const result = createReport({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
      reason: "Closed / no longer operating",
    });

    // the report carries only report fields, never the live resource object
    // the report carries only report fields, never the live resource object
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.report).not.toHaveProperty("resource");
      expect(Object.keys(result.report)).toEqual(
        expect.arrayContaining(["resourceId", "address", "reason"])
      );
    }
  });
})
