import { describe, it, expect, vi, beforeEach } from "vitest";

import { requestPasswordReset } from "./passwordReset";

const findUserByEmail = vi.fn();
const saveResetToken = vi.fn();
const sendResetEmail = vi.fn();
const generateCode = vi.fn();

const deps = {
  findUserByEmail,
  saveResetToken,
  sendResetEmail,
  generateCode,
  // unused by requestPasswordReset but part of the deps type:
  findResetToken: vi.fn(),
  updatePassword: vi.fn(),
  consumeResetToken: vi.fn(),
  invalidateSessions: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("requestPasswordReset — short 6-character code (AUTH-P-007)", () => {
  it("uses the injected generateCode value as the reset code (not a userId-timestamp token)", async () => {
    findUserByEmail.mockResolvedValueOnce({ id: "u1", email: "real@org.org" });
    generateCode.mockReturnValueOnce("A3F9K2");

    await requestPasswordReset("real@org.org", deps);

    // the short code is saved and emailed, not `${userId}-${Date.now()}`
    expect(saveResetToken).toHaveBeenCalledWith("u1", "A3F9K2", expect.any(Date));
    expect(sendResetEmail).toHaveBeenCalledWith("real@org.org", "A3F9K2");
  });

  it("does not produce a long userId-timestamp token", async () => {
    findUserByEmail.mockResolvedValueOnce({ id: "u1", email: "real@org.org" });
    generateCode.mockReturnValueOnce("XY7Q2B");

    await requestPasswordReset("real@org.org", deps);

    const savedToken = saveResetToken.mock.calls[0]?.[1];
    expect(savedToken).toBe("XY7Q2B");
    expect(savedToken).not.toContain("-");
    expect(savedToken).toMatch(/^[A-Z0-9]{6}$/);
  });

  it("calls generateCode to create the code", async () => {
    findUserByEmail.mockResolvedValueOnce({ id: "u1", email: "real@org.org" });
    generateCode.mockReturnValueOnce("MMMM11");

    await requestPasswordReset("real@org.org", deps);

    expect(generateCode).toHaveBeenCalled();
  });
});
