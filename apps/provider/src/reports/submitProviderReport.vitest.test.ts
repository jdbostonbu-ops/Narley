import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitProviderReport } from "./submitProviderReport";

const sendToNarleyAdmin = vi.fn();
const deps = { sendToNarleyAdmin };

const validReport = {
  address: "111 Plant Street, New London, CT 06320",
  providerName: "Jane Doe",
  providerEmail: "jane@orgb.org",
  providerPhone: "(860)555-1212",
  details: "I called and visited; this location closed last month and the space is now vacant.",
};

beforeEach(() => {
  vi.clearAllMocks();
  sendToNarleyAdmin.mockResolvedValue({ ok: true });
});

const words = (n: number) => Array(n).fill("word").join(" ");

describe("submitProviderReport (Flow 2 — provider reports to Narley admin)", () => {
  it("sends a complete report to Narley admin", async () => {
    const result = await submitProviderReport(validReport, deps);

    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
    expect(sendToNarleyAdmin).toHaveBeenCalledWith(
      expect.objectContaining({
        address: "111 Plant Street, New London, CT 06320",
        providerName: "Jane Doe",
        providerEmail: "jane@orgb.org",
        providerPhone: "(860)555-1212",
        details: validReport.details,
      })
    );
    expect(result.ok).toBe(true);
  });

  it("rejects when the address is missing", async () => {
    const result = await submitProviderReport({ ...validReport, address: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when the provider name is missing", async () => {
    const result = await submitProviderReport({ ...validReport, providerName: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when the provider email is missing", async () => {
    const result = await submitProviderReport({ ...validReport, providerEmail: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when the provider phone is missing", async () => {
    const result = await submitProviderReport({ ...validReport, providerPhone: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when supporting details are missing", async () => {
    const result = await submitProviderReport({ ...validReport, details: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("accepts details up to 500 words", async () => {
    const result = await submitProviderReport({ ...validReport, details: words(500) }, deps);
    expect(result.ok).toBe(true);
    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
  });

  it("rejects details over 500 words", async () => {
    const result = await submitProviderReport({ ...validReport, details: words(501) }, deps);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/500 words/i);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });
})
