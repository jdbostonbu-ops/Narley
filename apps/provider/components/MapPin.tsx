import { StyleSheet, View } from "react-native";

import { getResourceCategory } from "@shared-ui/resourceCategories";
import { getTheme } from "@shared-ui/theme/theme";
import { ResourceCategoryIcon } from "./ResourceCategoryIcon";

type MapPinProps = {
  category: string | undefined;
};

const theme = getTheme(false);
const PIN_SIZE = 46;
const PIN_ROUNDED_RADIUS = PIN_SIZE / 2;
const PIN_POINT_RADIUS = 3;
const INNER_CIRCLE_SIZE = 34;

export const MapPin = ({ category }: MapPinProps) => {
  const categoryConfig = getResourceCategory(category);

  return (
    <View
      accessibilityLabel={categoryConfig.accessibilityLabel}
      accessibilityRole="image"
      style={styles.frame}
    >
      <View style={[styles.pin, { backgroundColor: categoryConfig.iconColor }]}>
        <View style={styles.innerCircle}>
          <ResourceCategoryIcon
            category={categoryConfig}
            color={categoryConfig.iconColor}
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    height: 58,
    paddingBottom: 8,
    width: 50,
  },
  pin: {
    ...theme.shadows.floating,
    alignItems: "center",
    borderBottomLeftRadius: PIN_ROUNDED_RADIUS,
    borderBottomRightRadius: PIN_POINT_RADIUS,
    borderTopLeftRadius: PIN_ROUNDED_RADIUS,
    borderTopRightRadius: PIN_ROUNDED_RADIUS,
    height: PIN_SIZE,
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
    width: PIN_SIZE,
  },
  innerCircle: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: INNER_CIRCLE_SIZE / 2,
    height: INNER_CIRCLE_SIZE,
    justifyContent: "center",
    transform: [{ rotate: "-45deg" }],
    width: INNER_CIRCLE_SIZE,
  },
});
