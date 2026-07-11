import { describe, it, expect } from "vitest";
import { saveResource } from "./saveResource";

const joesBarbershop = { id: "resource_1", title: "Joe's Barbershop Haircuts" };
const foodPantry = { id: "resource_2", title: "Food Pantry" };

describe("saveResource (SAVE-002)", () => {
  it("adds a resource to an empty saved list", () => {
    const result = saveResource([], joesBarbershop);
    expect(result.map((r) => r.id)).toEqual(["resource_1"]);
  });

  it("adds a different resource to an existing saved list", () => {
    const result = saveResource([joesBarbershop], foodPantry);
    expect(result.map((r) => r.id)).toEqual(["resource_1", "resource_2"]);
  });

  it("does not create a second card when the same resource is saved twice", () => {
    const result = saveResource([joesBarbershop], joesBarbershop);
    expect(result.map((r) => r.id)).toEqual(["resource_1"]);
    expect(result).toHaveLength(1);
  });

  it("does not duplicate when the same resource id is already in a longer list", () => {
    const result = saveResource([joesBarbershop, foodPantry], joesBarbershop);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["resource_1", "resource_2"]);
  });
})
