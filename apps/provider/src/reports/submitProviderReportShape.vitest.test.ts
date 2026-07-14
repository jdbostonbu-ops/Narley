import { describe, it, expect, vi, beforeEach } from "vitest";
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

const words = (n: number) => Array(n).fill("word").join(" ");

beforeEach(() => {
  vi.clearAllMocks();
  sendToNarleyAdmin.mockResolvedValue({ ok: true });
});

describe("submitProviderReport — real resource fields (Flow 2)", () => {
  it("sends a report with resource title, address, phone, website, details, and reporter", async () => {
    const result = await submitProviderReport(validReport, deps);
    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
    expect(sendToNarleyAdmin).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceTitle: "Perception Programs",
        address: "54 North St., Willimantic, CT 06226",
        phone: "(860)450-0151",
        website: "https://perceptionprograms.org",
        details: validReport.details,
        reportedBy: "user_jacq",
      }),
    );
    expect(result.ok).toBe(true);
  });

  it("succeeds when phone and website are absent (they are optional)", async () => {
    const result = await submitProviderReport(
      { resourceTitle: "Some Place", address: "1 Main St", details: "Closed down.", reportedBy: "user_jacq" },
      deps,
    );
    expect(result.ok).toBe(true);
    expect(sendToNarleyAdmin).toHaveBeenCalledTimes(1);
  });

  it("rejects when the resource title is missing", async () => {
    const result = await submitProviderReport({ ...validReport, resourceTitle: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when the address is missing", async () => {
    const result = await submitProviderReport({ ...validReport, address: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects when the details (what is wrong) are missing", async () => {
    const result = await submitProviderReport({ ...validReport, details: "" }, deps);
    expect(result.ok).toBe(false);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });

  it("rejects details over 500 words", async () => {
    const result = await submitProviderReport({ ...validReport, details: words(501) }, deps);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/500 words/i);
    expect(sendToNarleyAdmin).not.toHaveBeenCalled();
  });
});
