import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getResources } from "./client";

describe("getResources — includes phone and website (LIVE-010)", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({
        resources: [{
          id: "r1", title: "Test", category: "Food Bank", status: "ACTIVE",
          address: "1 Main St", latitude: 41.3, longitude: -72.1,
          expiresAt: "2026-12-01T00:00:00.000Z", notes: "",
          phone: "(860)555-1234", website: "https://example.org",
        }],
      }),
    }) as unknown as typeof fetch;
  });
  afterEach(() => { vi.restoreAllMocks(); });

  it("parses phone and website from the API into the reader resource", async () => {
    const resources = await getResources();
    expect(resources).toHaveLength(1);
    expect(resources[0].phone).toBe("(860)555-1234");
    expect(resources[0].website).toBe("https://example.org");
  });
});
