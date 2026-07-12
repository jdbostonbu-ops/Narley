import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getTheme } from "@shared-ui/theme/theme";
import { useAuth } from "../src/auth/useAuth";

const theme = getTheme(false);

export const LoginScreen = () => {
  const { loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const result = await login(email.trim(), password);

    if (!result.ok) {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.title}>Provider Login</Text>
          <Text style={styles.subtitle}>Sign in to manage your organization’s resources.</Text>

          <View style={styles.fieldGroup}>
            <Text nativeID="provider-email-label" style={styles.label}>Email</Text>
            <TextInput
              accessibilityLabel="Provider email"
              accessibilityLabelledBy="provider-email-label"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
              keyboardType="email-address"
              nativeID="provider-email-input"
              onChangeText={setEmail}
              placeholder="name@organization.org"
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
              value={email}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text nativeID="provider-password-label" style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                accessibilityLabel="Provider password"
                accessibilityLabelledBy="provider-password-label"
                autoComplete="current-password"
                editable={!loading}
                nativeID="provider-password-input"
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                placeholder="Password"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={!passwordVisible}
                style={styles.passwordInput}
                value={password}
              />
              <Pressable
                accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
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

          <View accessibilityLiveRegion="polite" style={styles.errorArea}>
            {error.length > 0 && <Text style={styles.error}>{error}</Text>}
          </View>

          <Pressable
            accessibilityLabel="Log in"
            accessibilityRole="button"
            disabled={loading}
            onPress={handleLogin}
            style={[styles.loginButton, loading && styles.disabled]}
          >
            {loading
              ? <ActivityIndicator color={theme.colors.textInverse} />
              : <Text style={styles.loginButtonText}>Log In</Text>}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
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
  eyeButton: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  errorArea: { minHeight: 36 },
  error: {
    color: theme.colors.danger,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: theme.colors.cta,
    borderRadius: theme.radius.md,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
  },
  loginButtonText: {
    color: theme.colors.textInverse,
    fontSize: 16,
    fontWeight: "900",
  },
  disabled: { opacity: 0.6 },
});
