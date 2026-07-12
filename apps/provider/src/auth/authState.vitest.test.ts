import { describe, it, expect } from "vitest";
import { authReducer, initialAuthState } from "./authState";

describe("authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions)", () => {
  it("starts logged out with no user and not loading", () => {
    expect(initialAuthState.user).toBe(null);
    expect(initialAuthState.loading).toBe(false);
  });

  it("marks loading true while a login is in progress", () => {
    const next = authReducer(initialAuthState, { type: "LOGIN_START" });
    expect(next.loading).toBe(true);
    expect(next.user).toBe(null);
  });

  it("sets the user and clears loading on a successful login (AUTH-P-003)", () => {
    const loading = authReducer(initialAuthState, { type: "LOGIN_START" });
    const next = authReducer(loading, {
      type: "LOGIN_SUCCESS",
      user: { id: "user_jacq" },
    });
    expect(next.user).toEqual({ id: "user_jacq" });
    expect(next.loading).toBe(false);
  });

  it("clears loading and keeps no user on a failed login (AUTH-P-002)", () => {
    const loading = authReducer(initialAuthState, { type: "LOGIN_START" });
    const next = authReducer(loading, { type: "LOGIN_FAILURE" });
    expect(next.user).toBe(null);
    expect(next.loading).toBe(false);
  });

  it("clears the user on logout (AUTH-P-002 — logged-out returns to no user)", () => {
    const loggedIn = authReducer(initialAuthState, {
      type: "LOGIN_SUCCESS",
      user: { id: "user_jacq" },
    });
    const next = authReducer(loggedIn, { type: "LOGOUT" });
    expect(next.user).toBe(null);
    expect(next.loading).toBe(false);
  });
})
