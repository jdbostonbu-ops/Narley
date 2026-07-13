import { describe, it, expect } from "vitest";
import { generateVerificationCode } from "./generateVerificationCode";

describe("generateVerificationCode (AUTH-R-003 email verification code)", () => {
  it("returns a 6-character code", () => {
    expect(generateVerificationCode()).toHaveLength(6);
  });

  it("returns only allowed alphanumeric characters (A-Z, 0-9)", () => {
    for (let i = 0; i < 50; i += 1) {
      expect(generateVerificationCode()).toMatch(/^[A-Z0-9]{6}$/);
    }
  });

  it("produces varying codes (not a constant value)", () => {
    const codes = new Set<string>();
    for (let i = 0; i < 50; i += 1) {
      codes.add(generateVerificationCode());
    }
    // extremely unlikely to collide into 1 value across 50 draws
    expect(codes.size).toBeGreaterThan(1);
  });
})
