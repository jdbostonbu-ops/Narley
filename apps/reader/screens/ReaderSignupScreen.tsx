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
import { readerAuthStyles as styles, readerAuthTheme as theme } from "./readerAuthStyles";

export const ReaderSignupScreen = ({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) => {
  const { signup, submitting } = useReaderAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (email.trim().length === 0 || password.length === 0) {
      setError("Email and password are required");
      return;
    }

    const result = await signup(email.trim(), password);

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
            <Text accessibilityRole="header" style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>We’ll email you a six-character verification code.</Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-signup-email-label" style={styles.label}>Email</Text>
              <TextInput
                accessibilityLabel="Signup email"
                accessibilityLabelledBy="reader-signup-email-label"
                autoCapitalize="none"
                autoComplete="email"
                editable={!submitting}
                keyboardType="email-address"
                nativeID="reader-signup-email-input"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={email}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-signup-password-label" style={styles.label}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  accessibilityLabel="Signup password"
                  accessibilityLabelledBy="reader-signup-password-label"
                  autoComplete="new-password"
                  editable={!submitting}
                  nativeID="reader-signup-password-input"
                  onChangeText={setPassword}
                  onSubmitEditing={() => { void handleSignup(); }}
                  placeholder="Create a password"
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
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable accessibilityLabel="Sign up" accessibilityRole="button" disabled={submitting} onPress={() => { void handleSignup(); }} style={[styles.primaryButton, submitting && styles.disabled]}>
              {submitting ? <ActivityIndicator color={theme.colors.textInverse} /> : <Text style={styles.primaryButtonText}>Sign Up</Text>}
            </Pressable>
            <Pressable accessibilityLabel="Back to reader login" accessibilityRole="button" disabled={submitting} onPress={onBackToLogin} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Already have an account? Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
