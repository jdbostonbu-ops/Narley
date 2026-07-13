import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { type ReaderResource } from '@/components/resource-card';
import { ResourceDetailModal } from '@/components/resource-detail-modal';
import { getTheme } from '@shared-ui/theme/theme';
import { READER_SCREEN_INSET } from '@/constants/layout';

const theme = getTheme(false);

export const SavedScreen = () => {
  const [items, setItems] = useState<ReaderResource[]>([]);
  const [selected, setSelected] = useState<ReaderResource | null>(null);
  return <View style={styles.screen}><ScrollView contentContainerStyle={styles.content}><Text accessibilityRole="header" style={styles.screenTitle}>Saved</Text>{items.length ? items.map((item) => <Pressable key={item.id} onPress={() => setSelected(item)} style={styles.card}><Text style={styles.category}>{item.category}</Text><Text style={styles.title}>{item.title}</Text><Text style={styles.address}>{item.address}</Text><Text style={styles.hint}>Tap for details</Text><Pressable accessibilityRole="button" onPress={() => setItems((current) => current.filter(({ id }) => id !== item.id))} style={styles.delete}><Text style={styles.deleteText}>Delete</Text></Pressable></Pressable>) : <View style={styles.empty}><Text style={styles.emptyTitle}>Nothing saved yet</Text><Text style={styles.emptyBody}>Resources you save will appear here for quick access.</Text></View>}</ScrollView><ResourceDetailModal item={selected} onClose={() => setSelected(null)} /></View>;
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 }, content: { paddingBottom: 140, paddingHorizontal: READER_SCREEN_INSET, paddingTop: 24 }, screenTitle: { color: theme.colors.textInverse, fontSize: 32, fontWeight: '900', marginBottom: 18 },
  card: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, marginBottom: 14, padding: 16, width: '100%' }, category: { color: '#B7791F', fontSize: 12, fontWeight: '900', marginBottom: 6 }, title: { color: theme.colors.text, fontSize: 18, fontWeight: '900', marginBottom: 6 }, address: { color: theme.colors.textMuted, fontSize: 14, fontWeight: '600', marginBottom: 8 }, hint: { color: theme.colors.primary, fontSize: 13, fontWeight: '800' }, delete: { alignSelf: 'flex-start', backgroundColor: theme.colors.danger, borderRadius: 16, marginTop: 8, paddingHorizontal: 16, paddingVertical: 8 }, deleteText: { color: theme.colors.textInverse, fontSize: 13, fontWeight: '900' },
  empty: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, padding: 24 }, emptyTitle: { color: theme.colors.text, fontSize: 18, fontWeight: '900', marginBottom: 6 }, emptyBody: { color: '#4B5563', fontSize: 15, lineHeight: 22 },
});
