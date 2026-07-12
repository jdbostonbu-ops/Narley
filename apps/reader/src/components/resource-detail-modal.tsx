import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';
import type { ReaderResource } from './resource-card';

const theme = getTheme(false);

export function ResourceDetailModal({ item, onClose, showReport = false }: { item: ReaderResource | null; onClose: () => void; showReport?: boolean }) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={item !== null}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Close resource details" onPress={onClose} style={styles.backdrop} />
        {!!item && <View style={styles.wrapper}>
          <View style={styles.card}>
            <Pressable accessibilityLabel="Close resource details" accessibilityRole="button" onPress={onClose} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
              <Text style={styles.category}>{item.category}</Text>
              <Text accessibilityRole="header" style={styles.title}>{item.title}</Text>
              <Text style={styles.notes}>{item.notes}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.actions}>
                <Pressable style={styles.primary}><Text style={styles.primaryText}>Directions</Text></Pressable>
                <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Share</Text></Pressable>
                {showReport && <Pressable
                  accessibilityLabel="Report this resource"
                  accessibilityRole="button"
                  onPress={() => Alert.alert(
                    'Report this resource?',
                    'Send this resource for review if its information appears incorrect or unavailable.',
                    [{ text: 'Cancel', style: 'cancel' }, { text: 'Report', style: 'destructive' }],
                  )}
                  style={styles.report}
                ><Text style={styles.reportText}>Report</Text></Pressable>}
              </View>
              <Text style={styles.reminderLabel}>Reminder</Text>
              <View style={styles.chips}>
                {['Tomorrow', '3 days', '1 week'].map((label) => <Pressable key={label} style={styles.chip}><Text style={styles.chipText}>{label}</Text></Pressable>)}
              </View>
              <TextInput placeholder="Custom reminder" placeholderTextColor={theme.colors.textMuted} style={styles.customInput} />
              <Pressable style={styles.save}><Text style={styles.saveText}>Save + Remind</Text></Pressable>
            </ScrollView>
          </View>
        </View>}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  wrapper: { paddingBottom: 100, paddingHorizontal: 14 },
  card: { ...theme.shadows.floating, backgroundColor: theme.colors.background, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 24, borderWidth: 1, marginHorizontal: 16, marginTop: 70, maxHeight: '92%', overflow: 'hidden' },
  content: { padding: 24, paddingBottom: 42, paddingTop: 32 },
  close: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 19, height: 38, justifyContent: 'center', position: 'absolute', right: 14, top: 14, width: 38, zIndex: 2 },
  closeText: { color: theme.colors.text, fontSize: 24, fontWeight: '900', lineHeight: 26 },
  category: { alignSelf: 'flex-start', backgroundColor: '#F2E7C9', borderRadius: 999, color: '#B7791F', fontSize: 12, fontWeight: '800', marginBottom: 14, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 6 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: '900', marginBottom: 10, paddingRight: 44 },
  notes: { color: '#374151', fontSize: 16, lineHeight: 24, marginBottom: 18 },
  address: { color: theme.colors.textMuted, fontSize: 14, marginBottom: 20 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  primary: { backgroundColor: theme.colors.primary, borderRadius: 20, marginTop: 10, paddingHorizontal: 28, paddingVertical: 16 },
  primaryText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  secondary: { backgroundColor: '#374151', borderRadius: 16, marginTop: 10, paddingHorizontal: 18, paddingVertical: 14 },
  secondaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  report: { backgroundColor: '#8B2E24', borderRadius: 16, marginTop: 10, paddingHorizontal: 18, paddingVertical: 14 },
  reportText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: '900' },
  reminderLabel: { color: theme.colors.text, fontSize: 14, fontWeight: '900', marginBottom: 8, marginTop: 18 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#374151', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 9 },
  chipText: { color: '#FFFFFF', fontWeight: '700' },
  customInput: { backgroundColor: '#FFFFFF', borderColor: theme.colors.border, borderRadius: 12, borderWidth: 1, color: theme.colors.text, marginTop: 10, padding: 12 },
  save: { alignItems: 'center', backgroundColor: '#16A34A', borderRadius: 16, marginTop: 14, paddingHorizontal: 18, paddingVertical: 16 },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
