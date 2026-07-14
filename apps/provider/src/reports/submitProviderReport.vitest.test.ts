import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitProviderReport } from "./submitProviderReport";

const sendToNarleyAdmin = vi.fn();
const deps = { sendToNarleyAdmin };

const validReport = {
  resourceTitle: "Perception Programs",
  address: "54 North St., Willimantic, CT 06226",
  phone: "(860)450-0151",
  website: "https://perceptionprograms.org",
  details: "This organization dissolved in 2025; the location is closed.",
  reportedBy: "user_jacq",
};

const words = (count: number): string => Array(count).fill("word").join(" ");

beforeEach(() => {
  vi.clearAllMocks();
  sendToNarleyAdmin.mockResolvedValue({ ok: true });
});

describe("submitProviderReport (Flow 2 — provider reports a resource)", () => {
  it("sends the full resource report to Narley admin", async () => {
    const result = await submitProviderReport(validReport, deps);

    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
    expect(sendToNarleyAdmin).toHaveBeenCalledWith(validReport);
    expect(result).toEqual({ ok: true });
  });

  it("accepts a report without optional phone and website fields", async () => {
    const report = {
      resourceTitle: validReport.resourceTitle,
      address: validReport.address,
      details: validReport.details,
      reportedBy: validReport.reportedBy,
    };
    const result = await submitProviderReport(report, deps);

    expect(result).toEqual({ ok: true });
    expect(sendToNarleyAdmin).toHaveBeenCalledWith(report);
  });

  it.each([
    ["resourceTitle", { ...validReport, resourceTitle: "   " }],
    ["address", { ...validReport, address: "" }],
    ["details", { ...validReport, details: "   " }],
    ["reportedBy", { ...validReport, reportedBy: "" }],
  ])("rejects a report with an empty required %s", async (_field, report) => {
    const result = await submitProviderReport(report, deps);

    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("accepts details containing exactly 500 words", async () => {
    const result = await submitProviderReport(
      { ...validReport, details: words(500) },
      deps,
    );

    expect(result).toEqual({ ok: true });
    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
  });

  it("rejects details containing more than 500 words", async () => {
    const result = await submitProviderReport(
      { ...validReport, details: words(501) },
      deps,
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/500 words/i);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });
});
