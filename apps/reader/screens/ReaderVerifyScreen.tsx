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

import { useReaderAuth } from "../src/auth/useReaderAuth";
import { readerAuthStyles as styles, readerAuthTheme as theme } from "./readerAuthStyles";

export const ReaderVerifyScreen = () => {
  const { email, logout, submitting, verify } = useReaderAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");

    if (email === null) {
      setError("Return to signup or login to verify your email");
      return;
    }

    if (!/^[A-Z0-9]{6}$/.test(code)) {
      setError("Enter the six-character verification code");
      return;
    }

    const result = await verify(email, code);

    if (!result.ok) {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.eyebrow}>EMAIL VERIFICATION</Text>
            <Text accessibilityRole="header" style={styles.title}>Check your email</Text>
            <Text style={styles.subtitle}>Enter the six-character code emailed to {email ?? "your email address"}.</Text>

            <View style={styles.fieldGroup}>
              <Text nativeID="reader-verification-code-label" style={styles.label}>Verification code</Text>
              <TextInput
                accessibilityLabel="Verification code"
                accessibilityLabelledBy="reader-verification-code-label"
                autoCapitalize="characters"
                autoCorrect={false}
                editable={!submitting}
                maxLength={6}
                nativeID="reader-verification-code-input"
                onChangeText={(value) => setCode(value.replace(/[^A-Z0-9]/gi, "").toUpperCase())}
                onSubmitEditing={() => { void handleVerify(); }}
                placeholder="ABC123"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={code}
              />
            </View>

            <View accessibilityLiveRegion="polite" style={styles.errorArea}>
              {error.length > 0 && <Text style={styles.error}>{error}</Text>}
            </View>

            <Pressable accessibilityLabel="Verify email" accessibilityRole="button" disabled={submitting} onPress={() => { void handleVerify(); }} style={[styles.primaryButton, submitting && styles.disabled]}>
              {submitting ? <ActivityIndicator color={theme.colors.textInverse} /> : <Text style={styles.primaryButtonText}>Verify</Text>}
            </Pressable>
            <Pressable accessibilityLabel="Return to login" accessibilityRole="button" disabled={submitting} onPress={() => { void logout(); }} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Use a different account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
