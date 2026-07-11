import { describe, it, expect, vi, beforeEach } from "vitest";
import { createResource } from "./createResource";
import { validResource } from "./validResource.fixture";

const findActiveByTitleAndAddress = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const membership = {
  status: "ACTIVE",
  org: { status: "VERIFIED", active: true },
};
const deps = {
  findActiveByTitleAndAddress,
  insert,
  recordAuditEvent,
  membership,
};

const provider = { id: "provider_1" };

beforeEach(() => {
  vi.clearAllMocks();
  insert.mockResolvedValue({ id: "resource_1" });
});

describe("createResource audit event (POST-014 / POST-015)", () => {
  it("records a 'created' audit event on successful creation", async () => {
    findActiveByTitleAndAddress.mockResolvedValue(null);

    await createResource(validResource, provider, deps);

    expect(recordAuditEvent).toHaveBeenCalledTimes(1);
    expect(recordAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceId: "resource_1",
        providerId: "provider_1",
        event: "created",
        timestamp: expect.any(Date),
      })
    );
  });

  it("does NOT record an audit event when creation is blocked as a duplicate", async () => {
    findActiveByTitleAndAddress.mockResolvedValue({
      id: "existing",
      status: "ACTIVE",
    });

    const result = await createResource(validResource, provider, deps);

    expect(result.ok).toBe(false);
    expect(recordAuditEvent).not.toHaveBeenCalled();
  });

  it("does NOT record an audit event when the insert fails", async () => {
    findActiveByTitleAndAddress.mockResolvedValue(null);
    insert.mockRejectedValue(new Error("db write failed"));

    await expect(createResource(validResource, provider, deps)).rejects.toThrow();

    expect(recordAuditEvent).not.toHaveBeenCalled();
  });
});
