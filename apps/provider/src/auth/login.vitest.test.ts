import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("bcrypt", () => ({
  default: { compare: vi.fn() },
  compare: vi.fn(),
}));

import bcrypt from "bcrypt";
import { login } from "./login";

const existingUser = {
  id: "user_1",
  email: "maria@org.org",
  passwordHash: "HASHED",
};

const findUserByEmail = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe("login (AUTH-P-006)", () => {
  it("returns a session for correct email + password", async () => {
    findUserByEmail.mockResolvedValue(existingUser);
    (bcrypt.compare as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(true);

    const result = await login(
      { email: "maria@org.org", password: "correct" },
      { findUserByEmail }
    );

    expect(result.session).toBeDefined();
  });

  it("denies wrong password with a generic error and no session", async () => {
    findUserByEmail.mockResolvedValue(existingUser);
    (bcrypt.compare as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(false);

    const result = await login(
      { email: "maria@org.org", password: "wrong" },
      { findUserByEmail }
    );

    expect(result.session).toBeUndefined();
    expect(result.error).toBe("Invalid email or password");
  });

  it("denies a removed/absent user with the SAME generic error", async () => {
    findUserByEmail.mockResolvedValue(null);

    const result = await login(
      { email: "gone@org.org", password: "whatever" },
      { findUserByEmail }
    );

    expect(result.session).toBeUndefined();
    expect(result.error).toBe("Invalid email or password");
  });

  it("does not reveal which factor failed (wrong password vs no user match)", async () => {
    findUserByEmail.mockResolvedValueOnce(existingUser);
    (bcrypt.compare as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(false);
    const wrongPw = await login(
      { email: "maria@org.org", password: "wrong" },
      { findUserByEmail }
    );

    findUserByEmail.mockResolvedValueOnce(null);
    const noUser = await login(
      { email: "gone@org.org", password: "whatever" },
      { findUserByEmail }
    );

    expect(wrongPw.error).toBe(noUser.error);
  });
});
