import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { validatePassword } from "../../provider/src/auth/passwordPolicy";
import { postReaderConfirmReset } from "../src/api/client";
import { readerAuthStyles as styles, readerAuthTheme as theme } from "./readerAuthStyles";

type ReaderConfirmResetScreenProps = {
  onBack: () => void;
  onResetComplete: () => void;
};

export const ReaderConfirmResetScreen = ({
  onBack,
  onResetComplete,
}: ReaderConfirmResetScreenProps) => {
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
    const result = await postReaderConfirmReset(token.trim(), newPassword);
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.eyebrow}>PASSWORD RESET</Text>
            <Text accessibilityRole="header" style={styles.title}>Choose a new password</Text>
            <Text style={styles.subtitle}>
              Enter the single-use code from your email and a strong new password.
            </Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-reset-token-label" style={styles.label}>Reset code</Text>
              <TextInput
                accessibilityLabel="Reader password reset code"
                accessibilityLabelledBy="reader-reset-token-label"
                autoCapitalize="none"
                editable={!loading}
                nativeID="reader-reset-token-input"
                onChangeText={setToken}
                placeholder="Paste your reset code"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={token}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-new-password-label" style={styles.label}>New password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  accessibilityLabel="Reader new password"
                  accessibilityLabelledBy="reader-new-password-label"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  editable={!loading}
                  nativeID="reader-new-password-input"
                  onChangeText={setNewPassword}
                  onSubmitEditing={() => { void handleConfirmReset(); }}
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
              accessibilityLabel="Confirm reader password reset"
              accessibilityRole="button"
              disabled={loading}
              onPress={() => { void handleConfirmReset(); }}
              style={[styles.primaryButton, loading && styles.disabled]}
            >
              {loading
                ? <ActivityIndicator color={theme.colors.textInverse} />
                : <Text style={styles.primaryButtonText}>Reset password</Text>}
            </Pressable>

            <Pressable
              accessibilityLabel="Back to reader reset email"
              accessibilityRole="button"
              disabled={loading}
              onPress={onBack}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
