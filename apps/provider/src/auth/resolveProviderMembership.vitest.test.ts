import { describe, it, expect } from "vitest";
import { canWritePin } from "./canWritePin";
import { resolveProviderMembership } from "./resolveProviderMembership";

// A DB membership row joined with its organization, as Prisma would return it.
const dbMembership = (over: {
  status?: string;
  orgStatus?: string;
  orgActive?: boolean;
  organizationId?: string;
}) => ({
  status: over.status ?? "ACTIVE",
  organizationId: over.organizationId ?? "org_A",
  organization: {
    status: over.orgStatus ?? "VERIFIED",
    active: over.orgActive ?? true,
  },
});

describe("resolveProviderMembership (AUTH-T-004)", () => {
  it("returns null when the user has no membership", () => {
    expect(resolveProviderMembership(null)).toBeNull();
  });

  it("shapes an active membership in a verified, active org for canWritePin", () => {
    const membership = resolveProviderMembership(dbMembership({}));
    expect(membership).not.toBeNull();
    // canWritePin approves the resolved membership
    expect(canWritePin({ id: "user_1" }, membership)).toBe(true);
  });

  it("exposes the organizationId on the resolved membership", () => {
    const membership = resolveProviderMembership(
      dbMembership({ organizationId: "org_A" }),
    );
    expect(membership?.organizationId).toBe("org_A");
  });

  it("resolves an inactive membership such that canWritePin rejects it", () => {
    const membership = resolveProviderMembership(dbMembership({ status: "REMOVED" }));
    expect(canWritePin({ id: "user_1" }, membership)).toBe(false);
  });

  it("resolves an unverified org such that canWritePin rejects it", () => {
    const membership = resolveProviderMembership(dbMembership({ orgStatus: "PENDING" }));
    expect(canWritePin({ id: "user_1" }, membership)).toBe(false);
  });

  it("resolves an inactive org such that canWritePin rejects it", () => {
    const membership = resolveProviderMembership(dbMembership({ orgActive: false }));
    expect(canWritePin({ id: "user_1" }, membership)).toBe(false);
  });
});
