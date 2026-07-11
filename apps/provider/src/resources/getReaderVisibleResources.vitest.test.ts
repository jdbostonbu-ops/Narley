import { describe, it, expect } from "vitest";
import { getReaderVisibleResources } from "./getReaderVisibleResources";

const DAY = 24 * 60 * 60 * 1000;
const now = new Date("2026-07-11T00:00:00Z");
const future = new Date(now.getTime() + 30 * DAY);
const past = new Date(now.getTime() - DAY);

describe("getReaderVisibleResources (RMAP-004)", () => {
  it("includes ACTIVE, unexpired resources", () => {
    const resources = [
      { id: "a", status: "ACTIVE", expiresAt: future },
      { id: "b", status: "ACTIVE", expiresAt: future },
    ];
    const visible = getReaderVisibleResources(resources, now);
    expect(visible.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("excludes expired resources", () => {
    const resources = [
      { id: "a", status: "ACTIVE", expiresAt: future },
      { id: "b", status: "ACTIVE", expiresAt: past },
    ];
    const visible = getReaderVisibleResources(resources, now);
    expect(visible.map((r) => r.id)).toEqual(["a"]);
  });

  it("excludes EXPIRED-status resources", () => {
    const resources = [
      { id: "a", status: "ACTIVE", expiresAt: future },
      { id: "b", status: "EXPIRED", expiresAt: future },
    ];
    const visible = getReaderVisibleResources(resources, now);
    expect(visible.map((r) => r.id)).toEqual(["a"]);
  });

  it("returns an empty array when nothing is visible", () => {
    const resources = [
      { id: "a", status: "EXPIRED", expiresAt: future },
      { id: "b", status: "ACTIVE", expiresAt: past },
    ];
    expect(getReaderVisibleResources(resources, now)).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(getReaderVisibleResources([], now)).toEqual([]);
  });
})
