import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";

import { getTheme } from "@shared-ui/theme/theme";
import { filterResourcesByZip } from "../src/resources/filterResourcesByZip";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { ProviderDetailModal } from "../components/ProviderDetailModal";
import { useResourceStore } from "../state/ResourceStore";

const theme = getTheme(false);

const initialRegion: Region = {
  latitude: 41.3557,
  longitude: -72.0995,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const MapScreen = () => {
  const { resources, loading, error } = useResourceStore();
  const [searchText, setSearchText] = useState("");
  const [activeZip, setActiveZip] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<ProviderCardData | null>(null);
  const visibleResources = activeZip === null
    ? resources
    : filterResourcesByZip(resources, activeZip);

  const handleSearch = () => {
    const query = searchText.trim();

    if (/^\d{5}$/.test(query)) {
      setActiveZip(query);
      return;
    }

    // TODO: Add city geocoding when the search service is connected.
    setActiveZip(null);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PROVIDER MAP</Text>
        <Text accessibilityRole="header" style={styles.screenTitle}>Your resources</Text>
        <Text style={styles.intro}>Review the resources your organization has placed on the map.</Text>
      </View>
      <View style={styles.searchRow}>
        <TextInput
          accessibilityLabel="Search resources by city or ZIP code"
          autoCapitalize="words"
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          placeholder="City or ZIP code"
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="search"
          style={styles.searchInput}
          value={searchText}
        />
        <Pressable
          accessibilityLabel="Search resources"
          accessibilityRole="button"
          onPress={handleSearch}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <View style={styles.mapCard}>
        <MapView
          accessibilityLabel="Map of sample resources near New London, Connecticut"
          initialRegion={initialRegion}
          style={styles.map}
        >
          {visibleResources.map((resource) => (
            <Marker
              key={resource.id}
              coordinate={{
                latitude: resource.latitude,
                longitude: resource.longitude,
              }}
              title={resource.title}
            />
          ))}
        </MapView>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Resources</Text>
        <Text style={styles.count}>{visibleResources.length}</Text>
      </View>
      {loading ? (
        <View style={styles.emptyCard}>
          <ActivityIndicator color={theme.colors.accent} />
          <Text style={styles.loadingText}>Loading resources…</Text>
        </View>
      ) : visibleResources.length ? visibleResources.map((resource) => {
        const item: ProviderCardData = resource;
        return <ProviderCard item={item} key={resource.id} onPress={() => setSelectedResource(item)} />;
      }) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            {activeZip === null ? "No resources yet" : "No resources found"}
          </Text>
          <Text style={styles.emptyBody}>
            {error ?? (activeZip === null
              ? "Resources you create from the Post screen will appear here."
              : "Try another city or ZIP code.")}
          </Text>
        </View>
      )}
      </ScrollView>
      <ProviderDetailModal item={selectedResource} onClose={() => setSelectedResource(null)}>
        <View style={styles.modalActions}>
          <Pressable
            accessibilityLabel="Report this resource"
            accessibilityRole="button"
            onPress={() => Alert.alert(
              "Report this resource?",
              "Send this resource for review if its information appears incorrect or unavailable.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Report", style: "destructive" },
              ],
            )}
            style={styles.reportButton}
          >
            <Text style={styles.reportButtonText}>Report</Text>
          </Pressable>
        </View>
      </ProviderDetailModal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.appBackground,
    flex: 1,
  },
  content: {
    paddingBottom: 124,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  header: { marginBottom: 16 },
  eyebrow: { color: theme.colors.accent, fontSize: 12, fontWeight: "900", marginBottom: 6 },
  screenTitle: { color: theme.colors.textInverse, fontSize: 24, fontWeight: "900", marginBottom: 6 },
  intro: { color: "#CBD5E1", fontSize: 14, lineHeight: 20 },
  searchRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
    width: "100%",
  },
  searchInput: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: 20,
    color: theme.colors.textInverse,
    flex: 1,
    fontSize: 16,
    height: 52,
    paddingHorizontal: 14,
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: theme.colors.cta,
    borderRadius: 20,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  searchButtonText: {
    color: theme.colors.textInverse,
    fontSize: 15,
    fontWeight: "900",
  },
  mapCard: {
    borderRadius: 24,
    height: 420,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: { color: theme.colors.textInverse, fontSize: 22, fontWeight: "900" },
  count: { color: "#CBD5E1", fontSize: 14, fontWeight: "900" },
  emptyCard: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, padding: 24 },
  emptyTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "900", marginBottom: 6 },
  emptyBody: { color: "#4B5563", fontSize: 15, lineHeight: 22 },
  loadingText: {
    color: theme.colors.textMuted,
    fontSize: 15,
    fontWeight: "700",
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
  modalActions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  reportButton: {
    backgroundColor: "#8B2E24",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  reportButtonText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
});
