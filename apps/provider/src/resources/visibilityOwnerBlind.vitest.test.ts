import { describe, it, expect } from "vitest";
import { isResourceVisible } from "./isResourceVisible";
import { getReaderVisibleResources } from "./getReaderVisibleResources";

const now = new Date("2026-07-11T00:00:00Z");
const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

describe("map sync invariant — visibility is owner-blind (all maps see the same pins)", () => {
  it("an active resource is visible regardless of which organization owns it", () => {
    const ownedByOrgA = { status: "ACTIVE", expiresAt: future, organizationId: "org_A" };
    const ownedByOrgB = { status: "ACTIVE", expiresAt: future, organizationId: "org_B" };

    expect(isResourceVisible(ownedByOrgA, now)).toBe(true);
    expect(isResourceVisible(ownedByOrgB, now)).toBe(true);
  });

  it("isResourceVisible gives the same answer no matter the owner (owner does not change visibility)", () => {
    const base = { status: "ACTIVE", expiresAt: future };

    const a = isResourceVisible({ ...base, organizationId: "org_A" }, now);
    const b = isResourceVisible({ ...base, organizationId: "org_B" }, now);
    const none = isResourceVisible({ ...base }, now); // no owner field at all

    expect(a).toBe(b);
    expect(b).toBe(none);
  });

  it("the reader-visible set includes resources from every organization, not just one", () => {
    const resources = [
      { id: "a", status: "ACTIVE", expiresAt: future, organizationId: "org_A" },
      { id: "b", status: "ACTIVE", expiresAt: future, organizationId: "org_B" },
      { id: "c", status: "ACTIVE", expiresAt: future, organizationId: "org_C" },
    ];

    const visible = getReaderVisibleResources(resources, now);
    expect(visible.map((r) => r.id)).toEqual(["a", "b", "c"]);
  });

  it("does not filter resources by any viewer or owner identity", () => {
    // the same resource list produces the same visible set no matter who asks;
    // getReaderVisibleResources takes no viewer/owner argument at all
    const resources = [
      { id: "a", status: "ACTIVE", expiresAt: future, organizationId: "org_A" },
      { id: "b", status: "ACTIVE", expiresAt: future, organizationId: "org_B" },
    ];

    const first = getReaderVisibleResources(resources, now).map((r) => r.id);
    const second = getReaderVisibleResources(resources, now).map((r) => r.id);
    expect(first).toEqual(second);
    expect(first).toEqual(["a", "b"]);
  });
})
