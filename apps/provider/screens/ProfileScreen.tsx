import { useRef, useState } from "react";
import { Alert, Animated, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { useAuth } from "../src/auth/useAuth";
import { useWeatherAlerts } from "../state/WeatherAlertsStore";

const theme = getTheme(false);
const FEEDBACK_URL = "https://tally.so/r/yP1q28";

export const ProfileScreen = () => {
  const { logout } = useAuth();
  const {
    weatherAlertsOn,
    setWeatherAlertsOn,
    loading: weatherAlertsLoading,
    error: weatherAlertsError,
  } = useWeatherAlerts();
  const [language, setLanguage] = useState("English");
  const [feedbackOpening, setFeedbackOpening] = useState(false);
  const feedbackScale = useRef(new Animated.Value(1)).current;

  const handleFeedback = () => {
    if (feedbackOpening) {
      return;
    }

    setFeedbackOpening(true);
    Animated.sequence([
      Animated.timing(feedbackScale, {
        duration: 100,
        toValue: 1.04,
        useNativeDriver: true,
      }),
      Animated.timing(feedbackScale, {
        duration: 100,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        setFeedbackOpening(false);
        return;
      }

      void Linking.openURL(FEEDBACK_URL)
        .catch(() => {
          Alert.alert("Unable to open feedback", "Please try again in a moment.");
        })
        .finally(() => {
          setFeedbackOpening(false);
        });
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PROVIDER ACCOUNT</Text>
          <Text accessibilityRole="header" style={styles.title}>Profile</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Organization</Text>
          <Text style={styles.primary}>Narley Provider</Text>
          <Text style={styles.secondary}>Manage your public resource information and alerts.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Preferences</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleCopy}>
              <Text style={styles.toggleLabel}>Weather alerts</Text>
              <Text style={styles.secondary}>Notifications for severe weather, shelter changes, closures, and urgent community conditions.</Text>
            </View>
            <Switch
              accessibilityLabel="Weather alerts"
              disabled={weatherAlertsLoading}
              ios_backgroundColor={theme.colors.surfaceDark}
              onValueChange={(enabled) => {
                void setWeatherAlertsOn(enabled);
              }}
              thumbColor={weatherAlertsOn ? theme.colors.accent : theme.colors.textMuted}
              trackColor={{
                false: theme.colors.surfaceDark,
                true: theme.colors.primary,
              }}
              value={weatherAlertsOn}
            />
          </View>
          {weatherAlertsError !== null && (
            <Text accessibilityLiveRegion="polite" style={styles.preferenceError}>
              {weatherAlertsError}
            </Text>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Language</Text>
          <View style={styles.languages}>
            {["English", "Español"].map((item) => (
              <Pressable key={item} onPress={() => setLanguage(item)} style={[styles.language, language === item && styles.languageSelected]}>
                <Text style={[styles.languageText, language === item && styles.languageTextSelected]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Animated.View style={{ transform: [{ scale: feedbackScale }] }}>
          <Pressable
            accessibilityHint="Opens the Narley feedback form"
            accessibilityLabel="Send feedback"
            accessibilityRole="link"
            disabled={feedbackOpening}
            onPress={handleFeedback}
            style={styles.feedback}
          >
            <Text style={styles.feedbackText}>Send feedback</Text>
          </Pressable>
        </Animated.View>
        <View style={styles.logoutCard}>
          <Text style={styles.logoutTitle}>Log out</Text>
          <Text style={styles.logoutBody}>Sign out of this provider account on this device.</Text>
          <Pressable
            accessibilityLabel="Log out of provider account"
            accessibilityRole="button"
            onPress={() => Alert.alert(
              "Log out?",
              "You will need to sign in again to manage resources.",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  style: "destructive",
                  onPress: () => {
                    void logout();
                  },
                },
              ],
            )}
            style={styles.logoutButton}
          ><Text style={styles.logoutText}>Log Out</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "#020617", flex: 1 },
  content: {
    gap: 14,
    paddingBottom: 132,
    paddingHorizontal: 8,
    paddingTop: 18,
  },
  header: { marginBottom: 4 },
  eyebrow: { color: theme.colors.accent, fontSize: 12, fontWeight: "900", marginBottom: 6 },
  title: { color: theme.colors.textInverse, fontSize: 23, fontWeight: "900" },
  card: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, padding: 24, width: "100%" },
  cardTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "900", marginBottom: 10 },
  primary: { color: theme.colors.text, fontSize: 16, fontWeight: "800", marginBottom: 6 },
  secondary: { color: "#4B5563", fontSize: 14, lineHeight: 20 },
  toggleRow: { alignItems: "center", flexDirection: "row", gap: 12, paddingVertical: 10 },
  toggleCopy: { flex: 1 },
  toggleLabel: { color: theme.colors.text, fontSize: 15, fontWeight: "900", marginBottom: 2 },
  preferenceError: {
    color: theme.colors.danger,
    fontSize: 13,
    fontWeight: "800",
    marginTop: theme.spacing.sm,
  },
  languages: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  language: { backgroundColor: theme.colors.border, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  languageSelected: { backgroundColor: "#0F766E" },
  languageText: { color: theme.colors.text, fontSize: 13, fontWeight: "900" },
  languageTextSelected: { color: theme.colors.textInverse },
  feedback: {
    ...theme.shadows.card,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    width: "100%",
  },
  feedbackText: { color: theme.colors.textInverse, fontSize: 15, fontWeight: "900" },
  logoutCard: { backgroundColor: "#2A1210", borderColor: "rgba(239,68,68,0.4)", borderRadius: 24, borderWidth: 1, padding: 24 },
  logoutTitle: { color: "#FFF7F1", fontSize: 18, fontWeight: "900", marginBottom: 6 },
  logoutBody: { color: "#FCA5A5", fontSize: 14, lineHeight: 20, marginBottom: 14 },
  logoutButton: { alignSelf: "flex-start", backgroundColor: "#8B2E24", borderRadius: 16, paddingHorizontal: 18, paddingVertical: 13 },
  logoutText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
});
