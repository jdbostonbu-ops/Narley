import { describe, it, expect } from "vitest";
import { canEditResource } from "./canEditResource";

const user = { id: "user_1" };

const resourceOwnedByOrgB = { id: "resource_1", organizationId: "org_B" };

const activeMembershipOrgB = {
  organizationId: "org_B",
  status: "ACTIVE",
};

describe("canEditResource (EDIT-008)", () => {
  it("allows an active member of the resource's organization", () => {
    expect(canEditResource(user, activeMembershipOrgB, resourceOwnedByOrgB)).toBe(true);
  });

  it("allows a different member of the same organization (coworker edits A's pin)", () => {
    const coworker = { id: "user_2" };
    expect(canEditResource(coworker, activeMembershipOrgB, resourceOwnedByOrgB)).toBe(true);
  });

  it("denies a member of a different organization", () => {
    const membershipOrgA = { organizationId: "org_A", status: "ACTIVE" };
    expect(canEditResource(user, membershipOrgA, resourceOwnedByOrgB)).toBe(false);
  });

  it("denies when the membership is not ACTIVE", () => {
    const removed = { organizationId: "org_B", status: "REMOVED" };
    expect(canEditResource(user, removed, resourceOwnedByOrgB)).toBe(false);
  });

  it("denies when there is no membership", () => {
    expect(canEditResource(user, null, resourceOwnedByOrgB)).toBe(false);
  });

  it("denies when there is no user", () => {
    expect(canEditResource(null, activeMembershipOrgB, resourceOwnedByOrgB)).toBe(false);
  });
});
