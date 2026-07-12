import { Stack } from "expo-router";

import { getTheme } from "@shared-ui/theme/theme";

const theme = getTheme(false);

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.appBackground },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
