import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { getResourceCategory } from "@shared-ui/resourceCategories";
import { getTheme } from "@shared-ui/theme/theme";

type MapPinProps = {
  category: string | undefined;
};

const theme = getTheme(false);

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
          <Ionicons
            color={categoryConfig.iconColor}
            name={categoryConfig.icon}
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
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 46,
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
    width: 46,
  },
  innerCircle: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    transform: [{ rotate: "-45deg" }],
    width: 34,
  },
});
