import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { ProviderDetailModal } from "../components/ProviderDetailModal";
import type { ProviderReportAlert } from "../src/api/client";
import { useWeatherAlerts } from "../state/WeatherAlertsStore";

const theme = getTheme(false);

type ReportAlertCardProps = {
  alert: ProviderReportAlert;
  confidenceHelpVisible: boolean;
  onDelete: () => void;
  onToggleConfidenceHelp: () => void;
};

const ReportAlertCard = ({
  alert,
  confidenceHelpVisible,
  onDelete,
  onToggleConfidenceHelp,
}: ReportAlertCardProps) => {
  const resourceLabel = alert.resourceTitle?.trim() ||
    alert.address?.trim() ||
    "Reported resource";
  const confidence = alert.confidence ?? "unknown";

  return (
    <View
      accessibilityLabel={`${resourceLabel}. AI confidence ${confidence}.`}
      style={styles.reportCard}
    >
      <View style={styles.reportHeader}>
        <Text style={styles.reportType}>AI-VERIFIED REPORT</Text>
        {alert.uncertain && <Text style={styles.uncertain}>UNCERTAIN</Text>}
      </View>
      <Text style={styles.reportTitle}>{resourceLabel}</Text>
      {alert.address !== null && alert.address !== resourceLabel && (
        <Text style={styles.reportAddress}>{alert.address}</Text>
      )}
      {alert.reason !== null && (
        <View style={styles.reportBlock}>
          <Text style={styles.reportLabel}>REPORTED ISSUE</Text>
          <Text style={styles.reportValue}>{alert.reason}</Text>
        </View>
      )}
      <View style={styles.reportBlock}>
        <Text style={styles.reportLabel}>AI FINDINGS</Text>
        <Text style={styles.reportValue}>
          {alert.findings ?? "No findings were returned."}
        </Text>
      </View>
      <View style={styles.reportBlock}>
        <Text style={styles.reportLabel}>CONFIDENCE</Text>
        <Pressable
          accessibilityHint="Shows what high, medium, and low confidence mean"
          accessibilityLabel={`Explain AI confidence levels. Current confidence ${confidence}.`}
          accessibilityRole="button"
          accessibilityState={{ expanded: confidenceHelpVisible }}
          onPress={onToggleConfidenceHelp}
          onTouchStart={(event) => event.stopPropagation()}
          style={({ pressed }) => [styles.confidenceButton, pressed && styles.confidenceButtonPressed]}
        >
          <Text style={styles.confidence}>{confidence.toLocaleUpperCase()}</Text>
        </Pressable>
        {confidenceHelpVisible && (
          <View style={styles.confidenceHelp}>
            <Text style={styles.confidenceHelpText}><Text style={styles.confidenceHelpLevel}>HIGH — </Text>Evidence was clear, or the answer is known without searching.</Text>
            <Text style={styles.confidenceHelpText}><Text style={styles.confidenceHelpLevel}>MEDIUM — </Text>Some evidence, not decisive.</Text>
            <Text style={styles.confidenceHelpText}><Text style={styles.confidenceHelpLevel}>LOW — </Text>Evidence conflicts, or{"\n"}couldn't be verified.</Text>
          </View>
        )}
      </View>
      {alert.sources.length > 0 && (
        <View style={styles.reportBlock}>
          <Text style={styles.reportLabel}>SOURCES</Text>
          {alert.sources.map((source, index) => (
            <Text key={`${alert.id}-source-${index}`} style={styles.source}>{source}</Text>
          ))}
        </View>
      )}
      <Text style={styles.createdAt}>{alert.createdAt.toLocaleString()}</Text>
      <Pressable
        accessibilityLabel="Delete AI-verified report"
        accessibilityRole="button"
        onPress={onDelete}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete report</Text>
      </Pressable>
    </View>
  );
};

