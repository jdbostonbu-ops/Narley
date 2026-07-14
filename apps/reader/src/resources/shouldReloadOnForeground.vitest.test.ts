import { describe, it, expect } from "vitest";

import { shouldReloadOnForeground } from "./shouldReloadOnForeground";

describe("shouldReloadOnForeground (LIVE-010)", () => {
  it("reloads when transitioning from background to active", () => {
    expect(shouldReloadOnForeground("background", "active")).toBe(true);
  });

  it("reloads when transitioning from inactive to active", () => {
    expect(shouldReloadOnForeground("inactive", "active")).toBe(true);
  });

  it("does not reload when staying active", () => {
    expect(shouldReloadOnForeground("active", "active")).toBe(false);
  });

  it("does not reload when going to background", () => {
    expect(shouldReloadOnForeground("active", "background")).toBe(false);
  });
});
