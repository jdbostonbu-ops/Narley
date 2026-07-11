import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateResource } from "./updateResource";

const update = vi.fn();
const insert = vi.fn();
const recordAuditEvent = vi.fn();
const findActiveByTitleAndAddress = vi.fn();
const deps = { update, insert, recordAuditEvent, findActiveByTitleAndAddress };

beforeEach(() => {
  vi.clearAllMocks();
  update.mockResolvedValue({ id: "resource_1", title: "Joe's Barbershop" });
  findActiveByTitleAndAddress.mockResolvedValue(null);
});

describe("updateResource (EDIT-009)", () => {
  it("saves changes to the existing resource", async () => {
    const result = await updateResource(
      "resource_1",
      { title: "Joe's Barbershop" },
      deps
    );

    expect(result.ok).toBe(true);
    expect(update).toHaveBeenCalledWith(
      "resource_1",
      expect.objectContaining({ title: "Joe's Barbershop" })
    );
  });

  it("updates the existing record and does not create a second resource", async () => {
    await updateResource("resource_1", { title: "Joe's Barbershop" }, deps);

    expect(update).toHaveBeenCalledTimes(1);
    expect(insert).not.toHaveBeenCalled();
  });

  it("can update multiple fields at once", async () => {
    await updateResource(
      "resource_1",
      { title: "Joe's Barbershop", category: "Barber" },
      deps
    );

    expect(update).toHaveBeenCalledWith(
      "resource_1",
      expect.objectContaining({ title: "Joe's Barbershop", category: "Barber" })
    );
  });
})
