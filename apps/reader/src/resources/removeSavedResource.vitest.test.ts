import { describe, it, expect } from "vitest";
import { removeSavedResource } from "./removeSavedResource";

const joes = { id: "resource_1", title: "Joe's Barbershop Haircuts" };
const foodPantry = { id: "resource_2", title: "Food Pantry" };

describe("removeSavedResource (SAVE-008)", () => {
  it("removes the saved card with the given id", () => {
    const result = removeSavedResource([joes, foodPantry], "resource_1");
    expect(result.map((r) => r.id)).toEqual(["resource_2"]);
  });

  it("leaves other saved cards intact", () => {
    const result = removeSavedResource([joes, foodPantry], "resource_1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("resource_2");
  });

  it("returns the list unchanged when the id is not saved", () => {
    const result = removeSavedResource([joes, foodPantry], "resource_99");
    expect(result.map((r) => r.id)).toEqual(["resource_1", "resource_2"]);
  });

  it("does not mutate or return the original saved list", () => {
    const original = [joes, foodPantry];
    const result = removeSavedResource(original, "resource_1");
    expect(original).toHaveLength(2); // original untouched
    expect(result).not.toBe(original); // new list returned
  });

  it("returns an empty list when the last saved card is removed", () => {
    const result = removeSavedResource([joes], "resource_1");
    expect(result).toEqual([]);
  });
})
