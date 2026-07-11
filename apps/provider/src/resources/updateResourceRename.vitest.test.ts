import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateResource } from "./updateResource";

const update = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const findActiveByTitleAndAddress = vi.fn();
const resource = { organizationId: "org_A" };
const membership = { organizationId: "org_A", status: "ACTIVE" };
const deps = {
  update,
  insert,
  recordAuditEvent,
  findActiveByTitleAndAddress,
  resource,
  membership,
};

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1" });
});

describe("updateResource — rename & duplicate (EDIT-002)", () => {
  it("renames the resource when no active duplicate exists", async () => {
    findActiveByTitleAndAddress.mockResolvedValue(null);

    const result = await updateResource(
      "resource_1",
      { title: "Joe's Barbershop" },
      deps
    );

    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("rejects a rename that collides with a DIFFERENT active resource", async () => {
    findActiveByTitleAndAddress.mockResolvedValue({
      id: "other_resource",
      status: "ACTIVE",
    });

    const result = await updateResource(
      "resource_1",
      { title: "Food Pantry" },
      deps
    );

    expect(result.ok).toBe(false);
    expect(result.error).toBe("Duplicate resource — edit, report, or use Custom");
    expect(update).not.toHaveBeenCalled();
  });

  it("does not flag the resource being edited as its own duplicate", async () => {
    // the active match IS the same resource being edited → not a collision
    findActiveByTitleAndAddress.mockResolvedValue({
      id: "resource_1",
      status: "ACTIVE",
    });

    const result = await updateResource(
      "resource_1",
      { title: "Same Title" },
      deps
    );

    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("does not record an audit event when a rename is rejected as a duplicate", async () => {
    findActiveByTitleAndAddress.mockResolvedValue({
      id: "other_resource",
      status: "ACTIVE",
    });

    await updateResource("resource_1", { title: "Food Pantry" }, deps);

    expect(recordAuditEvent).not.toHaveBeenCalled();
  });
})
