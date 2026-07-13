import { describe, it, expect, vi } from "vitest";
import { verifyReaderEmailCode } from "./verifyReaderEmailCode";

const future = new Date(Date.now() + 10 * 60 * 1000);
const past = new Date(Date.now() - 10 * 60 * 1000);

const validDeps = () => ({
  findCode: async (_email: string, _code: string) => ({
    email: "reader@example.com",
    code: "A3F9K2",
    expiresAt: future,
    usedAt: null as Date | null,
  }),
  markEmailVerified: vi.fn(async (_email: string) => undefined),
  consumeCode: vi.fn(async (_email: string, _code: string) => undefined),
});

describe("verifyReaderEmailCode (AUTH-R-003)", () => {
  it("verifies the email for a matching, unexpired, unused code", async () => {
    const deps = validDeps();
    const result = await verifyReaderEmailCode(
      { email: "reader@example.com", code: "A3F9K2" },
      deps,
    );
    expect(result.ok).toBe(true);
    expect(deps.markEmailVerified).toHaveBeenCalledOnce();
    expect(deps.consumeCode).toHaveBeenCalledOnce();
  });

  it("rejects when no matching code is found, without verifying", async () => {
    const deps = { ...validDeps(), findCode: async () => null };
    const result = await verifyReaderEmailCode(
      { email: "reader@example.com", code: "WRONG1" },
      deps,
    );
    expect(result.ok).toBe(false);
    expect(deps.markEmailVerified).not.toHaveBeenCalled();
  });

  it("rejects an expired code, without verifying", async () => {
    const deps = {
      ...validDeps(),
      findCode: async () => ({
        email: "reader@example.com",
        code: "A3F9K2",
        expiresAt: past,
        usedAt: null as Date | null,
      }),
    };
    const result = await verifyReaderEmailCode(
      { email: "reader@example.com", code: "A3F9K2" },
      deps,
    );
    expect(result.ok).toBe(false);
    expect(deps.markEmailVerified).not.toHaveBeenCalled();
  });

  it("rejects an already-used code (single-use), without verifying", async () => {
    const deps = {
      ...validDeps(),
      findCode: async () => ({
        email: "reader@example.com",
        code: "A3F9K2",
        expiresAt: future,
        usedAt: new Date(),
      }),
    };
    const result = await verifyReaderEmailCode(
      { email: "reader@example.com", code: "A3F9K2" },
      deps,
    );
    expect(result.ok).toBe(false);
    expect(deps.markEmailVerified).not.toHaveBeenCalled();
  });
})
