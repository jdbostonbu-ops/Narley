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

describe("validatePassword error messages (AUTH-P-008)", () => {
  it("a valid password returns no errors", () => {
    expect(validatePassword("Abcd12!@").errors).toEqual([]);
  });

  it("identifies a too-short password", () => {
    const { errors } = validatePassword("Ab1!@2");
    expect(errors.some((e) => /8|length|characters/i.test(e))).toBe(true);
  });

  it("identifies a missing uppercase", () => {
    const { errors } = validatePassword("abcd12!@");
    expect(errors.some((e) => /uppercase/i.test(e))).toBe(true);
  });

  it("identifies a missing lowercase", () => {
    const { errors } = validatePassword("ABCD12!@");
    expect(errors.some((e) => /lowercase/i.test(e))).toBe(true);
  });

  it("identifies too few digits", () => {
    const { errors } = validatePassword("Abcde1!@");
    expect(errors.some((e) => /digit|number/i.test(e))).toBe(true);
  });

  it("identifies too few special characters", () => {
    const { errors } = validatePassword("Abcd123!");
    expect(errors.some((e) => /special/i.test(e))).toBe(true);
  });
});
