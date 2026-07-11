import { describe, it, expect } from "vitest";
import { saveResource } from "./saveResource";

const liveResource = {
  id: "resource_1",
  title: "Joe's Barbershop Haircuts",
  category: "Food",
  address: "111 Plant Street, New London, CT 06320",
  notes: "No ID needed",
  latitude: 41.35,
  longitude: -72.1,
};

describe("saveResource snapshot (SAVE-003)", () => {
  it("preserves the full resource detail in the saved record", () => {
    const [saved] = saveResource([], liveResource);
    expect(saved).toMatchObject({
      id: "resource_1",
      title: "Joe's Barbershop Haircuts",
      category: "Food",
      address: "111 Plant Street, New London, CT 06320",
      notes: "No ID needed",
      latitude: 41.35,
      longitude: -72.1,
    });
  });

  it("keeps the saved snapshot unchanged when the live resource is later edited", () => {
    const savedList = saveResource([], liveResource);

    // provider later edits the live resource
    liveResource.title = "Something Else";
    liveResource.address = "999 Other St";

    expect(savedList[0].title).toBe("Joe's Barbershop Haircuts");
    expect(savedList[0].address).toBe("111 Plant Street, New London, CT 06320");
  });
})
