import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/brand-header';
import { ResourceCard, type ReaderResource } from '@/components/resource-card';
import { ResourceDetailModal } from '@/components/resource-detail-modal';
import { READER_SCREEN_INSET } from '@/constants/layout';
import { getTheme } from '@shared-ui/theme/theme';

const theme = getTheme(false);
const region: Region = { latitude: 41.3557, longitude: -72.0995, latitudeDelta: 0.05, longitudeDelta: 0.05 };
export const readerResources: ReaderResource[] = [
  { id: 'food-1', category: 'Food', status: 'Open', title: 'Community Food Resource', notes: 'Food support and local resource information.', address: '181 State Street, New London, CT 06320', latitude: 41.3557, longitude: -72.0995 },
  { id: 'meal-1', category: 'Meals', status: 'Open', title: 'Community Meal Program', notes: 'Prepared meals available during posted service hours.', address: '106 Truman Street, New London, CT 06320', latitude: 41.3632, longitude: -72.1058 },
];

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ReaderResource | null>(null);

  return <View style={styles.screen}>
    <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} keyboardShouldPersistTaps="handled">
      <BrandHeader />
      <View style={styles.searchRow}>
        <TextInput accessibilityLabel="Search resources by city or ZIP code" onChangeText={setQuery} placeholder="City or ZIP code" placeholderTextColor="#9CA3AF" returnKeyType="search" style={styles.searchInput} value={query} />
        <Pressable accessibilityRole="button" style={styles.searchButton}><Text style={styles.searchText}>Search</Text></Pressable>
      </View>
      <View style={styles.mapCard}>
        <MapView initialRegion={region} style={styles.map}>{readerResources.map((item) => <Marker coordinate={{ latitude: item.latitude!, longitude: item.longitude! }} key={item.id} onPress={() => setSelected(item)} title={item.title} />)}</MapView>
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Nearby resources</Text><Text style={styles.count}>{readerResources.length}</Text></View>
      <View style={styles.list}>{readerResources.map((item) => <ResourceCard item={item} key={item.id} onPress={() => setSelected(item)} />)}</View>
    </ScrollView>
    <ResourceDetailModal item={selected} onClose={() => setSelected(null)} showReport />
  </View>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 120, paddingHorizontal: READER_SCREEN_INSET },
  searchRow: { alignItems: 'center', flexDirection: 'row', gap: 12, marginBottom: 14, width: '100%' },
  searchInput: { backgroundColor: theme.colors.surfaceDark, borderRadius: 20, color: theme.colors.textInverse, flex: 1, fontSize: 16, height: 52, paddingHorizontal: 14 },
  searchButton: { alignItems: 'center', backgroundColor: theme.colors.cta, borderRadius: 20, height: 52, justifyContent: 'center', paddingHorizontal: 18 },
  searchText: { color: theme.colors.textInverse, fontSize: 15, fontWeight: '900' },
  mapCard: { borderRadius: 24, height: 420, marginBottom: 20, overflow: 'hidden', width: '100%' },
  map: { flex: 1 },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  sectionTitle: { color: theme.colors.textInverse, fontSize: 22, fontWeight: '900' },
  count: { color: '#9CA3AF', fontSize: 14, fontWeight: '800' },
  list: { paddingBottom: 20, width: '100%' },
});
