import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyReaderReport } from "./verifyReaderReport";

const callOpenAI = vi.fn();
const createProviderAlert = vi.fn();
const deps = { callOpenAI, createProviderAlert };

const readerReport = {
  resourceId: "resource_1",
  address: "111 Plant Street, New London, CT 06320",
  reason: "Phone disconnected / no longer working",
};

const solidAiResult = {
  findings: "Perception Programs closed in 2024.",
  confidence: "high",
  sources: [{ url: "https://news.example.com/closed" }],
};

beforeEach(() => {
  vi.clearAllMocks();
  createProviderAlert.mockImplementation((alert) => ({ id: "alert_1", ...alert }));
});

describe("verifyReaderReport (REPORT-006 flow)", () => {
  it("sends the reader report to OpenAI for verification", async () => {
    callOpenAI.mockResolvedValue(solidAiResult);
    await verifyReaderReport(readerReport, deps);
    expect(callOpenAI).toHaveBeenCalledWith(readerReport);
  });

  it("creates a provider alert carrying the reader report fields and AI findings", async () => {
    callOpenAI.mockResolvedValue(solidAiResult);

    await verifyReaderReport(readerReport, deps);

    expect(createProviderAlert).toHaveBeenCalledTimes(1);
    const alert = createProviderAlert.mock.calls[0][0];
    expect(alert.report).toMatchObject({
      resourceId: "resource_1",
      address: "111 Plant Street, New London, CT 06320",
      reason: "Phone disconnected / no longer working",
    });
    expect(alert.resourceId).toBe("resource_1");
    expect(alert.address).toBe("111 Plant Street, New London, CT 06320");
    expect(alert.findings).toBe("Perception Programs closed in 2024.");
    expect(alert.confidence).toBe("high");
    expect(alert.sources).toEqual([{ url: "https://news.example.com/closed" }]);
    expect(alert.uncertain).toBe(false);
  });

  it("creates the alert labeled uncertain when the AI result is uncertain", async () => {
    callOpenAI.mockResolvedValue({ ...solidAiResult, confidence: "low" });

    await verifyReaderReport(readerReport, deps);

    const alert = createProviderAlert.mock.calls[0][0];
    expect(alert.uncertain).toBe(true);
  });

  it("still surfaces an uncertain result (does not suppress the alert)", async () => {
    callOpenAI.mockResolvedValue({ ...solidAiResult, sources: [] });

    await verifyReaderReport(readerReport, deps);

    expect(createProviderAlert).toHaveBeenCalledTimes(1);
    expect(createProviderAlert.mock.calls[0][0].uncertain).toBe(true);
  });

  it("does not create an alert when the AI result is invalid (no findings)", async () => {
    callOpenAI.mockResolvedValue({ ...solidAiResult, findings: "" });

    await verifyReaderReport(readerReport, deps);

    expect(createProviderAlert).not.toHaveBeenCalled();
  });
})
