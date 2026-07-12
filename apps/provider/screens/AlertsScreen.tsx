import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { ProviderDetailModal } from "../components/ProviderDetailModal";

const theme = getTheme(false);

const alertPreview: ProviderCardData[] = [
  {
    id: "report-alert-preview",
    title: "Resource information may have changed",
    notes: "An AI-assisted provider report will appear here with its findings and confidence.",
    metadata: "Report preview",
  },
];

export const AlertsScreen = () => {
  const [selectedAlert, setSelectedAlert] = useState<ProviderCardData | null>(null);

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.content}
        data={alertPreview}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={(
          <View style={styles.header}>
            <View style={styles.sectionHeader}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>Your alerts</Text>
              <Text accessibilityLabel={`${alertPreview.length} alerts`} style={styles.count}>
                {alertPreview.length}
              </Text>
            </View>
            <Text style={styles.subtitle}>Reports and urgent changes that need your review.</Text>
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
});
