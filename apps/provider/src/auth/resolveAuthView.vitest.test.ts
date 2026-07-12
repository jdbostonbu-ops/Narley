import { describe, it, expect } from "vitest";
import { resolveAuthView } from "./resolveAuthView";

const activeMembership = { status: "ACTIVE" };
const inactiveMembership = { status: "REMOVED" };
const user = { id: "user_1" };

describe("resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003)", () => {
  it("returns 'loading' while auth state is still loading (AUTH-P-001)", () => {
    expect(resolveAuthView({ loading: true, user: null, membership: null })).toBe("loading");
    // loading takes precedence even if other fields are present
    expect(resolveAuthView({ loading: true, user, membership: activeMembership })).toBe("loading");
  });

  it("returns 'login' when there is no user (AUTH-P-002 — logged-out sees login)", () => {
    expect(resolveAuthView({ loading: false, user: null, membership: null })).toBe("login");
  });

  it("returns 'tabs' when a user has an ACTIVE membership (AUTH-P-003 — logged-in sees tabs)", () => {
    expect(resolveAuthView({ loading: false, user, membership: activeMembership })).toBe("tabs");
  });

  it("does NOT return 'tabs' for a logged-in user without an ACTIVE membership (AUTH-P-003 gate)", () => {
    const view = resolveAuthView({ loading: false, user, membership: inactiveMembership });
    expect(view).not.toBe("tabs");
  });

  it("does NOT return 'tabs' for a logged-in user with no membership at all", () => {
    const view = resolveAuthView({ loading: false, user, membership: null });
    expect(view).not.toBe("tabs");
  });

  it("never shows tabs to a logged-out user (AUTH-P-002 — tabs hidden when user === null)", () => {
    expect(resolveAuthView({ loading: false, user: null, membership: null })).not.toBe("tabs");
    expect(resolveAuthView({ loading: false, user: null, membership: activeMembership })).not.toBe("tabs");
  });
})
