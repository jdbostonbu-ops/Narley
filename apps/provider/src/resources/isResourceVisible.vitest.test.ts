import { describe, it, expect } from "vitest";
import { isResourceVisible } from "./isResourceVisible";

const DAY = 24 * 60 * 60 * 1000;
const now = new Date("2026-07-11T00:00:00Z");

const future = new Date(now.getTime() + 30 * DAY);
const past = new Date(now.getTime() - DAY);

describe("isResourceVisible (LIFE-001/002/007)", () => {
  it("shows an ACTIVE resource whose expiration is in the future", () => {
    const resource = { status: "ACTIVE", expiresAt: future };
    expect(isResourceVisible(resource, now)).toBe(true);
  });

  it("hides an ACTIVE resource whose expiration has passed", () => {
    const resource = { status: "ACTIVE", expiresAt: past };
    expect(isResourceVisible(resource, now)).toBe(false);
  });

  it("hides a resource explicitly marked EXPIRED", () => {
    const resource = { status: "EXPIRED", expiresAt: future };
    expect(isResourceVisible(resource, now)).toBe(false);
  });

  it("hides a resource at the exact expiration moment", () => {
    const resource = { status: "ACTIVE", expiresAt: now };
    expect(isResourceVisible(resource, now)).toBe(false);
  });

  it("shows an ACTIVE resource one second before expiration", () => {
    const resource = { status: "ACTIVE", expiresAt: new Date(now.getTime() + 1000) };
    expect(isResourceVisible(resource, now)).toBe(true);
  });
})
