import { describe, it, expect } from "vitest";
import { signAuthToken } from "./authToken";
import { authenticateRequest } from "./authenticateRequest";

describe("authenticateRequest (AUTH-T-002, AUTH-T-003)", () => {
  it("returns the verified identity for a valid Bearer token", () => {
    const token = signAuthToken({ userId: "user_1", type: "provider" });
    const identity = authenticateRequest(`Bearer ${token}`);
    expect(identity.userId).toBe("user_1");
    expect(identity.type).toBe("provider");
  });

  it("throws when the Authorization header is missing", () => {
    expect(() => authenticateRequest(undefined)).toThrow();
  });

  it("throws when the header is not a Bearer token", () => {
    expect(() => authenticateRequest("Basic abc123")).toThrow();
  });

  it("throws when the token is invalid/forged", () => {
    expect(() => authenticateRequest("Bearer not.a.real.token")).toThrow();
  });

  it("throws when a required type does not match the token type", () => {
    const readerToken = signAuthToken({ userId: "reader_1", type: "reader" });
    expect(() => authenticateRequest(`Bearer ${readerToken}`, "provider")).toThrow();
  });

  it("accepts a token whose type matches the required type", () => {
    const providerToken = signAuthToken({ userId: "user_9", type: "provider" });
    const identity = authenticateRequest(`Bearer ${providerToken}`, "provider");
    expect(identity.userId).toBe("user_9");
  });
});
