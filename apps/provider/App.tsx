import "react-native-gesture-handler";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppHeader } from "./components/AppHeader";
import { AlertsScreen } from "./screens/AlertsScreen";
import { MapScreen } from "./screens/MapScreen";
import { MyPostsScreen } from "./screens/MyPostsScreen";
import { PostResourceScreen } from "./screens/PostResourceScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProviderConfirmResetScreen } from "./screens/ProviderConfirmResetScreen";
import { ProviderRequestResetScreen } from "./screens/ProviderRequestResetScreen";
import { ResourceStoreProvider } from "./state/ResourceStore";
import { getTheme } from "@shared-ui/theme/theme";
import { AuthProvider, useAuth } from "./src/auth/useAuth";
import { resolveAuthView } from "./src/auth/resolveAuthView";
import {
  WeatherAlertsProvider,
  useWeatherAlerts,
} from "./state/WeatherAlertsStore";

type ProviderTabParamList = {
  Map: undefined;
  Post: undefined;
  "My Posts": undefined;
  Alerts: undefined;
  Profile: undefined;
};

const theme = getTheme(false);
const Tab = createBottomTabNavigator<ProviderTabParamList>();

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
  keyof ProviderTabParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Map: "map",
  Post: "add-circle",
  "My Posts": "list",
  Alerts: "notifications",
  Profile: "person-circle",
};

const ProviderTabs = () => {
  const { alertCount } = useWeatherAlerts();

  return (
    <Tab.Navigator
    initialRouteName="Map"
    screenOptions={({ route }) => ({
      header: AppHeader,
      headerShown: true,
      headerTintColor: theme.colors.textInverse,
      tabBarActiveTintColor: theme.colors.accent,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={tabIcons[route.name]} color={color} size={size} />
      ),
      tabBarLabelStyle: {
        fontSize: theme.typography.small.fontSize,
        fontWeight: theme.typography.small.fontWeight,
      },
      tabBarBadge: route.name === "Alerts" && alertCount > 0
        ? alertCount
        : undefined,
      tabBarBadgeStyle: {
        backgroundColor: theme.colors.danger,
        color: theme.colors.textInverse,
      },
      tabBarStyle: {
        backgroundColor: theme.colors.appBackground,
        borderTopColor: theme.colors.surfaceDark,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
      },
    })}
  >
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Post" component={PostResourceScreen} />
    <Tab.Screen name="My Posts" component={MyPostsScreen} />
    <Tab.Screen name="Alerts" component={AlertsScreen} />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarButton: () => null }}
    />
    </Tab.Navigator>
  );
};

type ProviderAuthScreen = "login" | "request-reset" | "confirm-reset";

const ProviderAuthFlow = () => {
  const [screen, setScreen] = useState<ProviderAuthScreen>("login");
  const [notice, setNotice] = useState("");

  if (screen === "request-reset") {
    return (
      <ProviderRequestResetScreen
        onBackToLogin={() => setScreen("login")}
        onEnterCode={() => setScreen("confirm-reset")}
      />
    );
  }

  if (screen === "confirm-reset") {
    return (
      <ProviderConfirmResetScreen
        onBack={() => setScreen("request-reset")}
        onResetComplete={() => {
          setNotice("Your password has been reset. Log in with your new password.");
          setScreen("login");
        }}
      />
    );
  }

  return (
    <LoginScreen
      notice={notice}
      onForgotPassword={() => {
        setNotice("");
        setScreen("request-reset");
      }}
    />
  );
};

const AuthenticatedApp = () => {
  const { user, loading } = useAuth();
  const membership = user === null ? null : { status: "ACTIVE" };
  const view = resolveAuthView({ loading, user, membership });

  if (view !== "tabs") {
    return <ProviderAuthFlow />;
  }

  return (
    <ResourceStoreProvider>
      <WeatherAlertsProvider>
        <ProviderTabs />
      </WeatherAlertsProvider>
    </ResourceStoreProvider>
  );
};

export const App = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <NavigationContainer theme={navigationTheme}>
        <AuthenticatedApp />
      </NavigationContainer>
    </AuthProvider>
  </SafeAreaProvider>
);

export default App;
