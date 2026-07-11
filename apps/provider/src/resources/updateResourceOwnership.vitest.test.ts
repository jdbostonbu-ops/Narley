import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateResource } from "./updateResource";

const update = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const findActiveByTitleAndAddress = vi.fn();

const baseDeps = { update, insert, recordAuditEvent, findActiveByTitleAndAddress };

const resource = { id: "resource_1", organizationId: "org_A" };

const activeMemberOrgA = { organizationId: "org_A", status: "ACTIVE" };
const activeMemberOrgB = { organizationId: "org_B", status: "ACTIVE" };

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1" });
  findActiveByTitleAndAddress.mockResolvedValue(null);
});

describe("updateResource ownership guard (SEC-001)", () => {
  it("allows an active member of the owning organization to update", async () => {
    const result = await updateResource(
      "resource_1",
      { title: "New Name" },
      { ...baseDeps, resource, membership: activeMemberOrgA },
    );

    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("blocks a member of a different organization from updating", async () => {
    const result = await updateResource(
      "resource_1",
      { title: "New Name" },
      { ...baseDeps, resource, membership: activeMemberOrgB },
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/authorized|permission|organization/i);
    expect(update).not.toHaveBeenCalled();
  });

  it("does not write or record an audit event when the editor is unauthorized", async () => {
    await updateResource(
      "resource_1",
      { title: "New Name" },
      { ...baseDeps, resource, membership: activeMemberOrgB },
    );

    expect(update).not.toHaveBeenCalled();
    expect(recordAuditEvent).not.toHaveBeenCalled();
  });

  it("blocks an inactive member of the owning organization", async () => {
    const removedMember = { organizationId: "org_A", status: "REMOVED" };
    const result = await updateResource(
      "resource_1",
      { title: "New Name" },
      { ...baseDeps, resource, membership: removedMember },
    );

    expect(result.ok).toBe(false);
    expect(update).not.toHaveBeenCalled();
  });
})
