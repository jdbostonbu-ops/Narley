import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { ProviderDetailModal } from "../components/ProviderDetailModal";
import { REPORT_ALERTS } from "../constants/providerAlerts";
import { useWeatherAlerts } from "../state/WeatherAlertsStore";

const theme = getTheme(false);

export const AlertsScreen = () => {
  const {
    weatherAlerts,
    alertCount,
    loading,
    error,
  } = useWeatherAlerts();
  const [selectedAlert, setSelectedAlert] = useState<ProviderCardData | null>(null);
  const alerts = [...REPORT_ALERTS, ...weatherAlerts];

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.content}
        data={alerts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.sectionHeader}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>Your alerts</Text>
              <Text accessibilityLabel={`${alertCount} alerts`} style={styles.count}>
                {alertCount}
              </Text>
            </View>
            <Text style={styles.subtitle}>Reports and urgent changes that need your review.</Text>
          </View>
        )}
        ListFooterComponent={(
          <View>
            {loading && <ActivityIndicator color={theme.colors.accent} />}
            {error !== null && (
              <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>
            )}
          </View>
        )}
        renderItem={({ item }) => <ProviderCard item={item} onPress={() => setSelectedAlert(item)} />}
      />
      <ProviderDetailModal item={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 120, paddingHorizontal: 12, paddingTop: 18 },
  header: { marginBottom: 14 },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: { color: theme.colors.textInverse, fontSize: 22, fontWeight: "900" },
  count: { color: "#CBD5E1", fontSize: 14, fontWeight: "900" },
  subtitle: { color: "#CBD5E1", fontSize: 15, lineHeight: 21, marginTop: 6 },
  error: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: "800",
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
});
