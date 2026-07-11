import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateResource } from "./updateResource";

const update = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const findActiveByTitleAndAddress = vi.fn();
const deps = { update, insert, recordAuditEvent, findActiveByTitleAndAddress };

const DAY = 24 * 60 * 60 * 1000;

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1" });
  findActiveByTitleAndAddress.mockResolvedValue(null);
});

describe("updateResource — expiration validation (EDIT-007)", () => {
  it("saves a valid future expiration date (extend the pin)", async () => {
    const november = new Date(Date.now() + 120 * DAY);

    const result = await updateResource("resource_1", { expiresAt: november }, deps);

    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("rejects a past expiration date and does not save", async () => {
    const result = await updateResource(
      "resource_1",
      { expiresAt: new Date(Date.now() - DAY) },
      deps
    );

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/expiration/i);
    expect(update).not.toHaveBeenCalled();
  });

  it("rejects an invalid date and does not save", async () => {
    const result = await updateResource(
      "resource_1",
      { expiresAt: new Date("not a date") },
      deps
    );

    expect(result.ok).toBe(false);
    expect(update).not.toHaveBeenCalled();
  });

  it("rejects a missing expiration when expiration is being edited and does not save", async () => {
    const result = await updateResource(
      "resource_1",
      { expiresAt: undefined },
      deps
    );

    expect(result.ok).toBe(false);
    expect(update).not.toHaveBeenCalled();
  });

  it("does not record an audit event when the expiration edit is rejected", async () => {
    await updateResource("resource_1", { expiresAt: new Date(Date.now() - DAY) }, deps);

    expect(recordAuditEvent).not.toHaveBeenCalled();
  });
})
