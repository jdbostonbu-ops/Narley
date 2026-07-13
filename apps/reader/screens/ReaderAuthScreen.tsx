import { useState } from "react";
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

import { useReaderAuth } from "../src/auth/useReaderAuth";
import { ReaderConfirmResetScreen } from "./ReaderConfirmResetScreen";
import { ReaderRequestResetScreen } from "./ReaderRequestResetScreen";
import { ReaderSignupScreen } from "./ReaderSignupScreen";
import { readerAuthStyles as styles, readerAuthTheme as theme } from "./readerAuthStyles";

type ReaderAuthScreenView = "login" | "signup" | "request-reset" | "confirm-reset";

export const ReaderAuthScreen = () => {
  const { login, submitting } = useReaderAuth();
  const [view, setView] = useState<ReaderAuthScreenView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  if (view === "signup") {
    return <ReaderSignupScreen onBackToLogin={() => setView("login")} />;
  }

  if (view === "request-reset") {
    return (
      <ReaderRequestResetScreen
        onBackToLogin={() => setView("login")}
        onEnterCode={() => setView("confirm-reset")}
      />
    );
  }

  if (view === "confirm-reset") {
    return (
      <ReaderConfirmResetScreen
        onBack={() => setView("request-reset")}
        onResetComplete={() => {
          setNotice("Your password has been reset. Log in with your new password.");
          setView("login");
        }}
      />
    );
  }

  const handleLogin = async () => {
    setError("");

    if (email.trim().length === 0 || password.length === 0) {
      setError("Email and password are required");
      return;
    }

    const result = await login(email.trim(), password);

    if (!result.ok) {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.eyebrow}>NARLEY READER</Text>
            <Text accessibilityRole="header" style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in to view resources, saved places, and alerts.</Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-login-email-label" style={styles.label}>Email</Text>
              <TextInput
                accessibilityLabel="Reader email"
                accessibilityLabelledBy="reader-login-email-label"
                autoCapitalize="none"
                autoComplete="email"
                editable={!submitting}
                keyboardType="email-address"
                nativeID="reader-login-email-input"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={email}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-login-password-label" style={styles.label}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  accessibilityLabel="Reader password"
                  accessibilityLabelledBy="reader-login-password-label"
                  autoComplete="current-password"
                  editable={!submitting}
                  nativeID="reader-login-password-input"
                  onChangeText={setPassword}
                  onSubmitEditing={() => { void handleLogin(); }}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.textMuted}
                  secureTextEntry={!passwordVisible}
                  style={styles.passwordInput}
                  value={password}
                />
                <Pressable
                  accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
                  accessibilityRole="button"
                  disabled={submitting}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  style={styles.eyeButton}
                >
                  <Ionicons color={theme.colors.textMuted} name={passwordVisible ? "eye-off" : "eye"} size={22} />
                </Pressable>
              </View>
            </View>

            <View accessibilityLiveRegion="polite" style={styles.errorArea}>
              {notice.length > 0 && <Text style={styles.success}>{notice}</Text>}
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable accessibilityLabel="Log in" accessibilityRole="button" disabled={submitting} onPress={() => { void handleLogin(); }} style={[styles.primaryButton, submitting && styles.disabled]}>
              {submitting ? <ActivityIndicator color={theme.colors.textInverse} /> : <Text style={styles.primaryButtonText}>Log In</Text>}
            </Pressable>
            <Pressable
              accessibilityLabel="Forgot reader password"
              accessibilityRole="button"
              disabled={submitting}
              onPress={() => {
                setNotice("");
                setView("request-reset");
              }}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Forgot password?</Text>
            </Pressable>
            <Pressable accessibilityLabel="Create a reader account" accessibilityRole="button" disabled={submitting} onPress={() => setView("signup")} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Create an account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
