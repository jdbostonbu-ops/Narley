import { describe, it, expect } from "vitest";
import { validateAiResult } from "./validateAiResult";

const source = (url: string) => ({ url });

const solidResult = {
  findings: "Perception Programs closed in 2024.",
  confidence: "high",
  sources: [source("https://news.example.com/perception-closed"), source("https://gov.example.com/records")],
};

describe("validateAiResult (AI-002/003/004/008)", () => {
  it("accepts a result with findings, confidence, and traceable sources", () => {
    const result = validateAiResult(solidResult);
    expect(result.ok).toBe(true);
    expect(result.uncertain).toBe(false);
  });

  it("labels a low-confidence result as uncertain", () => {
    const result = validateAiResult({ ...solidResult, confidence: "low" });
    expect(result.uncertain).toBe(true);
  });

  it("labels a result with no sources as uncertain", () => {
    const result = validateAiResult({ ...solidResult, sources: [] });
    expect(result.uncertain).toBe(true);
  });

  it("rejects a result with no findings", () => {
    const result = validateAiResult({ ...solidResult, findings: "" });
    expect(result.ok).toBe(false);
  });

  it("rejects a result with no confidence label", () => {
    const result = validateAiResult({ ...solidResult, confidence: "" });
    expect(result.ok).toBe(false);
  });

  it("rejects an unrecognized confidence label", () => {
    const result = validateAiResult({ ...solidResult, confidence: "very sure" });
    expect(result.ok).toBe(false);
  });

  it("strips fabricated evidence with no traceable source", () => {
    const result = validateAiResult({
      ...solidResult,
      sources: [source("https://news.example.com/real"), { url: "" }, {}],
    });
    expect(result.sources.every((s) => s.url && s.url.length > 0)).toBe(true);
  });

  it("caps evidence at 3 primary sources", () => {
    const result = validateAiResult({
      ...solidResult,
      sources: [
        source("https://a.example.com"),
        source("https://b.example.com"),
        source("https://c.example.com"),
        source("https://d.example.com"),
        source("https://e.example.com"),
      ],
    });
    expect(result.sources.length).toBeLessThanOrEqual(3);
  });
})
