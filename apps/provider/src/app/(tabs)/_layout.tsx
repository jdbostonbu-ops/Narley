import { Tabs } from "expo-router";

import { getTheme } from "@shared-ui/theme/theme";

const theme = getTheme(false);

const TabsLayout = () => (
  <Tabs
    initialRouteName="map"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.accent,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarLabelPosition: "below-icon",
      tabBarLabelStyle: {
        fontSize: theme.typography.small.fontSize,
        fontWeight: theme.typography.small.fontWeight,
      },
      tabBarStyle: {
        backgroundColor: theme.colors.appBackground,
        borderTopColor: theme.colors.surfaceDark,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
      },
    }}
  >
    <Tabs.Screen
      name="map"
      options={{ title: "Map", tabBarAccessibilityLabel: "Map" }}
    />
    <Tabs.Screen
      name="post"
      options={{ title: "Post", tabBarAccessibilityLabel: "Post" }}
    />
    <Tabs.Screen
      name="my-posts"
      options={{ title: "My Posts", tabBarAccessibilityLabel: "My Posts" }}
    />
    <Tabs.Screen
      name="alerts"
      options={{ title: "Alerts", tabBarAccessibilityLabel: "Alerts" }}
    />
    <Tabs.Screen
      name="profile"
      options={{ title: "Profile", tabBarAccessibilityLabel: "Profile" }}
    />
  </Tabs>
);

export default TabsLayout;
