import { describe, it, expect, vi } from "vitest";
import { readerSignup } from "./readerSignup";

const validDeps = () => ({
  validatePassword: (_password: string) => ({ valid: true, errors: [] as string[] }),
  findUserByEmail: async (_email: string) => null,
  hashPassword: async (_password: string) => "hashed-password",
  createUser: vi.fn(async (input: { email: string; passwordHash: string }) => ({
    id: "reader_new",
    email: input.email,
    emailVerified: false,
  })),
});

describe("readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy)", () => {
  it("creates an unverified user for a valid new email + policy-compliant password", async () => {
    const deps = validDeps();
    const result = await readerSignup(
      { email: "new@example.com", password: "Valid123!!" },
      deps,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.userId).toBe("reader_new");
    }
    expect(deps.createUser).toHaveBeenCalledOnce();
  });

  it("hashes the password before creating the user (never stores plaintext)", async () => {
    const deps = validDeps();
    await readerSignup({ email: "new@example.com", password: "Valid123!!" }, deps);
    const createArg = deps.createUser.mock.calls[0][0];
    expect(createArg.passwordHash).toBe("hashed-password");
    expect(createArg.passwordHash).not.toBe("Valid123!!");
  });

  it("rejects a password that fails the strength policy, without creating a user (AUTH-R-008)", async () => {
    const deps = {
      ...validDeps(),
      validatePassword: (_password: string) => ({
        valid: false,
        errors: ["Password must contain at least 8 characters."],
      }),
    };
    const result = await readerSignup(
      { email: "new@example.com", password: "weak" },
      deps,
    );
    expect(result.ok).toBe(false);
    expect(deps.createUser).not.toHaveBeenCalled();
  });

  it("rejects signup when the email is already registered, without creating a user", async () => {
    const deps = {
      ...validDeps(),
      findUserByEmail: async (_email: string) => ({
        id: "existing",
        email: "taken@example.com",
        passwordHash: "x",
        emailVerified: true,
      }),
    };
    const result = await readerSignup(
      { email: "taken@example.com", password: "Valid123!!" },
      deps,
    );
    expect(result.ok).toBe(false);
    expect(deps.createUser).not.toHaveBeenCalled();
  });

  it("creates the user as unverified (email verification required next per AUTH-R-003)", async () => {
    const deps = validDeps();
    const result = await readerSignup(
      { email: "new@example.com", password: "Valid123!!" },
      deps,
    );
    expect(result.ok).toBe(true);
    // the created user is unverified; the app routes to the verify screen
    const created = await deps.createUser.mock.results[0].value;
    expect(created.emailVerified).toBe(false);
  });
})
