import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateResource } from "./updateResource";

const update = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const deps = { update, insert, recordAuditEvent };

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1", title: "Joe's Barbershop" });
});

describe("updateResource audit event (EDIT-010)", () => {
  it("records one 'updated' audit event on a successful update", async () => {
    await updateResource("resource_1", { title: "Joe's Barbershop" }, deps);

    expect(recordAuditEvent).toHaveBeenCalledTimes(1);
    expect(recordAuditEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceId: "resource_1",
        event: "updated",
        timestamp: expect.any(Date),
      })
    );
  });

  it("does NOT record an audit event when the update fails", async () => {
    update.mockRejectedValue(new Error("db write failed"));

    await expect(
      updateResource("resource_1", { title: "Joe's Barbershop" }, deps)
    ).rejects.toThrow();

    expect(recordAuditEvent).not.toHaveBeenCalled();
  });
});
