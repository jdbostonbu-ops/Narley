import { describe, it, expect } from "vitest";
import { validatePassword } from "./passwordPolicy";

describe("validatePassword (AUTH-P-008)", () => {
  it("accepts a password meeting all five rules", () => {
    // 8+ chars, 1 upper, 1 lower, 2 digits, 2 specials
    expect(validatePassword("Abcd12!@").valid).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(validatePassword("Ab1!@2").valid).toBe(false);
  });

  it("rejects a password with no uppercase", () => {
    expect(validatePassword("abcd12!@").valid).toBe(false);
  });

  it("rejects a password with no lowercase", () => {
    expect(validatePassword("ABCD12!@").valid).toBe(false);
  });

  it("rejects a password with fewer than 2 digits", () => {
    expect(validatePassword("Abcde1!@").valid).toBe(false);
  });

  it("rejects a password with fewer than 2 special characters", () => {
    expect(validatePassword("Abcd123!").valid).toBe(false);
  });
});
