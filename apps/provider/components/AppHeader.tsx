import { Ionicons } from "@expo/vector-icons";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTheme } from "@shared-ui/theme/theme";

const theme = getTheme(false);
const LOGO_HEIGHT = 54;
const LOGO_WIDTH = 58;
const logoSource = require("../assets/narley-icon-1024.png");

export const AppHeader = ({ navigation, route }: BottomTabHeaderProps) => (
  <SafeAreaView edges={["top"]} style={styles.safeArea}>
    <View style={styles.wrapper}>
      <View style={styles.glow} />

      <View style={styles.row}>
        <Image
          accessibilityLabel="Narley"
          fadeDuration={0}
          resizeMode="contain"
          source={logoSource}
          style={styles.logo}
        />

        <View style={styles.textWrap}>
          <Text accessibilityRole="header" style={styles.title}>
            NARLEY
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>Community resource navigation</Text>
        </View>
        {route.name === "Map" && (
          <Pressable
            accessibilityLabel="Open profile"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => navigation.navigate("Profile")}
            style={styles.menuButton}
          >
            <Ionicons color={theme.colors.textInverse} name="menu" size={28} />
          </Pressable>
        )}
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.appBackground,
    paddingHorizontal: 8,
  },
  wrapper: {
    backgroundColor: theme.colors.primary,
    borderRadius: 28,
    marginBottom: 18,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  glow: {
    backgroundColor: theme.colors.surface,
    borderRadius: 999,
    height: 220,
    opacity: 0.05,
    position: "absolute",
    right: -80,
    top: -120,
    width: 220,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    borderRadius: 16,
    flexShrink: 0,
    height: LOGO_HEIGHT,
    marginRight: 16,
    maxHeight: LOGO_HEIGHT,
    maxWidth: LOGO_WIDTH,
    minHeight: LOGO_HEIGHT,
    minWidth: LOGO_WIDTH,
    width: LOGO_WIDTH,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: theme.colors.textInverse,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1,
  },
  subtitle: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    opacity: 0.72,
  },
  menuButton: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 20,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
});
