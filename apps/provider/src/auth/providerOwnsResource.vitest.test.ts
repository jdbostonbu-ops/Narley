import { describe, it, expect } from "vitest";
import { providerOwnsResource } from "./providerOwnsResource";

describe("providerOwnsResource (AUTH-T-004)", () => {
  it("allows when the resource's organization matches the provider's organization", () => {
    expect(
      providerOwnsResource({ organizationId: "org_A" }, { organizationId: "org_A" }),
    ).toBe(true);
  });

  it("rejects when the resource belongs to a different organization", () => {
    expect(
      providerOwnsResource({ organizationId: "org_A" }, { organizationId: "org_B" }),
    ).toBe(false);
  });

  it("rejects when the provider has no organization", () => {
    expect(
      providerOwnsResource({ organizationId: null }, { organizationId: "org_A" }),
    ).toBe(false);
  });

  it("rejects when the resource has no organization", () => {
    expect(
      providerOwnsResource({ organizationId: "org_A" }, { organizationId: null }),
    ).toBe(false);
  });

  it("rejects when both organizations are null (does not treat null == null as ownership)", () => {
    expect(
      providerOwnsResource({ organizationId: null }, { organizationId: null }),
    ).toBe(false);
  });
});
