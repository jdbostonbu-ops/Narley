import { describe, it, expect, vi } from "vitest";
import { readerLogin } from "./readerLogin";

const makeUser = (overrides = {}) => ({
  id: "reader_1",
  email: "reader@example.com",
  passwordHash: "$2b$12$hash",
  emailVerified: true,
  ...overrides,
});

describe("readerLogin (AUTH-R-002)", () => {
  it("returns a session for a correct email + password", async () => {
    const user = makeUser();
    const result = await readerLogin(
      { email: "reader@example.com", password: "Correct123!!" },
      {
        findUserByEmail: async () => user,
        verifyPassword: async () => true,
      },
    );
    expect(result.session?.userId).toBe("reader_1");
    expect(result.error).toBeUndefined();
  });

  it("includes the user's emailVerified status in the session result", async () => {
    const user = makeUser({ emailVerified: false });
    const result = await readerLogin(
      { email: "reader@example.com", password: "Correct123!!" },
      {
        findUserByEmail: async () => user,
        verifyPassword: async () => true,
      },
    );
    expect(result.session?.emailVerified).toBe(false);
  });

  it("denies a wrong password with a generic error and no session", async () => {
    const result = await readerLogin(
      { email: "reader@example.com", password: "WrongPass1!" },
      {
        findUserByEmail: async () => makeUser(),
        verifyPassword: async () => false,
      },
    );
    expect(result.session).toBeUndefined();
    expect(result.error).toBe("Invalid email or password");
  });

  it("denies an unknown email with the SAME generic error (no enumeration)", async () => {
    const result = await readerLogin(
      { email: "nobody@example.com", password: "Correct123!!" },
      {
        findUserByEmail: async () => null,
        verifyPassword: async () => false,
      },
    );
    expect(result.session).toBeUndefined();
    expect(result.error).toBe("Invalid email or password");
  });

  it("does not reveal which factor failed (wrong password vs no user)", async () => {
    const wrongPassword = await readerLogin(
      { email: "reader@example.com", password: "WrongPass1!" },
      { findUserByEmail: async () => makeUser(), verifyPassword: async () => false },
    );
    const noUser = await readerLogin(
      { email: "nobody@example.com", password: "Correct123!!" },
      { findUserByEmail: async () => null, verifyPassword: async () => false },
    );
    expect(wrongPassword.error).toBe(noUser.error);
  });
})
