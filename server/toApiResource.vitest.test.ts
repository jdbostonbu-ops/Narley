import { describe, it, expect } from "vitest";

import { toApiResource } from "./toApiResource";

describe("toApiResource — includes real notes (LIVE-010)", () => {
  it("returns the resource's actual notes, not an empty string", () => {
    const dbResource = {
      id: "r1",
      title: "Goodwill",
      category: "Free Jackets",
      address: "61 Amity Rd, New Haven, CT 06515",
      latitude: 41.3,
      longitude: -72.9,
      expiresAt: new Date("2026-12-01T00:00:00.000Z"),
      status: "ACTIVE",
      phone: "(203)222-4444",
      website: null,
      notes: "Bring ID for pickup",
      organizationId: "org_hum",
    };

    const api = toApiResource(dbResource);

    expect(api.notes).toBe("Bring ID for pickup");
  });
});
