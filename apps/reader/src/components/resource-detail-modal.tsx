import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';
import type { ReaderResource } from './resource-card';

const theme = getTheme(false);

const formatReminderDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length < 2) {
    return digits;
  }

  if (digits.length === 2) {
    return `${digits}/`;
  }

  if (digits.length < 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  if (digits.length === 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}/`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const formatReminderTime = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  if (digits.length < 2) {
    return digits;
  }

  if (digits.length === 2) {
    return `${digits}:`;
  }

  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
};

export const ResourceDetailModal = ({ item, onClose, showReport = false }: { item: ReaderResource | null; onClose: () => void; showReport?: boolean }) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={item !== null}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Close resource details" onPress={onClose} style={styles.backdrop} />
        {!!item && <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={theme.spacing.sm} style={styles.wrapper}>
          <View style={styles.card}>
            <Pressable accessibilityLabel="Close resource details" accessibilityRole="button" onPress={onClose} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
            <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={styles.content} keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <Text style={styles.category}>{item.category}</Text>
              <Text accessibilityRole="header" style={styles.title}>{item.title}</Text>
              <Text style={styles.notes}>{item.notes}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <View style={styles.actions}>
                <Pressable accessibilityLabel="Get directions to this resource" accessibilityRole="button" style={styles.primary}><Text style={styles.primaryText}>Directions</Text></Pressable>
                <Pressable accessibilityLabel="Share this resource" accessibilityRole="button" style={styles.secondary}><Text style={styles.secondaryText}>Share</Text></Pressable>
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
              <View style={styles.reminderFields}>
                <View style={styles.reminderField}>
                  <Text style={styles.inputLabel}>Date</Text>
                  <TextInput
                    accessibilityLabel="Reminder date"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={10}
                    onChangeText={(value) => setReminderDate(formatReminderDate(value))}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor={theme.colors.textMuted}
                    style={styles.reminderInput}
                    value={reminderDate}
                  />
                </View>
                <View style={styles.reminderField}>
                  <Text style={styles.inputLabel}>Time</Text>
                  <TextInput
                    accessibilityLabel="Reminder time"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={5}
                    onChangeText={(value) => setReminderTime(formatReminderTime(value))}
                    placeholder="HH:MM"
                    placeholderTextColor={theme.colors.textMuted}
                    style={styles.reminderInput}
                    value={reminderTime}
                  />
                </View>
              </View>
              <Pressable accessibilityLabel="Save resource and reminder" accessibilityRole="button" style={styles.save}><Text style={styles.saveText}>Save + Remind</Text></Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  wrapper: { flex: 1, justifyContent: 'flex-end', paddingBottom: 100, paddingHorizontal: 14 },
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
  reminderFields: { flexDirection: 'row', gap: theme.spacing.sm },
  reminderField: { flex: 1 },
  inputLabel: { color: theme.colors.text, fontSize: 13, fontWeight: '800', marginBottom: theme.spacing.xs },
  reminderInput: { backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderRadius: 12, borderWidth: 1, color: theme.colors.text, minHeight: 48, paddingHorizontal: 12, paddingVertical: 10 },
  save: { alignItems: 'center', backgroundColor: '#16A34A', borderRadius: 16, marginTop: 14, paddingHorizontal: 18, paddingVertical: 16 },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
});
