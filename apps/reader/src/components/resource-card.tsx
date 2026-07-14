import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';

export type ReaderResource = {
  id: string;
  category: string;
  status: string;
  title: string;
  notes: string;
  address: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
};

const theme = getTheme(false);

export function ResourceCard({ item, onPress }: { item: ReaderResource; onPress: () => void }) {
  return (
    <Pressable accessibilityHint="Opens resource details" accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.notes}>{item.notes}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 24, borderWidth: 1, marginVertical: 8, minHeight: 44, padding: 16, width: '100%' },
  pressed: { opacity: 0.88 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { color: '#B7791F', fontWeight: '700' },
  status: { color: '#0F766E', fontWeight: '800' },
  title: { color: theme.colors.text, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  notes: { color: '#4B5563', fontSize: 14, lineHeight: 20, marginBottom: 6 },
  address: { color: theme.colors.textMuted, fontSize: 13 },
});
