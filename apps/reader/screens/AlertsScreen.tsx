import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getTheme } from '@shared-ui/theme/theme';
import { READER_SCREEN_INSET } from '@/constants/layout';

const theme = getTheme(false);
const alerts = [
  { id: 'weather', emergency: true, icon: '!', title: 'Severe weather update', message: 'Weather and shelter updates for your area will appear here.', metadata: 'Community alert' },
  { id: 'resource', emergency: false, icon: 'i', title: 'Resource information', message: 'Changes to nearby resource availability will appear here.', metadata: 'Resource update' },
];

export const AlertsScreen = () => {
  const insets = useSafeAreaInsets();
  return <View style={styles.screen}><FlatList contentContainerStyle={[styles.content, { paddingTop: insets.top + 18 }]} data={alerts} ItemSeparatorComponent={() => <View style={{ height: 14 }} />} keyExtractor={(item) => item.id} ListHeaderComponent={<View><Text accessibilityRole="header" style={styles.title}>Alerts</Text><Text style={styles.subtitle}>Important updates for your location and saved resources.</Text></View>} renderItem={({ item }) => <View style={[styles.card, item.emergency ? styles.emergencyCard : styles.infoCard]}><View style={[styles.icon, item.emergency ? styles.emergencyIcon : styles.infoIcon]}><Text style={styles.iconText}>{item.icon}</Text></View><View style={styles.body}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.message}>{item.message}</Text><Text style={styles.metadata}>{item.metadata}</Text></View></View>} /></View>;
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 }, content: { paddingBottom: 120, paddingHorizontal: READER_SCREEN_INSET },
  title: { color: theme.colors.textInverse, fontSize: 32, fontWeight: '900', marginBottom: 4 }, subtitle: { color: '#9CA3AF', fontSize: 15, marginBottom: 18 },
  card: { ...theme.shadows.card, borderRadius: 24, borderWidth: 1, flexDirection: 'row', padding: 16, width: '100%' }, emergencyCard: { backgroundColor: '#FFF1E8', borderColor: '#E26D5A' }, infoCard: { backgroundColor: theme.colors.background, borderColor: theme.colors.border },
  icon: { alignItems: 'center', borderRadius: 14, height: 42, justifyContent: 'center', marginRight: 14, width: 42 }, emergencyIcon: { backgroundColor: '#FBD1C6' }, infoIcon: { backgroundColor: '#F2E7C9' }, iconText: { color: '#6B1D14', fontSize: 18, fontWeight: '900' },
  body: { flex: 1 }, cardTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '900', marginBottom: 4 }, message: { color: '#4B5563', fontSize: 15, lineHeight: 21, marginBottom: 8 }, metadata: { color: '#9CA3AF', fontSize: 12, fontWeight: '700' },
});
