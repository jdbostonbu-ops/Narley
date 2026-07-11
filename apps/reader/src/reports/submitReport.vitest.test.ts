import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitReport } from "./submitReport";

const submit = vi.fn();
const deps = { submit };

const completeReport = {
  resourceId: "resource_1",
  address: "111 Plant Street, New London, CT 06320",
  reason: "Wrong hours",
};

beforeEach(() => {
  vi.clearAllMocks();
  submit.mockResolvedValue({ id: "report_1" });
});

describe("submitReport (REPORT-003)", () => {
  it("submits a complete report and returns the confirmation message", async () => {
    const result = await submitReport(completeReport, deps);

    expect(submit).toHaveBeenCalledTimes(1);
    expect(result.ok).toBe(true);
    expect(result.message).toBe("report submitted");
  });

  it("does not submit when the reason is missing, and prompts to complete", async () => {
    const result = await submitReport({ ...completeReport, reason: "" }, deps);

    expect(submit).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.error).toBe("must select a reason to send report");
  });

  it("does not submit when the resourceId is missing", async () => {
    const result = await submitReport({ ...completeReport, resourceId: "" }, deps);

    expect(submit).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("does not submit when the address is missing", async () => {
    const result = await submitReport({ ...completeReport, address: "" }, deps);

    expect(submit).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("does not return a success message when the report is incomplete", async () => {
    const result = await submitReport({ ...completeReport, reason: "" }, deps);
    expect(result.message).not.toBe("report submitted");
  });
})
