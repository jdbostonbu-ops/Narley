import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTheme } from "@shared-ui/theme/theme";

const theme = getTheme(false);

export const AppHeader = () => (
  <SafeAreaView edges={["top"]} style={styles.safeArea}>
    <View style={styles.wrapper}>
      <View style={styles.glow} />

      <View style={styles.row}>
        <Image
          accessibilityLabel="Narley"
          resizeMode="contain"
          source={require("../assets/narley-icon-1024.png")}
          style={styles.logo}
        />

        <View style={styles.textWrap}>
          <Text accessibilityRole="header" style={styles.title}>
            NARLEY
          </Text>
          <Text style={styles.subtitle}>Community resource navigation</Text>
        </View>
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
    height: 54,
    marginRight: 16,
    width: 58,
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
});
