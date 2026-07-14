import { describe, expect, it } from "vitest";

import { parseResource } from "./parseResource";

describe("parseResource — includes phone and website (LIVE-010)", () => {
  it("parses phone and website into the reader resource", () => {
    const resource = parseResource({
      id: "r1",
      title: "Test",
      category: "Food Bank",
      status: "ACTIVE",
      address: "1 Main St",
      latitude: 41.3,
      longitude: -72.1,
      expiresAt: "2026-12-01T00:00:00.000Z",
      notes: "",
      phone: "(860)555-1234",
      website: "https://example.org",
    });

    expect(resource).not.toBeNull();
    expect(resource?.phone).toBe("(860)555-1234");
    expect(resource?.website).toBe("https://example.org");
  });
});
