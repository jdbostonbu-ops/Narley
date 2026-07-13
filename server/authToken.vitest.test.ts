import { describe, it, expect } from "vitest";
import { signAuthToken, verifyAuthToken } from "./authToken";

describe("auth token (AUTH-T-001, AUTH-T-002, AUTH-T-003)", () => {
  it("signs a provider token that verifies back to the same identity", () => {
    const token = signAuthToken({ userId: "user_1", type: "provider" });
    const claims = verifyAuthToken(token);
    expect(claims.userId).toBe("user_1");
    expect(claims.type).toBe("provider");
  });

  it("signs a reader token distinguishable from a provider token", () => {
    const token = signAuthToken({ userId: "reader_1", type: "reader" });
    const claims = verifyAuthToken(token);
    expect(claims.userId).toBe("reader_1");
    expect(claims.type).toBe("reader");
  });

  it("throws on a malformed/garbage token", () => {
    expect(() => verifyAuthToken("not.a.real.token")).toThrow();
  });

  it("throws on a token with a tampered/invalid signature", () => {
    const forged =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ4IiwidHlwZSI6InByb3ZpZGVyIn0.definitely_not_a_valid_signature";
    expect(() => verifyAuthToken(forged)).toThrow();
  });
});
