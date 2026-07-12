import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { getResourceCategory } from "@shared-ui/resourceCategories";
import { getTheme } from "@shared-ui/theme/theme";

type CategoryBadgeProps = {
  category: string;
};

const theme = getTheme(false);

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const categoryConfig = getResourceCategory(category);

  return (
    <View
      accessibilityLabel={categoryConfig.accessibilityLabel}
      style={[styles.badge, { borderColor: categoryConfig.iconColor }]}
    >
      <Ionicons color={categoryConfig.iconColor} name={categoryConfig.icon} size={15} />
      <Text style={[styles.label, { color: categoryConfig.iconColor }]}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
  },
});
