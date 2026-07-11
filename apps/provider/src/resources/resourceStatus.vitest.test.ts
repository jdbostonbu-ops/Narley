import { describe, it, expect } from "vitest";
import { RESOURCE_STATUSES, isValidResourceStatus } from "./resourceStatus";

describe("resource status contract (POST-011)", () => {
  it("the approved status set is exactly ACTIVE and EXPIRED", () => {
    expect([...RESOURCE_STATUSES].sort()).toEqual(["ACTIVE", "EXPIRED"]);
  });

  it("accepts ACTIVE", () => {
    expect(isValidResourceStatus("ACTIVE")).toBe(true);
  });

  it("accepts EXPIRED", () => {
    expect(isValidResourceStatus("EXPIRED")).toBe(true);
  });

  it("rejects any value outside the approved set", () => {
    expect(isValidResourceStatus("DELETED")).toBe(false);
    expect(isValidResourceStatus("OPEN")).toBe(false);
    expect(isValidResourceStatus("")).toBe(false);
  });
});
