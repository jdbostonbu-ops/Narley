import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';
import { useSavedResources } from '../../state/SavedResourcesStore';
import { postReport } from '../api/client';
import { scheduleResourceNotification } from '../notifications/scheduleNotification';
import { scheduleReminder } from '../reminders/scheduleReminder';
import { createReport } from '../reports/createReport';
import { REPORT_REASONS, type ReportReason } from '../reports/reportReason';
import { submitReport } from '../reports/submitReport';
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
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason | ''>('');
  const [reportError, setReportError] = useState('');
  const [reportSuccess, setReportSuccess] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const closeReportForm = () => {
    setReportOpen(false);
    setReportReason('');
    setReportError('');
    setReportSuccess('');
  };

  const handleClose = () => {
    closeReportForm();
    onClose();
  };

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

  const handleSubmitReport = async () => {
    if (item === null) {
      return;
    }

    setReportError('');
    setReportSuccess('');
    const createdReport = createReport({
      resourceId: item.id,
      address: item.address,
      reason: reportReason,
    });

    if (!createdReport.ok) {
      setReportError(createdReport.error);
      return;
    }

    setReportSubmitting(true);

    try {
      const result = await submitReport(createdReport.report, {
        submit: postReport,
      });

      if (!result.ok) {
        setReportError(result.error);
        return;
      }

      setReportError('');
      setReportSuccess(result.message);
      setReportReason('');
      setReportOpen(false);
    } catch (reportError: unknown) {
      setReportSuccess('');
      setReportError(
        reportError instanceof Error
          ? reportError.message
          : 'Unable to submit report',
      );
    } finally {
      setReportSubmitting(false);
    }
  };

  return (
    <Modal animationType="fade" onRequestClose={handleClose} transparent visible={item !== null}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="Close resource details" onPress={handleClose} style={styles.backdrop} />
        {!!item && <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={theme.spacing.sm} style={styles.wrapper}>
          <View style={styles.card}>
            <Pressable accessibilityLabel="Close resource details" accessibilityRole="button" onPress={handleClose} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
            <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={styles.content} keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <Text style={styles.category}>{item.category}</Text>
              <Text accessibilityRole="header" style={styles.title}>{item.title}</Text>
              <Text style={styles.notes}>{item.notes}</Text>
              <Text style={styles.address}>{item.address}</Text>
              {!!item.phone && <View style={styles.contactBlock}>
                <Text style={styles.contactLabel}>PHONE</Text>
                <Text style={styles.contactValue}>{item.phone}</Text>
              </View>}
              {!!item.website && <View style={styles.contactBlock}>
                <Text style={styles.contactLabel}>WEBSITE</Text>
                <Text style={styles.contactValue}>{item.website}</Text>
              </View>}
              <View style={styles.actions}>
                <Pressable accessibilityLabel="Get directions to this resource" accessibilityRole="button" style={styles.primary}><Text style={styles.primaryText}>Directions</Text></Pressable>
                <Pressable accessibilityLabel="Share this resource" accessibilityRole="button" style={styles.secondary}><Text style={styles.secondaryText}>Share</Text></Pressable>
                {showReport && <Pressable
                  accessibilityLabel="Report this resource"
                  accessibilityRole="button"
                  onPress={() => {
                    setReportError('');
                    setReportSuccess('');
                    setReportOpen(true);
                  }}
                  style={styles.report}
                ><Text style={styles.reportText}>Report</Text></Pressable>}
              </View>
              {reportOpen && <View accessibilityLabel={`Report ${item.title}`} style={styles.reportForm}>
                <Text accessibilityRole="header" style={styles.reportFormTitle}>Report this resource</Text>
                <Text style={styles.reportResource}>{item.title}</Text>
                <Text style={styles.reportAddress}>{item.address}</Text>
                <Text nativeID="report-reason-label" style={styles.reportPrompt}>What needs attention?</Text>
                <View accessibilityLabelledBy="report-reason-label" style={styles.reportReasons}>
                  {REPORT_REASONS.map((reason, index) => {
                    const selected = reportReason === reason;

                    return <Pressable
                      accessibilityLabel={reason}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                      key={reason}
                      nativeID={`report-reason-${index}`}
                      onPress={() => {
                        setReportReason(reason);
                        setReportError('');
                      }}
                      style={[styles.reportReason, selected && styles.reportReasonSelected]}
                    >
                      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                        {selected && <View style={styles.radioInner} />}
                      </View>
                      <Text style={[styles.reportReasonText, selected && styles.reportReasonTextSelected]}>{reason}</Text>
                    </Pressable>;
                  })}
                </View>
                {reportError.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.reportError}>{reportError}</Text>}
                <View style={styles.reportFormActions}>
                  <Pressable accessibilityLabel="Cancel report" accessibilityRole="button" disabled={reportSubmitting} nativeID="cancel-report-button" onPress={closeReportForm} style={styles.reportCancel}><Text style={styles.reportCancelText}>Cancel</Text></Pressable>
                  <Pressable accessibilityLabel="Submit report" accessibilityRole="button" disabled={reportSubmitting} nativeID="submit-report-button" onPress={() => { void handleSubmitReport(); }} style={[styles.reportSubmit, reportSubmitting && styles.disabled]}><Text style={styles.reportSubmitText}>{reportSubmitting ? 'Submitting…' : 'Submit report'}</Text></Pressable>
                </View>
                {reportSubmitting && <Text accessibilityLiveRegion="polite" style={styles.reportWaitMessage}>This may take up to 38 seconds, please wait</Text>}
              </View>}
              {!reportOpen && reportSuccess.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.reportSuccess}>{reportSuccess}</Text>}
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
  contactBlock: { marginBottom: theme.spacing.md },
  contactLabel: { color: theme.colors.textMuted, fontSize: 12, fontWeight: '900', marginBottom: theme.spacing.xs },
  contactValue: { color: theme.colors.text, fontSize: 15, fontWeight: '700', lineHeight: 22 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  primary: { backgroundColor: theme.colors.primary, borderRadius: 20, marginTop: 10, paddingHorizontal: 28, paddingVertical: 16 },
  primaryText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  secondary: { backgroundColor: '#374151', borderRadius: 16, marginTop: 10, paddingHorizontal: 18, paddingVertical: 14 },
  secondaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  report: { backgroundColor: '#8B2E24', borderRadius: 16, marginTop: 10, paddingHorizontal: 18, paddingVertical: 14 },
  reportText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: '900' },
  reportForm: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, marginTop: theme.spacing.lg, padding: theme.spacing.md },
  reportFormTitle: { color: theme.colors.text, fontSize: 20, fontWeight: '900' },
  reportResource: { color: theme.colors.text, fontSize: 16, fontWeight: '800', marginTop: theme.spacing.sm },
  reportAddress: { color: theme.colors.textMuted, fontSize: 13, marginTop: theme.spacing.xs },
  reportPrompt: { color: theme.colors.text, fontSize: 14, fontWeight: '900', marginTop: theme.spacing.lg },
  reportReasons: { gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  reportReason: { alignItems: 'center', borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', minHeight: 50, padding: theme.spacing.sm },
  reportReasonSelected: { backgroundColor: theme.colors.background, borderColor: theme.colors.primary },
  radioOuter: { alignItems: 'center', borderColor: theme.colors.textMuted, borderRadius: 10, borderWidth: 2, height: 20, justifyContent: 'center', marginRight: theme.spacing.sm, width: 20 },
  radioOuterSelected: { borderColor: theme.colors.primary },
  radioInner: { backgroundColor: theme.colors.primary, borderRadius: 5, height: 10, width: 10 },
  reportReasonText: { color: theme.colors.text, flex: 1, fontSize: 14, lineHeight: 20 },
  reportReasonTextSelected: { fontWeight: '800' },
  reportError: { color: theme.colors.danger, fontSize: 13, fontWeight: '800', marginTop: theme.spacing.sm },
  reportSuccess: { color: theme.colors.success, fontSize: 14, fontWeight: '900', marginTop: theme.spacing.md, textAlign: 'center' },
  reportFormActions: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
  reportCancel: { alignItems: 'center', borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 48 },
  reportCancelText: { color: theme.colors.text, fontSize: 14, fontWeight: '900' },
  reportSubmit: { alignItems: 'center', backgroundColor: theme.colors.danger, borderRadius: theme.radius.md, flex: 1, justifyContent: 'center', minHeight: 48, paddingHorizontal: theme.spacing.sm },
  reportSubmitText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: '900' },
  reportWaitMessage: { color: theme.colors.textMuted, fontSize: 13, fontWeight: '700', lineHeight: 19, marginTop: theme.spacing.sm, textAlign: 'center' },
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
