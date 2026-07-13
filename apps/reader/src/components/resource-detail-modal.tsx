import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';
import { useSavedResources } from '../../state/SavedResourcesStore';
import { scheduleResourceNotification } from '../notifications/scheduleNotification';
import { scheduleReminder } from '../reminders/scheduleReminder';
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

const toIsoReminderDate = (value: string): string => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  return match === null ? value : `${match[3]}-${match[1]}-${match[2]}`;
};

const toTwentyFourHourTime = (
  value: string,
  meridiem: 'AM' | 'PM',
): string => {
  const match = /^(\d{2}):(\d{2})$/.exec(value);

  if (match === null) {
    return value;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
    return 'invalid';
  }

  const hour24 = hour % 12 + (meridiem === 'PM' ? 12 : 0);
  return `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

export const ResourceDetailModal = ({ item, onClose, showReport = false, showSave = true }: { item: ReaderResource | null; onClose: () => void; showReport?: boolean; showSave?: boolean }) => {
  const { save } = useSavedResources();
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderMeridiem, setReminderMeridiem] = useState<'AM' | 'PM'>('AM');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [reminding, setReminding] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  const handleSave = async () => {
    if (item === null) {
      return;
    }

    setSaving(true);
    setSaveMessage('');
    const result = await save(item);
    setSaving(false);
    setSaveMessage(result.ok ? 'Resource saved.' : result.error);
  };

  const handleRemind = async () => {
    if (item === null) {
      return;
    }

    setReminding(true);
    setReminderMessage('');
    const date = toIsoReminderDate(reminderDate);
    const time = toTwentyFourHourTime(reminderTime, reminderMeridiem);

    try {
      const result = await scheduleReminder(date, time, new Date(), {
        scheduleNotification: async (scheduledDate, scheduledTime) =>
          scheduleResourceNotification(scheduledDate, scheduledTime, {
            title: item.title,
            address: item.address,
          }),
      });
      setReminderMessage(result.ok ? result.message : result.error);
    } catch (notificationError: unknown) {
      setReminderMessage(
        notificationError instanceof Error
          ? notificationError.message
          : 'Unable to schedule reminder',
      );
    } finally {
      setReminding(false);
    }
  };

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
                  <View accessibilityLabel="Reminder time period" style={styles.meridiemRow}>
                    {(['AM', 'PM'] as const).map((period) => (
                      <Pressable
                        accessibilityLabel={`Set reminder time to ${period}`}
                        accessibilityRole="button"
                        accessibilityState={{ selected: reminderMeridiem === period }}
                        key={period}
                        onPress={() => setReminderMeridiem(period)}
                        style={[styles.meridiemButton, reminderMeridiem === period && styles.meridiemSelected]}
                      >
                        <Text style={[styles.meridiemText, reminderMeridiem === period && styles.meridiemSelectedText]}>{period}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.saveActions}>
                {showSave && <Pressable accessibilityLabel="Save resource" accessibilityRole="button" disabled={saving} onPress={() => { void handleSave(); }} style={[styles.save, saving && styles.disabled]}><Text style={styles.saveText}>{saving ? 'Saving…' : 'Save'}</Text></Pressable>}
                <Pressable accessibilityLabel="Set reminder" accessibilityRole="button" disabled={reminding} onPress={() => { void handleRemind(); }} style={[styles.remind, reminding && styles.disabled]}><Text style={styles.remindText}>{reminding ? 'Scheduling…' : 'Remind'}</Text></Pressable>
              </View>
              {saveMessage.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.saveMessage}>{saveMessage}</Text>}
              {reminderMessage.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.saveMessage}>{reminderMessage}</Text>}
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
  meridiemRow: { flexDirection: 'row', gap: theme.spacing.xs, marginTop: theme.spacing.xs },
  meridiemButton: { alignItems: 'center', backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderRadius: 10, borderWidth: 1, flex: 1, minHeight: 40, justifyContent: 'center' },
  meridiemSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  meridiemText: { color: theme.colors.text, fontSize: 13, fontWeight: '900' },
  meridiemSelectedText: { color: theme.colors.textInverse },
  saveActions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: 14 },
  save: { alignItems: 'center', backgroundColor: theme.colors.cta, borderRadius: 16, flex: 1, paddingHorizontal: 18, paddingVertical: 16 },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  remind: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 16, flex: 1, paddingHorizontal: 18, paddingVertical: 16 },
  remindText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: '900' },
  saveMessage: { color: theme.colors.text, fontSize: 14, fontWeight: '800', marginTop: theme.spacing.sm, textAlign: 'center' },
  disabled: { opacity: 0.6 },
});
