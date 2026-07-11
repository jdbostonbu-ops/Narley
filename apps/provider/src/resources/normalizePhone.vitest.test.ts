import { describe, it, expect } from "vitest";
import { normalizePhone } from "./normalizePhone";

describe("normalizePhone (POST-012)", () => {
  it("formats 10 raw digits as (XXX)XXX-XXXX", () => {
    const result = normalizePhone("8602223345");
    expect(result.ok).toBe(true);
    expect(result.value).toBe("(860)222-3345");
  });

  it("accepts input that already contains formatting and normalizes it", () => {
    const result = normalizePhone("(860) 222-3345");
    expect(result.ok).toBe(true);
    expect(result.value).toBe("(860)222-3345");
  });

  it("rejects fewer than 10 digits", () => {
    const result = normalizePhone("86022233");
    expect(result.ok).toBe(false);
    expect(result.value).toBeUndefined();
  });

  it("rejects more than 10 digits", () => {
    const result = normalizePhone("860222334567");
    expect(result.ok).toBe(false);
    expect(result.value).toBeUndefined();
  });

  it("rejects input containing letters", () => {
    const result = normalizePhone("860ABC3345");
    expect(result.ok).toBe(false);
    expect(result.value).toBeUndefined();
  });

  it("rejects an empty string", () => {
    const result = normalizePhone("");
    expect(result.ok).toBe(false);
    expect(result.value).toBeUndefined();
  });
});
