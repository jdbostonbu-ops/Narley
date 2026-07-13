import "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { getTheme } from "@shared-ui/theme/theme";
import { AlertsScreen } from "./screens/AlertsScreen";
import { MapScreen } from "./screens/MapScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ReaderAuthScreen } from "./screens/ReaderAuthScreen";
import { ReaderVerifyScreen } from "./screens/ReaderVerifyScreen";
import { SavedScreen } from "./screens/SavedScreen";
import { resolveReaderAuthView } from "./src/auth/resolveReaderAuthView";
import { ReaderAuthProvider, useReaderAuth } from "./src/auth/useReaderAuth";
import {
  WeatherAlertsProvider,
  useWeatherAlerts,
} from "./state/WeatherAlertsStore";
import { SavedResourcesProvider } from "./state/SavedResourcesStore";

type ReaderTabParamList = {
  Map: undefined;
  Alerts: undefined;
  Saved: undefined;
  Profile: undefined;
};

const theme = getTheme(false);
const Tab = createBottomTabNavigator<ReaderTabParamList>();

const navigationTheme: NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.colors.accent,
    background: theme.colors.appBackground,
    card: theme.colors.appBackground,
    text: theme.colors.textInverse,
    border: theme.colors.surfaceDark,
    notification: theme.colors.danger,
  },
};

const tabIcons: Record<
  keyof ReaderTabParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Map: "map",
  Alerts: "notifications",
  Saved: "bookmark",
  Profile: "person-circle",
};

const ReaderTabs = () => {
  const { alertCount } = useWeatherAlerts();

  return (
    <Tab.Navigator
    initialRouteName="Map"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.accent,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarIcon: ({ color, size }) => (
        <Ionicons color={color} name={tabIcons[route.name]} size={size + 3} />
      ),
      tabBarBadge: route.name === "Alerts" && alertCount > 0
        ? alertCount
        : undefined,
      tabBarBadgeStyle: {
        backgroundColor: theme.colors.danger,
        color: theme.colors.textInverse,
      },
      tabBarLabelStyle: {
        fontSize: theme.typography.small.fontSize,
        fontWeight: theme.typography.small.fontWeight,
      },
      tabBarStyle: {
        backgroundColor: theme.colors.appBackground,
        borderTopColor: theme.colors.surfaceDark,
        height: 82,
        paddingBottom: 18,
        paddingTop: theme.spacing.sm,
      },
    })}
  >
    <Tab.Screen component={MapScreen} name="Map" />
    <Tab.Screen component={AlertsScreen} name="Alerts" />
    <Tab.Screen component={SavedScreen} name="Saved" />
    <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  );
};

const ReaderAuthGate = () => {
  const { loading, user } = useReaderAuth();
  const view = resolveReaderAuthView({ loading, user });

  if (view === "loading") {
    return (
      <View accessibilityLabel="Loading reader session" style={styles.loadingScreen}>
        <ActivityIndicator color={theme.colors.accent} size="large" />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  if (view === "auth") {
    return <ReaderAuthScreen />;
  }

  if (view === "verify") {
    return <ReaderVerifyScreen />;
  }

  return (
    <SavedResourcesProvider>
      <WeatherAlertsProvider>
        <ReaderTabs />
      </WeatherAlertsProvider>
    </SavedResourcesProvider>
  );
};

export const App = () => (
  <SafeAreaProvider>
    <ReaderAuthProvider>
      <NavigationContainer theme={navigationTheme}>
        <ReaderAuthGate />
      </NavigationContainer>
    </ReaderAuthProvider>
  </SafeAreaProvider>
);

export default App;

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    backgroundColor: theme.colors.appBackground,
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: theme.colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
    marginTop: theme.spacing.sm,
  },
});
