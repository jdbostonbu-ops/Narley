import { describe, it, expect, vi, beforeEach } from "vitest";
import { createResource } from "./createResource";

const findActiveByTitleAndAddress = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();

const provider = { id: "provider_1" };

const verifiedMembership = {
  status: "ACTIVE",
  org: { status: "VERIFIED", active: true },
};
const unverifiedMembership = {
  status: "ACTIVE",
  org: { status: "PENDING", active: true },
};

const resource = {
  title: "Food Pantry",
  address: "111 Plant Street, New London, CT 06320",
};

type Membership = {
  status: string;
  org: { status: string; active: boolean };
};

const deps = (membership: Membership) => ({
  findActiveByTitleAndAddress,
  insert,
  recordAuditEvent,
  membership,
});

beforeEach(() => {
  vi.clearAllMocks();
  findActiveByTitleAndAddress.mockResolvedValue(null);
  insert.mockResolvedValue({ id: "resource_1" });
});

describe("createResource verified-provider guard (SEC-002)", () => {
  it("allows a verified provider to create a resource", async () => {
    const result = await createResource(resource, provider, deps(verifiedMembership));

    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("blocks a provider whose organization is not verified", async () => {
    const result = await createResource(resource, provider, deps(unverifiedMembership));

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/verified|authorized|permission/i);
    expect(insert).not.toHaveBeenCalled();
  });

  it("blocks when the membership is not ACTIVE", async () => {
    const removed = { status: "REMOVED", org: { status: "VERIFIED", active: true } };
    const result = await createResource(resource, provider, deps(removed));

    expect(result.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("blocks when the organization is inactive", async () => {
    const inactiveOrg = { status: "ACTIVE", org: { status: "VERIFIED", active: false } };
    const result = await createResource(resource, provider, deps(inactiveOrg));

    expect(result.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("does not record an audit event when the write is blocked", async () => {
    await createResource(resource, provider, deps(unverifiedMembership));
    expect(recordAuditEvent).not.toHaveBeenCalled();
  });
})
