export type ResourceCategoryIcon =
  | "basket"
  | "battery-charging"
  | "bed"
  | "restaurant"
  | "star";

export type ResourceCategory = {
  id: string;
  label: string;
  icon: ResourceCategoryIcon;
  iconColor: string;
  accessibilityLabel: string;
};

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = [
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
];

export const DEFAULT_RESOURCE_CATEGORY: ResourceCategory = {
  id: "custom",
  label: "Custom",
  icon: "star",
  iconColor: "#0F4D35",
  accessibilityLabel: "Community resource",
};

export const getResourceCategory = (category: string | undefined): ResourceCategory => {
  const normalizedCategory = category?.trim().toLocaleLowerCase();

  return RESOURCE_CATEGORIES.find(({ id, label }) => (
    id.toLocaleLowerCase() === normalizedCategory ||
    label.toLocaleLowerCase() === normalizedCategory
  )) ?? DEFAULT_RESOURCE_CATEGORY;
};
