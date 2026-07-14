import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { postProviderReport } from "../src/api/client";
import type { ProviderCardData } from "./ProviderCard";

type ProviderReportModalProps = {
  resource: ProviderCardData | null;
  onClose: () => void;
};

const theme = getTheme(false);

export const ProviderReportModal = ({ resource, onClose }: ProviderReportModalProps) => {
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    if (resource !== null) {
      setDetails("");
      setMessage(null);
      setSucceeded(false);
    }
  }, [resource]);

  const handleSubmit = async () => {
    if (resource === null) {
      return;
    }

    setSubmitting(true);
    setMessage(null);

    const result = await postProviderReport({
      resourceTitle: resource.title,
      address: resource.address ?? "",
      details,
      ...(resource.phone === undefined ? {} : { phone: resource.phone }),
      ...(resource.website === undefined ? {} : { website: resource.website }),
    });

    setSubmitting(false);
    setSucceeded(result.ok);
    setMessage(result.ok ? "Your report was sent to Narley." : result.error);
  };

  return (
    <Modal animationType="slide" onRequestClose={onClose} visible={resource !== null}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.screen}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.content}
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.eyebrow}>REPORT TO NARLEY</Text>
          <Text accessibilityRole="header" style={styles.title}>Report a problem resource</Text>
          <Text style={styles.intro}>
            Review the resource information, then explain what Narley should investigate.
          </Text>

          <View style={styles.resourceCard}>
            <Text style={styles.resourceLabel}>RESOURCE</Text>
            <Text style={styles.resourceTitle}>{resource?.title ?? ""}</Text>
            <Text style={styles.resourceValue}>{resource?.address ?? "Address unavailable"}</Text>
            <Text style={styles.resourceValue}>{resource?.phone ?? "Phone not provided"}</Text>
            <Text style={styles.resourceValue}>{resource?.website ?? "Website not provided"}</Text>
          </View>

          <Text nativeID="report-details-label" style={styles.label}>What is wrong?</Text>
          <TextInput
            accessibilityLabel="What is wrong with this resource?"
            accessibilityLabelledBy="report-details-label"
            editable={!submitting && !succeeded}
            multiline
            nativeID="report-details-input"
            onChangeText={setDetails}
            placeholder="Describe the incorrect or outdated information"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.detailsInput}
            textAlignVertical="top"
            value={details}
          />
          <Text style={styles.help}>Maximum 500 words.</Text>

          {message !== null && (
            <Text
              accessibilityLiveRegion="polite"
              style={succeeded ? styles.success : styles.error}
            >
              {message}
            </Text>
          )}

          {!succeeded && (
            <Pressable
              accessibilityLabel="Send report to Narley"
              accessibilityRole="button"
              disabled={submitting}
              onPress={() => {
                void handleSubmit();
              }}
              style={[styles.submitButton, submitting && styles.disabledButton]}
            >
              {submitting
                ? <ActivityIndicator color={theme.colors.textInverse} />
                : <Text style={styles.submitButtonText}>Send report to Narley</Text>}
            </Pressable>
          )}
          <Pressable
            accessibilityLabel={succeeded ? "Close report confirmation" : "Cancel report"}
            accessibilityRole="button"
            disabled={submitting}
            onPress={onClose}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>{succeeded ? "Close" : "Cancel"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { padding: theme.spacing.lg, paddingBottom: 300 },
  eyebrow: { color: theme.colors.accent, fontSize: 12, fontWeight: "900", marginBottom: theme.spacing.xs },
  title: { color: theme.colors.textInverse, fontSize: 26, fontWeight: "900", marginBottom: theme.spacing.sm },
  intro: { color: theme.colors.textInverse, fontSize: 15, lineHeight: 22, marginBottom: theme.spacing.lg },
  resourceCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, marginBottom: theme.spacing.lg, padding: theme.spacing.md },
  resourceLabel: { color: theme.colors.textMuted, fontSize: 12, fontWeight: "900", marginBottom: theme.spacing.xs },
  resourceTitle: { color: theme.colors.text, fontSize: 19, fontWeight: "900", marginBottom: theme.spacing.sm },
  resourceValue: { color: theme.colors.text, fontSize: 14, lineHeight: 21 },
  label: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "800", marginBottom: theme.spacing.xs },
  detailsInput: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 16,
    minHeight: 160,
    padding: theme.spacing.md,
  },
  help: { color: theme.colors.textInverse, fontSize: 13, marginBottom: theme.spacing.md, marginTop: theme.spacing.xs },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800", marginBottom: theme.spacing.md },
  success: { color: theme.colors.success, fontSize: 15, fontWeight: "800", marginBottom: theme.spacing.md },
  submitButton: { alignItems: "center", backgroundColor: theme.colors.cta, borderRadius: theme.radius.md, justifyContent: "center", minHeight: 54, padding: theme.spacing.md },
  disabledButton: { opacity: 0.65 },
  submitButtonText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: "900" },
  cancelButton: { alignItems: "center", justifyContent: "center", marginTop: theme.spacing.sm, minHeight: 52 },
  cancelButtonText: { color: theme.colors.textInverse, fontSize: 15, fontWeight: "800" },
});
