import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";

import { getTheme } from "@shared-ui/theme/theme";
import { filterResourcesByZip } from "../src/resources/filterResourcesByZip";

type SampleResource = {
  id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

const theme = getTheme(false);

const initialRegion: Region = {
  latitude: 41.3557,
  longitude: -72.0995,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const sampleResources: SampleResource[] = [
  {
    id: "sample-food-resource",
    title: "Test Food Resource",
    address: "181 State Street, New London, CT 06320",
    latitude: 41.3557,
    longitude: -72.0995,
  },
  {
    id: "sample-soup-kitchen",
    title: "Test Soup Kitchen",
    address: "106 Truman Street, New London, CT 06320",
    latitude: 41.3632,
    longitude: -72.1058,
  },
  {
    id: "sample-community-pantry",
    title: "Test Community Pantry",
    address: "1 Beach Pond Road, Groton, CT 06340",
    latitude: 41.3489,
    longitude: -72.0917,
  },
];

export const MapScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [visibleResources, setVisibleResources] = useState(sampleResources);

  const handleSearch = () => {
    const query = searchText.trim();

    if (/^\d{5}$/.test(query)) {
      setVisibleResources(filterResourcesByZip(sampleResources, query));
      return;
    }

    // TODO: Add city geocoding when the search service is connected.
    setVisibleResources(sampleResources);
  };

  return (
    <View style={styles.screen}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.appBackground,
    flex: 1,
    paddingHorizontal: 8,
  },
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
});
