import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyReaderReport } from "./verifyReaderReport";

const callOpenAI = vi.fn();
const createProviderAlert = vi.fn();

// resource-mutation tripwires — must NEVER be called by the AI flow
const updateResource = vi.fn();
const deleteResource = vi.fn();
const closeResource = vi.fn();
const archiveResource = vi.fn();
const publishResource = vi.fn();

const deps = {
  callOpenAI,
  createProviderAlert,
  updateResource,
  deleteResource,
  closeResource,
  archiveResource,
  publishResource,
};

const readerReport = {
  resourceId: "resource_1",
  address: "111 Plant Street, New London, CT 06320",
  reason: "Closed / no longer operating",
};

beforeEach(() => {
  vi.clearAllMocks();
  createProviderAlert.mockImplementation((alert) => ({ id: "alert_1", ...alert }));
});

describe("verifyReaderReport — AI cannot modify a resource (AI-005)", () => {
  it("never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed'", async () => {
    callOpenAI.mockResolvedValue({
      findings: "Perception Programs closed in 2024.",
      confidence: "high",
      sources: [{ url: "https://news.example.com/closed" }],
    });

    await verifyReaderReport(readerReport, deps);

    expect(updateResource).not.toHaveBeenCalled();
    expect(deleteResource).not.toHaveBeenCalled();
    expect(closeResource).not.toHaveBeenCalled();
    expect(archiveResource).not.toHaveBeenCalled();
    expect(publishResource).not.toHaveBeenCalled();
  });

  it("does not mutate a resource even when the AI result is uncertain", async () => {
    callOpenAI.mockResolvedValue({
      findings: "Possibly closed, unconfirmed.",
      confidence: "low",
      sources: [],
    });

    await verifyReaderReport(readerReport, deps);

    expect(updateResource).not.toHaveBeenCalled();
    expect(deleteResource).not.toHaveBeenCalled();
    expect(closeResource).not.toHaveBeenCalled();
    expect(archiveResource).not.toHaveBeenCalled();
    expect(publishResource).not.toHaveBeenCalled();
  });

  it("its only resource-facing side effect is creating an alert", async () => {
    callOpenAI.mockResolvedValue({
      findings: "Closed.",
      confidence: "high",
      sources: [{ url: "https://gov.example.com/record" }],
    });

    await verifyReaderReport(readerReport, deps);

    expect(createProviderAlert).toHaveBeenCalledTimes(1);
  });
})
