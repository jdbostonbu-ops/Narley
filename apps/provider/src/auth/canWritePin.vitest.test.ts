import { describe, it, expect } from "vitest";
import { canWritePin } from "./canWritePin";

const activeUser = { id: "user_1" };

const activeMembershipVerifiedOrg = {
  status: "ACTIVE",
  org: { status: "VERIFIED", active: true },
};

describe("canWritePin (AUTH-P-005)", () => {
  it("permits an ACTIVE membership in a verified, active org", () => {
    expect(canWritePin(activeUser, activeMembershipVerifiedOrg)).toBe(true);
  });

  it("denies when membership is not ACTIVE", () => {
    const m = { ...activeMembershipVerifiedOrg, status: "REMOVED" };
    expect(canWritePin(activeUser, m)).toBe(false);
  });

  it("denies when there is no membership", () => {
    expect(canWritePin(activeUser, null)).toBe(false);
  });

  it("denies when the org is not verified", () => {
    const m = { status: "ACTIVE", org: { status: "UNVERIFIED", active: true } };
    expect(canWritePin(activeUser, m)).toBe(false);
  });

  it("denies when the org is not active", () => {
    const m = { status: "ACTIVE", org: { status: "VERIFIED", active: false } };
    expect(canWritePin(activeUser, m)).toBe(false);
  });

  it("denies when there is no user", () => {
    expect(canWritePin(null, activeMembershipVerifiedOrg)).toBe(false);
  });
});
