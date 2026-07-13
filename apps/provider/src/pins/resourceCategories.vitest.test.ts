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
        iconSet: "Ionicons",
        iconColor: "#22C55E",
        accessibilityLabel: "Food Bank resource",
      },
      {
        id: "soup_kitchen",
        label: "Soup Kitchen",
        icon: "restaurant",
        iconSet: "Ionicons",
        iconColor: "#F59E0B",
        accessibilityLabel: "Soup Kitchen resource",
      },
      {
        id: "charging_station",
        label: "Charging Station",
        icon: "battery-charging",
        iconSet: "Ionicons",
        iconColor: "#2563EB",
        accessibilityLabel: "Charging Station resource",
      },
      {
        id: "shelter",
        label: "Shelter",
        icon: "bed",
        iconSet: "Ionicons",
        iconColor: "#6B21A8",
        accessibilityLabel: "Shelter resource",
      },
      {
        id: "employment",
        label: "Employment",
        icon: "briefcase",
        iconSet: "Ionicons",
        iconColor: "#7C4A02",
        accessibilityLabel: "Employment resource",
      },
      {
        id: "housing",
        label: "Housing",
        icon: "home",
        iconSet: "Ionicons",
        iconColor: "#2C8C84",
        accessibilityLabel: "Housing resource",
      },
      {
        id: "recovery",
        label: "Recovery",
        icon: "hand-heart",
        iconSet: "MaterialCommunityIcons",
        iconColor: "#D9339B",
        accessibilityLabel: "Recovery resource",
      },
      {
        id: "mental_health",
        label: "Mental Health",
        icon: "heart",
        iconSet: "Ionicons",
        iconColor: "#E8B923",
        accessibilityLabel: "Mental Health resource",
      },
      {
        id: "medical_clinic",
        label: "Medical Clinic",
        icon: "medical-bag",
        iconSet: "MaterialCommunityIcons",
        iconColor: "#CC2E2E",
        accessibilityLabel: "Medical Clinic resource",
      },
    ]);
  });

  it("provides the Custom category as the default fallback", () => {
    expect(DEFAULT_RESOURCE_CATEGORY).toEqual({
      id: "custom",
      label: "Custom",
      icon: "star",
      iconSet: "Ionicons",
      iconColor: "#0F4D35",
      accessibilityLabel: "Community resource",
    });
  });

  it("resolves ids and labels while safely falling back for custom categories", () => {
    expect(getResourceCategory("food_bank").label).toBe("Food Bank");
    expect(getResourceCategory("Soup Kitchen").id).toBe("soup_kitchen");
    expect(getResourceCategory("Career Fair")).toBe(DEFAULT_RESOURCE_CATEGORY);
    expect(getResourceCategory(undefined)).toBe(DEFAULT_RESOURCE_CATEGORY);
  });
});