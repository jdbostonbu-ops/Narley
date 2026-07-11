import { describe, it, expect, vi, beforeEach } from "vitest";
import { requestPasswordReset, confirmPasswordReset } from "./passwordReset";

const findUserByEmail = vi.fn();
const saveResetToken = vi.fn();
const sendResetEmail = vi.fn();
const findResetToken = vi.fn();
const updatePassword = vi.fn();
const consumeResetToken = vi.fn();
const invalidateSessions = vi.fn();

const deps = {
  findUserByEmail,
  saveResetToken,
  sendResetEmail,
  findResetToken,
  updatePassword,
  consumeResetToken,
  invalidateSessions,
};

const future = new Date(Date.now() + 1000 * 60 * 30);
const past = new Date(Date.now() - 1000);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("requestPasswordReset (AUTH-P-007) — no enumeration", () => {
  it("returns the SAME response for an existing and a non-existing email", async () => {
    findUserByEmail.mockResolvedValueOnce({ id: "u1", email: "real@org.org" });
    const known = await requestPasswordReset("real@org.org", deps);

    findUserByEmail.mockResolvedValueOnce(null);
    const unknown = await requestPasswordReset("nobody@org.org", deps);

    expect(known).toEqual(unknown);
  });
});

describe("confirmPasswordReset (AUTH-P-007)", () => {
  it("sets a new password with a valid, unexpired, unused token", async () => {
    findResetToken.mockResolvedValue({
      userId: "u1",
      expiresAt: future,
      usedAt: null,
    });

    const result = await confirmPasswordReset(
      { token: "RAW", newPassword: "Abcd12!@" },
      deps
    );

    expect(result.success).toBe(true);
    expect(updatePassword).toHaveBeenCalledWith("u1", expect.any(String));
    expect(consumeResetToken).toHaveBeenCalled();
    expect(invalidateSessions).toHaveBeenCalledWith("u1");
  });

  it("rejects an already-used token (single-use)", async () => {
    findResetToken.mockResolvedValue({
      userId: "u1",
      expiresAt: future,
      usedAt: new Date(),
    });

    const result = await confirmPasswordReset(
      { token: "RAW", newPassword: "Abcd12!@" },
      deps
    );

    expect(result.success).toBe(false);
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it("rejects an expired token", async () => {
    findResetToken.mockResolvedValue({
      userId: "u1",
      expiresAt: past,
      usedAt: null,
    });

    const result = await confirmPasswordReset(
      { token: "RAW", newPassword: "Abcd12!@" },
      deps
    );

    expect(result.success).toBe(false);
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it("rejects an unknown/tampered token", async () => {
    findResetToken.mockResolvedValue(null);

    const result = await confirmPasswordReset(
      { token: "BAD", newPassword: "Abcd12!@" },
      deps
    );

    expect(result.success).toBe(false);
    expect(updatePassword).not.toHaveBeenCalled();
  });

  it("invalidates old sessions on a successful reset", async () => {
    findResetToken.mockResolvedValue({
      userId: "u1",
      expiresAt: future,
      usedAt: null,
    });

    await confirmPasswordReset(
      { token: "RAW", newPassword: "Abcd12!@" },
      deps
    );

    expect(invalidateSessions).toHaveBeenCalledWith("u1");
  });
});
