import { describe, it, expect } from "vitest";
import { resolveReaderAuthView } from "./resolveReaderAuthView";

const verifiedUser = { id: "reader_1", emailVerified: true };
const unverifiedUser = { id: "reader_1", emailVerified: false };

describe("resolveReaderAuthView (AUTH-R-001/002/003/004)", () => {
  it("returns 'loading' while auth state is resolving (AUTH-R-001)", () => {
    expect(resolveReaderAuthView({ loading: true, user: null })).toBe("loading");
    // loading takes precedence even when a user is present
    expect(resolveReaderAuthView({ loading: true, user: verifiedUser })).toBe("loading");
  });

  it("returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup)", () => {
    expect(resolveReaderAuthView({ loading: false, user: null })).toBe("auth");
  });

  it("returns 'verify' when the user is logged in but email is unverified (AUTH-R-003)", () => {
    expect(resolveReaderAuthView({ loading: false, user: unverifiedUser })).toBe("verify");
  });

  it("returns 'tabs' when the user is logged in and email is verified (AUTH-R-004)", () => {
    expect(resolveReaderAuthView({ loading: false, user: verifiedUser })).toBe("tabs");
  });

  it("never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden)", () => {
    expect(resolveReaderAuthView({ loading: false, user: null })).not.toBe("tabs");
  });

  it("never returns 'tabs' for an unverified user (AUTH-R-004 requires verification)", () => {
    expect(resolveReaderAuthView({ loading: false, user: unverifiedUser })).not.toBe("tabs");
  });
})
