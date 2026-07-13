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

const DAY = 24 * 60 * 60 * 1000;
const MAX_YEAR_MESSAGE =
  "Resources can be active for a maximum of 1 year. Choose a date within 1 year — you can extend again later by posting a new pin.";

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1" });
  findActiveByTitleAndAddress.mockResolvedValue(null);
});

describe("updateResource — expiration cannot exceed one year (POST-010)", () => {
  it("rejects an expiration more than one year away with the approved message and does not save", async () => {
    const overAYear = new Date(Date.now() + 400 * DAY);
    const result = await updateResource("resource_1", { expiresAt: overAYear }, deps);
    expect(result.ok).toBe(false);
    expect(result.error).toBe(MAX_YEAR_MESSAGE);
    expect(update).not.toHaveBeenCalled();
  });

  it("rejects a far-future expiration (multiple years) the same way", async () => {
    const fiveYears = new Date(Date.now() + 5 * 365 * DAY);
    const result = await updateResource("resource_1", { expiresAt: fiveYears }, deps);
    expect(result.ok).toBe(false);
    expect(result.error).toBe(MAX_YEAR_MESSAGE);
    expect(update).not.toHaveBeenCalled();
  });

  it("does not record an audit event when the over-a-year edit is rejected", async () => {
    await updateResource("resource_1", { expiresAt: new Date(Date.now() + 400 * DAY) }, deps);
    expect(recordAuditEvent).not.toHaveBeenCalled();
  });

  it("still accepts an expiration within one year (extend the pin)", async () => {
    const withinYear = new Date(Date.now() + 300 * DAY);
    const result = await updateResource("resource_1", { expiresAt: withinYear }, deps);
    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledTimes(1);
  });
});
