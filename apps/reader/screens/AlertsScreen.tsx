import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { READER_SCREEN_INSET } from "@/constants/layout";
import { getTheme } from "@shared-ui/theme/theme";
import { useWeatherAlerts } from "../state/WeatherAlertsStore";

const theme = getTheme(false);
const emergencyTheme = getTheme(true);

export const AlertsScreen = () => {
  const insets = useSafeAreaInsets();
  const { weatherAlerts, alertCount, loading, error } = useWeatherAlerts();

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 18 }]}
        data={weatherAlerts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={loading ? (
          <ActivityIndicator color={theme.colors.accent} />
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No active weather alerts</Text>
            <Text style={styles.emptyBody}>Weather alerts for New London will appear here when enabled.</Text>
          </View>
        )}
        ListFooterComponent={error === null ? null : (
          <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>
        )}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text accessibilityRole="header" style={styles.title}>Alerts</Text>
              <Text accessibilityLabel={`${alertCount} alerts`} style={styles.count}>{alertCount}</Text>
            </View>
            <Text style={styles.subtitle}>Important weather updates for New London.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View accessibilityLabel="Weather alert" style={styles.icon}>
              <Ionicons
                color={emergencyTheme.colors.primary}
                name="warning"
                size={22}
              />
            </View>
            <View style={styles.body}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.metadata}>{item.metadata}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 120, paddingHorizontal: READER_SCREEN_INSET },
  header: { marginBottom: 18 },
  titleRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: theme.colors.textInverse, fontSize: 32, fontWeight: "900", marginBottom: 4 },
  count: { color: theme.colors.textMuted, fontSize: 14, fontWeight: "900" },
  subtitle: { color: theme.colors.textMuted, fontSize: 15 },
  separator: { height: 14 },
  card: {
    ...theme.shadows.card,
    backgroundColor: emergencyTheme.colors.background,
    borderColor: emergencyTheme.colors.accent,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
    width: "100%",
  },
  icon: {
    alignItems: "center",
    backgroundColor: emergencyTheme.colors.border,
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    marginRight: 14,
    width: 42,
  },
  body: { flex: 1 },
  cardTitle: { color: emergencyTheme.colors.text, fontSize: 17, fontWeight: "900", marginBottom: 4 },
  message: { color: emergencyTheme.colors.textMuted, fontSize: 15, lineHeight: 21, marginBottom: 8 },
  metadata: { color: emergencyTheme.colors.textMuted, fontSize: 12, fontWeight: "700" },
  emptyCard: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, padding: 24 },
  emptyTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "900", marginBottom: 6 },
  emptyBody: { color: theme.colors.textMuted, fontSize: 15, lineHeight: 22 },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800", marginTop: theme.spacing.md, textAlign: "center" },
});
