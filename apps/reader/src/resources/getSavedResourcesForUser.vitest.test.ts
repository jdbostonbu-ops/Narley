import { describe, it, expect } from "vitest";
import { getSavedResourcesForUser } from "./getSavedResourcesForUser";

const allSaved = [
  { userId: "user_A", resource: { id: "resource_1", title: "Joe's Barbershop Haircuts" } },
  { userId: "user_B", resource: { id: "resource_2", title: "Food Pantry" } },
  { userId: "user_A", resource: { id: "resource_3", title: "Free Tents" } },
];

describe("getSavedResourcesForUser (SAVE-005)", () => {
  it("returns only the signed-in user's saved resources", () => {
    const result = getSavedResourcesForUser(allSaved, "user_A");
    expect(result.map((s) => s.resource.id)).toEqual(["resource_1", "resource_3"]);
  });

  it("does not return another user's saved resources", () => {
    const result = getSavedResourcesForUser(allSaved, "user_A");
    const ids = result.map((s) => s.resource.id);
    expect(ids).not.toContain("resource_2");
  });

  it("returns a different set for a different user", () => {
    const result = getSavedResourcesForUser(allSaved, "user_B");
    expect(result.map((s) => s.resource.id)).toEqual(["resource_2"]);
  });

  it("returns an empty list for a user with no saved resources", () => {
    const result = getSavedResourcesForUser(allSaved, "user_C");
    expect(result).toEqual([]);
  });
})
