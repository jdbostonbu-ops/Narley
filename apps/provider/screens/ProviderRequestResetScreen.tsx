import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTheme } from "@shared-ui/theme/theme";
import { postRequestReset } from "../src/api/client";

type ProviderRequestResetScreenProps = {
  onBackToLogin: () => void;
  onEnterCode: () => void;
};

const theme = getTheme(false);

export const ProviderRequestResetScreen = ({
  onBackToLogin,
  onEnterCode,
}: ProviderRequestResetScreenProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestReset = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    const result = await postRequestReset(email.trim());

    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(`${result.message} Check your email for the code.`);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text accessibilityRole="header" style={styles.title}>
              Reset provider password
            </Text>
            <Text style={styles.subtitle}>
              Enter your provider email and we’ll send a single-use reset code.
            </Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="provider-reset-email-label" style={styles.label}>
                Email
              </Text>
              <TextInput
                accessibilityLabel="Provider reset email"
                accessibilityLabelledBy="provider-reset-email-label"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
                keyboardType="email-address"
                nativeID="provider-reset-email-input"
                onChangeText={setEmail}
                onSubmitEditing={handleRequestReset}
                placeholder="name@organization.org"
                placeholderTextColor={theme.colors.textMuted}
                returnKeyType="send"
                style={styles.input}
                value={email}
              />
            </View>

            <View accessibilityLiveRegion="polite" style={styles.messageArea}>
              {message.length > 0 && <Text style={styles.success}>{message}</Text>}
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable
              accessibilityLabel="Send reset email"
              accessibilityRole="button"
              disabled={loading}
              onPress={handleRequestReset}
              style={[styles.primaryButton, loading && styles.disabled]}
            >
              {loading
                ? <ActivityIndicator color={theme.colors.textInverse} />
                : <Text style={styles.primaryButtonText}>Send reset email</Text>}
            </Pressable>

            {message.length > 0 && (
              <Pressable
                accessibilityLabel="Enter reset code"
                accessibilityRole="button"
                onPress={onEnterCode}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Enter reset code</Text>
              </Pressable>
            )}

            <Pressable
              accessibilityLabel="Back to provider login"
              accessibilityRole="button"
              disabled={loading}
              onPress={onBackToLogin}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Back to login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  card: {
    ...theme.shadows.floating,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
  },
  title: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textInverse,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
    opacity: 0.78,
  },
  fieldGroup: { gap: theme.spacing.sm },
  label: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.label.fontSize,
    fontWeight: theme.typography.label.fontWeight,
  },
  input: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.radius.sm,
    color: theme.colors.textInverse,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  messageArea: { minHeight: 64, paddingTop: theme.spacing.md },
  success: { color: theme.colors.success, fontSize: 14, fontWeight: "800", lineHeight: 20 },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800", lineHeight: 20 },
  primaryButton: {
    alignItems: "center",
    backgroundColor: theme.colors.cta,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: theme.spacing.md,
  },
  primaryButtonText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: "900" },
  secondaryButton: {
    alignItems: "center",
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    justifyContent: "center",
    marginTop: theme.spacing.md,
    minHeight: 48,
  },
  secondaryButtonText: { color: theme.colors.textInverse, fontSize: 15, fontWeight: "900" },
  linkButton: { alignItems: "center", marginTop: theme.spacing.lg, padding: theme.spacing.sm },
  linkText: { color: theme.colors.accent, fontSize: 15, fontWeight: "800" },
  disabled: { opacity: 0.6 },
});
