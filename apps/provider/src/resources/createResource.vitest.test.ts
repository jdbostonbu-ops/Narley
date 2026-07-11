import { describe, it, expect, vi, beforeEach } from "vitest";
import { createResource } from "./createResource";
import { validResource } from "./validResource.fixture";

const findActiveByTitleAndAddress = vi.fn();
const insert = vi.fn();
const deps = { findActiveByTitleAndAddress, insert };

const provider = { id: "provider_1" };

beforeEach(() => {
  vi.clearAllMocks();
  insert.mockResolvedValue({ id: "resource_1" });
});

describe("createResource (POST-013)", () => {
  it("creates one resource and stamps the signed-in providerId", async () => {
    findActiveByTitleAndAddress.mockResolvedValue(null);

    const result = await createResource(validResource, provider, deps);

    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ providerId: "provider_1" })
    );
  });

  it("rejects a duplicate: an ACTIVE resource with same title + address exists (any provider)", async () => {
    findActiveByTitleAndAddress.mockResolvedValue({
      id: "existing",
      providerId: "someone_else",
      status: "ACTIVE",
    });

    const result = await createResource(validResource, provider, deps);

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/duplicate resource/i);
    expect(insert).not.toHaveBeenCalled();
  });

  it("allows re-posting when no ACTIVE match exists (previous pin expired or deleted)", async () => {
    // expired/deleted pins are not returned by findActiveByTitleAndAddress → null
    findActiveByTitleAndAddress.mockResolvedValue(null);

    const result = await createResource(validResource, provider, deps);

    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it("allows a different title at the same address (not a duplicate)", async () => {
    findActiveByTitleAndAddress.mockResolvedValue(null);

    const result = await createResource(
      { ...validResource, title: "Free Tents" },
      provider,
      deps
    );

    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledTimes(1);
  });
});