export const AlertsScreen = () => {
  const {
    weatherAlerts,
    reportAlerts,
    alertCount,
    loading,
    error,
    reportsLoading,
    reportsError,
    refreshWeatherAlerts,
    refreshReportAlerts,
    deleteReportAlert,
  } = useWeatherAlerts();
  const [selectedAlert, setSelectedAlert] = useState<ProviderCardData | null>(null);
  const [confidenceHelpAlertId, setConfidenceHelpAlertId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      void Promise.all([
        refreshReportAlerts(),
        refreshWeatherAlerts(),
      ]);
    }, [refreshReportAlerts, refreshWeatherAlerts]),
  );

  const confirmDeleteReport = (alert: ProviderReportAlert) => {
    Alert.alert(
      "Delete this report?",
      "This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            void deleteReportAlert(alert.id);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        onTouchStart={() => setConfidenceHelpAlertId(null)}
      >
        <View style={styles.header}>
          <View style={styles.sectionHeader}>
            <Text accessibilityRole="header" style={styles.sectionTitle}>Your alerts</Text>
            <Text accessibilityLabel={`${alertCount} alerts`} style={styles.count}>
              {alertCount}
            </Text>
          </View>
          <Text style={styles.subtitle}>Reports and urgent changes that need your review.</Text>
        </View>

        <View style={styles.alertSection}>
          <Text accessibilityRole="header" style={styles.alertSectionTitle}>
            AI-verified reports
          </Text>
          {reportsLoading && <ActivityIndicator color={theme.colors.accent} />}
          {reportsError !== null && (
            <View style={styles.stateCard}>
              <Text accessibilityLiveRegion="polite" style={styles.error}>{reportsError}</Text>
              <Pressable
                accessibilityLabel="Retry loading provider reports"
                accessibilityRole="button"
                onPress={() => {
                  void refreshReportAlerts();
                }}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          )}
          {!reportsLoading && reportsError === null && reportAlerts.length === 0 && (
            <View style={styles.stateCard}>
              <Text style={styles.emptyTitle}>No reports yet</Text>
              <Text style={styles.emptyBody}>
                AI-verified reader reports will appear here.
              </Text>
            </View>
          )}
          {reportAlerts.map((alert) => (
            <ReportAlertCard
              alert={alert}
              confidenceHelpVisible={confidenceHelpAlertId === alert.id}
              key={alert.id}
              onDelete={() => confirmDeleteReport(alert)}
              onToggleConfidenceHelp={() => {
                setConfidenceHelpAlertId((currentId) => currentId === alert.id ? null : alert.id);
              }}
            />
          ))}
        </View>

        <View style={styles.alertSection}>
          <Text accessibilityRole="header" style={styles.alertSectionTitle}>
            Weather alerts
          </Text>
          {loading && <ActivityIndicator color={theme.colors.accent} />}
          {error !== null && (
            <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>
          )}
          {!loading && error === null && weatherAlerts.length === 0 && (
            <View style={styles.stateCard}>
              <Text style={styles.emptyTitle}>No active weather alerts</Text>
            </View>
          )}
          {weatherAlerts.map((alert) => (
            <ProviderCard
              item={alert}
              key={alert.id}
              onPress={() => setSelectedAlert(alert)}
            />
          ))}
        </View>
      </ScrollView>
      <ProviderDetailModal item={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 120, paddingHorizontal: 12, paddingTop: 18 },
  header: { marginBottom: theme.spacing.lg },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: theme.colors.textInverse,
    fontSize: 22,
    fontWeight: "900",
  },
  count: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
  subtitle: {
    color: theme.colors.textInverse,
    fontSize: 15,
    lineHeight: 21,
    marginTop: theme.spacing.sm,
  },
  alertSection: { marginBottom: theme.spacing.xl },
  alertSectionTitle: {
    color: theme.colors.textInverse,
    fontSize: 19,
    fontWeight: "900",
    marginBottom: theme.spacing.md,
  },
  reportCard: {
    ...theme.shadows.card,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  reportHeader: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  reportType: { color: theme.colors.primary, fontSize: 12, fontWeight: "900" },
  uncertain: { color: theme.colors.warning, fontSize: 12, fontWeight: "900" },
  reportTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "900" },
  reportAddress: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  reportBlock: { marginTop: theme.spacing.md },
  reportLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: theme.spacing.xs,
  },
  reportValue: { color: theme.colors.text, fontSize: 15, lineHeight: 22 },
  confidenceButton: {
    alignSelf: "flex-start",
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  confidenceButtonPressed: { opacity: 0.72 },
  confidence: { color: theme.colors.primary, fontSize: 14, fontWeight: "900" },
  confidenceHelp: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  confidenceHelpText: { color: theme.colors.text, fontSize: 14, lineHeight: 20 },
  confidenceHelpLevel: { color: theme.colors.primary, fontWeight: "900" },
  source: { color: theme.colors.cta, fontSize: 13, lineHeight: 19 },
  createdAt: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: theme.spacing.md,
  },
  deleteButton: {
    alignItems: "center",
    borderColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  deleteButtonText: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: "900",
  },
  stateCard: {
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  emptyTitle: { color: theme.colors.text, fontSize: 17, fontWeight: "900" },
  emptyBody: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginTop: theme.spacing.sm,
    textAlign: "center",
  },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800", textAlign: "center" },
  retryButton: {
    backgroundColor: theme.colors.cta,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  retryText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
});
