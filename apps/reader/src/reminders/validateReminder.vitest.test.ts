import { describe, it, expect } from "vitest";
import { validateReminder } from "./validateReminder";

const now = new Date("2026-07-11T12:00:00");

describe("validateReminder (REM-002)", () => {
  it("accepts a valid future date and time", () => {
    const result = validateReminder("2026-08-01", "15:30", now);
    expect(result.ok).toBe(true);
  });

  it("rejects a missing date", () => {
    const result = validateReminder("", "15:30", now);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/date/i);
  });

  it("rejects a missing time", () => {
    const result = validateReminder("2026-08-01", "", now);
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/time/i);
  });

  it("rejects an invalid date that is not a real day", () => {
    const result = validateReminder("2026-02-30", "15:30", now);
    expect(result.ok).toBe(false);
  });

  it("rejects a non-date value", () => {
    const result = validateReminder("not-a-date", "15:30", now);
    expect(result.ok).toBe(false);
  });

  it("rejects a date and time in the past", () => {
    const result = validateReminder("2020-01-01", "09:00", now);
    expect(result.ok).toBe(false);
  });

  it("rejects the exact current moment (must be in the future)", () => {
    const result = validateReminder("2026-07-11", "12:00", now);
    expect(result.ok).toBe(false);
  });
})
