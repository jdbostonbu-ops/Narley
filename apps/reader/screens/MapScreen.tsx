import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/brand-header';
import { ResourceCard, type ReaderResource } from '@/components/resource-card';
import { ResourceDetailModal } from '@/components/resource-detail-modal';
import { READER_SCREEN_INSET } from '@/constants/layout';
import { getResources } from '@/api/client';
import { getTheme } from '@shared-ui/theme/theme';
import { filterResourcesByZip } from '../../provider/src/resources/filterResourcesByZip';
import { getReaderVisibleResources } from '../../provider/src/resources/getReaderVisibleResources';

const theme = getTheme(false);
const region: Region = { latitude: 41.3557, longitude: -72.0995, latitudeDelta: 0.05, longitudeDelta: 0.05 };

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeZip, setActiveZip] = useState<string | null>(null);
  const [resources, setResources] = useState<ReaderResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ReaderResource | null>(null);
  const displayedResources = activeZip === null
    ? resources
    : filterResourcesByZip(resources, activeZip);

  useEffect(() => {
    let mounted = true;

    const loadResources = async () => {
      try {
        const loadedResources = await getResources();
        const visibleResources = getReaderVisibleResources(
          loadedResources,
          new Date(),
        );
        const readerResources = visibleResources.map((resource) => ({
          id: resource.id,
          category: resource.category,
          status: resource.status,
          title: resource.title,
          notes: resource.notes,
          address: resource.address,
          latitude: resource.latitude,
          longitude: resource.longitude,
        }));

        if (mounted) {
          setResources(readerResources);
          setError(null);
        }
      } catch (loadError: unknown) {
        if (mounted) {
          setResources([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Unable to load resources',
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (/^\d{5}$/.test(trimmedQuery)) {
      setActiveZip(trimmedQuery);
      return;
    }

    // TODO: Add city filtering when a tested city-search service is available.
    setActiveZip(null);
  };

  return <View style={styles.screen}>
    <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} keyboardShouldPersistTaps="handled">
      <BrandHeader />
      <View style={styles.searchRow}>
        <TextInput accessibilityLabel="Search resources by city or ZIP code" onChangeText={setQuery} onSubmitEditing={handleSearch} placeholder="City or ZIP code" placeholderTextColor={theme.colors.textMuted} returnKeyType="search" style={styles.searchInput} value={query} />
        <Pressable accessibilityLabel="Search resources" accessibilityRole="button" onPress={handleSearch} style={styles.searchButton}><Text style={styles.searchText}>Search</Text></Pressable>
      </View>
      {loading ? <View accessibilityLabel="Loading resources" style={styles.stateCard}>
        <ActivityIndicator color={theme.colors.accent} />
        <Text style={styles.stateBody}>Loading resources…</Text>
      </View> : <>
        <View style={styles.mapCard}>
          <MapView accessibilityLabel="Map of nearby resources" initialRegion={region} style={styles.map}>{displayedResources.map((item) => <Marker accessibilityLabel={`${item.title}. ${item.category}`} coordinate={{ latitude: item.latitude!, longitude: item.longitude! }} key={item.id} onPress={() => setSelected(item)} title={item.title} />)}</MapView>
        </View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Nearby resources</Text><Text style={styles.count}>{displayedResources.length}</Text></View>
        {displayedResources.length === 0 ? <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>{activeZip === null ? 'No resources yet' : 'No resources found'}</Text>
          {error !== null && <Text style={styles.stateBody}>{error}</Text>}
        </View> : <View style={styles.list}>{displayedResources.map((item) => <ResourceCard item={item} key={item.id} onPress={() => setSelected(item)} />)}</View>}
      </>}
    </ScrollView>
    <ResourceDetailModal item={selected} onClose={() => setSelected(null)} showReport />
  </View>;
};

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
  count: { color: theme.colors.textMuted, fontSize: 14, fontWeight: '800' },
  list: { paddingBottom: 20, width: '100%' },
  stateCard: { ...theme.shadows.card, alignItems: 'center', backgroundColor: theme.colors.background, borderRadius: 24, padding: 24, width: '100%' },
  stateTitle: { color: theme.colors.text, fontSize: 18, fontWeight: '900' },
  stateBody: { color: theme.colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: theme.spacing.sm, textAlign: 'center' },
});
