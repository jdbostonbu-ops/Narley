import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/brand-header';
import { ResourceCard, type ReaderResource } from '@/components/resource-card';
import { ResourceDetailModal } from '@/components/resource-detail-modal';
import { READER_SCREEN_INSET } from '@/constants/layout';
import { getResources } from '@/api/client';
import { getTheme } from '@shared-ui/theme/theme';
import { MapPin } from '../../provider/components/MapPin';
import { filterResourcesByZip } from '../../provider/src/resources/filterResourcesByZip';
import { getReaderVisibleResources } from '../../provider/src/resources/getReaderVisibleResources';
import { geocodeSearch } from '../src/location/geocodeSearch';

const theme = getTheme(false);
const region: Region = { latitude: 41.3557, longitude: -72.0995, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const searchRegionDelta = 0.08;

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const [query, setQuery] = useState('');
  const [activeZip, setActiveZip] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
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

  const handleSearch = async () => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      setActiveZip(null);
      setSearchMessage('Enter a city or ZIP code');
      return;
    }

    setSearching(true);
    setSearchMessage(null);

    const result = await geocodeSearch(trimmedQuery);

    if (!result.ok) {
      setActiveZip(null);
      setSearchMessage(result.error);
      setSearching(false);
      return;
    }

    setActiveZip(/^\d{5}$/.test(trimmedQuery) ? trimmedQuery : null);
    mapRef.current?.animateToRegion({
      latitude: result.latitude,
      longitude: result.longitude,
      latitudeDelta: searchRegionDelta,
      longitudeDelta: searchRegionDelta,
    }, 500);
    setSearchMessage(`Map centered on ${trimmedQuery}.`);
    setSearching(false);
  };

  return <View style={styles.screen}>
    <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} keyboardShouldPersistTaps="handled">
      <BrandHeader />
      <View style={styles.searchRow}>
        <TextInput accessibilityLabel="Search resources by city or ZIP code" editable={!searching} onChangeText={setQuery} onSubmitEditing={() => { void handleSearch(); }} placeholder="City or ZIP code" placeholderTextColor={theme.colors.textMuted} returnKeyType="search" style={styles.searchInput} value={query} />
        <Pressable accessibilityLabel="Search resources" accessibilityRole="button" disabled={searching} onPress={() => { void handleSearch(); }} style={[styles.searchButton, searching && styles.searchDisabled]}>{searching && <ActivityIndicator color={theme.colors.textInverse} size="small" />}<Text style={styles.searchText}>{searching ? 'Searching…' : 'Search'}</Text></Pressable>
      </View>
      {searchMessage !== null && <Text accessibilityLiveRegion="polite" style={styles.searchMessage}>{searchMessage}</Text>}
      {loading ? <View accessibilityLabel="Loading resources" style={styles.stateCard}>
        <ActivityIndicator color={theme.colors.accent} />
        <Text style={styles.stateBody}>Loading resources…</Text>
      </View> : <>
        <View style={styles.mapCard}>
          <MapView accessibilityLabel="Map of nearby resources" initialRegion={region} ref={mapRef} style={styles.map}>{displayedResources.map((item) => <Marker accessibilityLabel={`${item.title}. ${item.category}`} anchor={{ x: 0.5, y: 1 }} coordinate={{ latitude: item.latitude!, longitude: item.longitude! }} key={item.id} onPress={() => setSelected(item)} title={item.title}><MapPin category={item.category} /></Marker>)}</MapView>
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
  searchButton: { alignItems: 'center', backgroundColor: theme.colors.cta, borderRadius: 20, flexDirection: 'row', gap: theme.spacing.sm, height: 52, justifyContent: 'center', paddingHorizontal: 18 },
  searchDisabled: { opacity: 0.65 },
  searchText: { color: theme.colors.textInverse, fontSize: 15, fontWeight: '900' },
  searchMessage: { color: theme.colors.textInverse, fontSize: 14, marginBottom: theme.spacing.md, marginTop: -theme.spacing.sm },
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
