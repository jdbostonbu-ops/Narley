import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, type AppStateStatus, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker, type Region } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
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
import { getUserLocation } from '../src/location/getUserLocation';
import { resolveInitialRegion } from '../src/location/resolveInitialRegion';
import { shouldReloadOnForeground } from '../src/resources/shouldReloadOnForeground';

const theme = getTheme(false);
const fallbackRegion: Region = { latitude: 41.3557, longitude: -72.0995, latitudeDelta: 0.05, longitudeDelta: 0.05 };
const searchRegionDelta = 0.08;

export const MapScreen = () => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const mountedRef = useRef(true);
  const previousAppStateRef = useRef<AppStateStatus>(AppState.currentState);
  const mapModeRef = useRef<'gps' | 'search'>('gps');
  const [query, setQuery] = useState('');
  const [activeZip, setActiveZip] = useState<string | null>(null);
  const [gpsRegion, setGpsRegion] = useState<Region | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [resources, setResources] = useState<ReaderResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const displayedResources = activeZip === null
    ? resources
    : filterResourcesByZip(resources, activeZip);
  const selected = selectedId === null
    ? null
    : resources.find((resource) => resource.id === selectedId) ?? null;

  const loadResources = useCallback(async () => {
    if (mountedRef.current) {
      setLoading(true);
    }

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
        phone: resource.phone,
        website: resource.website,
      }));

      if (mountedRef.current) {
        setResources(readerResources);
        setError(null);
      }
    } catch (loadError: unknown) {
      if (mountedRef.current) {
        setResources([]);
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load resources',
        );
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const centerMapOnUserLocation = useCallback(async (): Promise<void> => {
    const location = await getUserLocation();
    const nextRegion = resolveInitialRegion(location, fallbackRegion);

    if (!mountedRef.current) {
      return;
    }

    setGpsRegion(nextRegion);

    if (mapModeRef.current === 'gps') {
      mapRef.current?.animateToRegion(nextRegion, 500);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useFocusEffect(useCallback(() => {
    void loadResources();
    void centerMapOnUserLocation();
  }, [centerMapOnUserLocation, loadResources]));

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      const previousState = previousAppStateRef.current;
      previousAppStateRef.current = nextState;

      if (shouldReloadOnForeground(previousState, nextState)) {
        void loadResources();
        void centerMapOnUserLocation();
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [centerMapOnUserLocation, loadResources]);

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
    mapModeRef.current = 'search';
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
      <View style={styles.pageHeading}>
        <Text accessibilityRole="header" style={styles.pageTitle}>Community Resources</Text>
        <Text style={styles.pageSubtitle}>Reader app</Text>
      </View>
      <View style={styles.searchRow}>
        <TextInput accessibilityLabel="Search resources by city or ZIP code" editable={!searching} onChangeText={setQuery} onSubmitEditing={() => { void handleSearch(); }} placeholder="City or ZIP code" placeholderTextColor={theme.colors.textMuted} returnKeyType="search" style={styles.searchInput} value={query} />
        <Pressable accessibilityLabel="Search resources" accessibilityRole="button" disabled={searching} onPress={() => { void handleSearch(); }} style={[styles.searchButton, searching && styles.searchDisabled]}>{searching && <ActivityIndicator color={theme.colors.textInverse} size="small" />}<Text style={styles.searchText}>{searching ? 'Searching…' : 'Search'}</Text></Pressable>
      </View>
      {searchMessage !== null && <Text accessibilityLiveRegion="polite" style={styles.searchMessage}>{searchMessage}</Text>}
      {loading || gpsRegion === null ? <View accessibilityLabel="Loading resources" style={styles.stateCard}>
        <ActivityIndicator color={theme.colors.accent} />
        <Text style={styles.stateBody}>Loading resources…</Text>
      </View> : <>
        <View style={styles.mapCard}>
          <MapView accessibilityLabel="Map of nearby resources" initialRegion={gpsRegion} ref={mapRef} style={styles.map}>{displayedResources.map((item) => <Marker accessibilityLabel={`${item.title}. ${item.category}`} anchor={{ x: 0.5, y: 1 }} coordinate={{ latitude: item.latitude!, longitude: item.longitude! }} key={item.id} onPress={() => setSelectedId(item.id)} title={item.title}><MapPin category={item.category} /></Marker>)}</MapView>
        </View>
        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Nearby resources</Text><Text style={styles.count}>{displayedResources.length}</Text></View>
        {displayedResources.length === 0 ? <View style={styles.stateCard}>
          <Text style={styles.stateTitle}>{activeZip === null ? 'No resources yet' : 'No resources found'}</Text>
          {error !== null && <Text style={styles.stateBody}>{error}</Text>}
        </View> : <View style={styles.list}>{displayedResources.map((item) => <ResourceCard item={item} key={item.id} onPress={() => setSelectedId(item.id)} />)}</View>}
      </>}
    </ScrollView>
    <ResourceDetailModal item={selected} onClose={() => setSelectedId(null)} showReport />
  </View>;
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 120, paddingHorizontal: READER_SCREEN_INSET },
  pageHeading: { marginBottom: theme.spacing.md },
  pageTitle: { color: theme.colors.textInverse, fontSize: 24, fontWeight: '900' },
  pageSubtitle: { color: theme.colors.textMuted, fontSize: 14, fontWeight: '700', marginTop: theme.spacing.xs },
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
