import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { ResourceCategory } from "@shared-ui/resourceCategories";

type ResourceCategoryIconProps = {
  category: ResourceCategory;
  color: string;
  size: number;
};

export const ResourceCategoryIcon = ({
  category,
  color,
  size,
}: ResourceCategoryIconProps) => {
  if (category.iconSet === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons color={color} name={category.icon} size={size} />;
  }

  return <Ionicons color={color} name={category.icon} size={size} />;
};
