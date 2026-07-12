import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';

import { getTheme } from '@shared-ui/theme/theme';

const theme = getTheme(false);
const navigationTheme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: theme.colors.appBackground, card: theme.colors.appBackground, primary: theme.colors.accent, text: theme.colors.textInverse, border: 'rgba(255,255,255,0.08)', notification: theme.colors.danger } };

export default function RootLayout() {
  return <ThemeProvider value={navigationTheme}><Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: theme.colors.accent, tabBarInactiveTintColor: '#9CA3AF', tabBarLabelStyle: { fontSize: 12, fontWeight: '800' }, tabBarStyle: { backgroundColor: theme.colors.appBackground, borderTopColor: 'rgba(255,255,255,0.08)', height: 82, paddingBottom: 18, paddingTop: 8 }, tabBarIcon: ({ color, size }) => <Ionicons color={color} name={({ index: 'map', alerts: 'notifications', saved: 'bookmark', profile: 'person-circle' } as const)[route.name as 'index' | 'alerts' | 'saved' | 'profile']} size={size + 3} /> })}>
    <Tabs.Screen name="index" options={{ title: 'Map' }} />
    <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
    <Tabs.Screen name="saved" options={{ title: 'Saved' }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    <Tabs.Screen name="explore" options={{ href: null }} />
  </Tabs></ThemeProvider>;
}
