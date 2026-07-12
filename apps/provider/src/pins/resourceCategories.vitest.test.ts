import { describe, expect, it } from "vitest";

import {
  DEFAULT_RESOURCE_CATEGORY,
  RESOURCE_CATEGORIES,
  getResourceCategory,
} from "../../../../packages/shared-ui/resourceCategories";

describe("resource category pin configuration", () => {
  it("defines the approved visual identity for each preset category", () => {
    expect(RESOURCE_CATEGORIES).toEqual([
      {
        id: "food_bank",
        label: "Food Bank",
        icon: "basket",
        iconColor: "#22C55E",
        accessibilityLabel: "Food Bank resource",
      },
      {
        id: "soup_kitchen",
        label: "Soup Kitchen",
        icon: "restaurant",
        iconColor: "#F59E0B",
        accessibilityLabel: "Soup Kitchen resource",
      },
      {
        id: "charging_station",
        label: "Charging Station",
        icon: "battery-charging",
        iconColor: "#2563EB",
        accessibilityLabel: "Charging Station resource",
      },
      {
        id: "shelter",
        label: "Shelter",
        icon: "bed",
        iconColor: "#6B21A8",
        accessibilityLabel: "Shelter resource",
      },
    ]);
  });

  it("resolves ids and labels while safely falling back for custom categories", () => {
    expect(getResourceCategory("food_bank").label).toBe("Food Bank");
    expect(getResourceCategory("Soup Kitchen").id).toBe("soup_kitchen");
    expect(getResourceCategory("Career Fair")).toBe(DEFAULT_RESOURCE_CATEGORY);
    expect(getResourceCategory(undefined)).toBe(DEFAULT_RESOURCE_CATEGORY);
  });
});
