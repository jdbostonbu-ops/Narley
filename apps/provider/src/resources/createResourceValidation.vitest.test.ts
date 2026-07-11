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

const DAY = 24 * 60 * 60 * 1000;

const validResource = {
  title: "Food Pantry",
  category: "Food",
  address: "111 Plant Street, New London, CT 06320",
  latitude: 41.35,
  longitude: -72.1,
  expiresAt: new Date(Date.now() + 30 * DAY),
};

const deps = {
  findActiveByTitleAndAddress,
  insert,
  recordAuditEvent,
  membership: verifiedMembership,
};

beforeEach(() => {
  vi.clearAllMocks();
  findActiveByTitleAndAddress.mockResolvedValue(null);
  insert.mockResolvedValue({ id: "resource_1" });
});

describe("createResource validation guard (SEC-004)", () => {
  it("writes a valid resource", async () => {
    const result = await createResource(validResource, provider, deps);
    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("blocks a resource with no title", async () => {
    const result = await createResource({ ...validResource, title: "" }, provider, deps);
    expect(result.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("blocks a resource with out-of-range coordinates", async () => {
    const result = await createResource(
      { ...validResource, latitude: 999 },
      provider,
      deps,
    );
    expect(result.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("blocks a resource with a past expiration date", async () => {
    const result = await createResource(
      { ...validResource, expiresAt: new Date(Date.now() - DAY) },
      provider,
      deps,
    );
    expect(result.ok).toBe(false);
    expect(insert).not.toHaveBeenCalled();
  });

  it("does not record an audit event when validation blocks the write", async () => {
    await createResource({ ...validResource, title: "" }, provider, deps);
    expect(recordAuditEvent).not.toHaveBeenCalled();
  });

  it("returns the validation errors when blocked", async () => {
    const result = await createResource({ ...validResource, title: "" }, provider, deps);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
    }
  });
})
