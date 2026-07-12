import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";

type TabPlaceholderProps = {
  title: string;
};

const theme = getTheme(false);

export const TabPlaceholder = ({ title }: TabPlaceholderProps) => (
  <SafeAreaView style={styles.screen}>
    <View style={styles.panel}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: theme.colors.appBackground,
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  panel: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.radius.lg,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  title: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
  },
});
