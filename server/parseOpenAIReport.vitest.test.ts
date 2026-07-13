import { describe, expect, it } from "vitest";

import { parseOpenAIReport } from "./parseOpenAIReport";

const invalidResult = {
  findings: "",
  confidence: "",
  sources: [],
};

describe("parseOpenAIReport", () => {
  it("accepts the strict verified-report response shape", () => {
    expect(parseOpenAIReport(JSON.stringify({
      findings: "The closure is corroborated by the organization's notice.",
      confidence: "high",
      sources: [{ url: "https://example.org/closure" }],
    }))).toEqual({
      findings: "The closure is corroborated by the organization's notice.",
      confidence: "high",
      sources: [{ url: "https://example.org/closure" }],
    });
  });

  it.each([
    "not json",
    JSON.stringify({ findings: "Credible", confidence: "HIGH", sources: [] }),
    JSON.stringify({ findings: "", confidence: "low", sources: [] }),
    JSON.stringify({ findings: "Credible", confidence: "medium", sources: ["https://example.org"] }),
    JSON.stringify({ findings: "Credible", confidence: "medium", sources: [], extra: true }),
  ])("returns a validation-safe failure for malformed output", (output) => {
    expect(parseOpenAIReport(output)).toEqual(invalidResult);
  });
});
