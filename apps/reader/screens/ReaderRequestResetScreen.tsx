import { useState } from "react";
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

import { postReaderRequestReset } from "../src/api/client";
import { readerAuthStyles as styles, readerAuthTheme as theme } from "./readerAuthStyles";

type ReaderRequestResetScreenProps = {
  onBackToLogin: () => void;
  onEnterCode: () => void;
};

export const ReaderRequestResetScreen = ({
  onBackToLogin,
  onEnterCode,
}: ReaderRequestResetScreenProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestReset = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    const result = await postReaderRequestReset(email.trim());
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.eyebrow}>PASSWORD RESET</Text>
            <Text accessibilityRole="header" style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Enter your reader email and we’ll send a single-use reset code.
            </Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-reset-email-label" style={styles.label}>Email</Text>
              <TextInput
                accessibilityLabel="Reader reset email"
                accessibilityLabelledBy="reader-reset-email-label"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
                keyboardType="email-address"
                nativeID="reader-reset-email-input"
                onChangeText={setEmail}
                onSubmitEditing={() => { void handleRequestReset(); }}
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.textMuted}
                returnKeyType="send"
                style={styles.input}
                value={email}
              />
            </View>

            <View accessibilityLiveRegion="polite" style={styles.errorArea}>
              {message.length > 0 && <Text style={styles.success}>{message}</Text>}
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable
              accessibilityLabel="Send reader password reset email"
              accessibilityRole="button"
              disabled={loading}
              onPress={() => { void handleRequestReset(); }}
              style={[styles.primaryButton, loading && styles.disabled]}
            >
              {loading
                ? <ActivityIndicator color={theme.colors.textInverse} />
                : <Text style={styles.primaryButtonText}>Send reset email</Text>}
            </Pressable>

            {message.length > 0 && (
              <Pressable
                accessibilityLabel="Enter reader password reset code"
                accessibilityRole="button"
                onPress={onEnterCode}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>Enter reset code</Text>
              </Pressable>
            )}

            <Pressable
              accessibilityLabel="Back to reader login"
              accessibilityRole="button"
              disabled={loading}
              onPress={onBackToLogin}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Back to login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
