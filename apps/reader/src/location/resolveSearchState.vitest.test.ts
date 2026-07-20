import { describe, it, expect } from "vitest";
import { resolveSearchState } from "./resolveSearchState";

describe("resolveSearchState (RMAP-013 ZIP search overrides, clearing returns to GPS)", () => {
  it("a valid ZIP search activates search mode with that ZIP", () => {
    const result = resolveSearchState("06515");
    expect(result.mode).toBe("search");
    expect(result.activeZip).toBe("06515");
  });

  it("a non-ZIP city search activates search mode with no active ZIP", () => {
    const result = resolveSearchState("Boston");
    expect(result.mode).toBe("search");
    expect(result.activeZip).toBe(null);
  });

  it("an empty search clears back to GPS mode", () => {
    const result = resolveSearchState("");
    expect(result.mode).toBe("gps");
    expect(result.activeZip).toBe(null);
  });

  it("a whitespace-only search clears back to GPS mode", () => {
    const result = resolveSearchState("   ");
    expect(result.mode).toBe("gps");
    expect(result.activeZip).toBe(null);
  });

  it("trims the query before deciding", () => {
    const result = resolveSearchState("  06320  ");
    expect(result.mode).toBe("search");
    expect(result.activeZip).toBe("06320");
  });
});
