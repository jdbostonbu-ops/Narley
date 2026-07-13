import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import { postConfirmReset } from "../src/api/client";
import { validatePassword } from "../src/auth/passwordPolicy";

type ProviderConfirmResetScreenProps = {
  onBack: () => void;
  onResetComplete: () => void;
};

const theme = getTheme(false);

export const ProviderConfirmResetScreen = ({
  onBack,
  onResetComplete,
}: ProviderConfirmResetScreenProps) => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordValidation = useMemo(
    () => validatePassword(newPassword),
    [newPassword],
  );

  const handleConfirmReset = async () => {
    setError("");

    if (token.trim().length === 0) {
      setError("Enter the reset code from your email.");
      return;
    }

    if (!passwordValidation.valid) {
      setError(passwordValidation.errors.join(" "));
      return;
    }

    setLoading(true);
    const result = await postConfirmReset(token.trim(), newPassword);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onResetComplete();
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
              Choose a new password
            </Text>
            <Text style={styles.subtitle}>
              Enter the single-use code from your email and a strong new password.
            </Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="provider-reset-token-label" style={styles.label}>
                Reset code
              </Text>
              <TextInput
                accessibilityLabel="Provider password reset code"
                accessibilityLabelledBy="provider-reset-token-label"
                autoCapitalize="none"
                editable={!loading}
                nativeID="provider-reset-token-input"
                onChangeText={setToken}
                placeholder="Paste your reset code"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={token}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text nativeID="provider-new-password-label" style={styles.label}>
                New password
              </Text>
              <View style={styles.passwordRow}>
                <TextInput
                  accessibilityLabel="Provider new password"
                  accessibilityLabelledBy="provider-new-password-label"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  editable={!loading}
                  nativeID="provider-new-password-input"
                  onChangeText={setNewPassword}
                  onSubmitEditing={handleConfirmReset}
                  placeholder="New password"
                  placeholderTextColor={theme.colors.textMuted}
                  returnKeyType="done"
                  secureTextEntry={!passwordVisible}
                  style={styles.passwordInput}
                  value={newPassword}
                />
                <Pressable
                  accessibilityLabel={passwordVisible ? "Hide new password" : "Show new password"}
                  accessibilityRole="button"
                  disabled={loading}
                  hitSlop={6}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    color={theme.colors.textMuted}
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={22}
                  />
                </Pressable>
              </View>
            </View>

            <View accessibilityLiveRegion="polite" style={styles.policyCard}>
              <Text style={styles.policyTitle}>Password requirements</Text>
              {passwordValidation.valid
                ? <Text style={styles.policySuccess}>Password meets all requirements.</Text>
                : passwordValidation.errors.map((policyError) => (
                  <Text key={policyError} style={styles.policyText}>• {policyError}</Text>
                ))}
            </View>

            <View accessibilityLiveRegion="polite" style={styles.errorArea}>
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable
              accessibilityLabel="Confirm provider password reset"
              accessibilityRole="button"
              disabled={loading}
              onPress={handleConfirmReset}
              style={[styles.primaryButton, loading && styles.disabled]}
            >
              {loading
                ? <ActivityIndicator color={theme.colors.textInverse} />
                : <Text style={styles.primaryButtonText}>Reset password</Text>}
            </Pressable>

            <Pressable
              accessibilityLabel="Back to reset email"
              accessibilityRole="button"
              disabled={loading}
              onPress={onBack}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Back</Text>
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
  fieldGroup: { gap: theme.spacing.sm, marginBottom: theme.spacing.md },
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
  passwordRow: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.radius.sm,
    flexDirection: "row",
  },
  passwordInput: {
    color: theme.colors.textInverse,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eyeButton: { alignItems: "center", height: 48, justifyContent: "center", width: 48 },
  policyCard: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
  },
  policyTitle: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: theme.spacing.sm,
  },
  policyText: { color: theme.colors.textMuted, fontSize: 13, lineHeight: 20 },
  policySuccess: { color: theme.colors.success, fontSize: 13, fontWeight: "800" },
  errorArea: { minHeight: 52, paddingTop: theme.spacing.md },
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
  linkButton: { alignItems: "center", marginTop: theme.spacing.md, padding: theme.spacing.sm },
  linkText: { color: theme.colors.accent, fontSize: 15, fontWeight: "800" },
  disabled: { opacity: 0.6 },
});
