import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";

const theme = getTheme(false);
const previewPost: ProviderCardData = {
  id: "sample-food-resource",
  category: "Food",
  status: "Active",
  title: "Test Food Resource",
  notes: "Community food support available during posted provider hours.",
  address: "181 State Street, New London, CT 06320",
};

export const MyPostsScreen = () => (
  <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text accessibilityRole="header" style={styles.title}>My Posts</Text>
      <ProviderCard
        item={previewPost}
        actions={(
          <View style={styles.actions}>
            <Pressable accessibilityRole="button" style={[styles.button, styles.edit]}><Text style={styles.buttonText}>Edit</Text></Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => Alert.alert("Delete resource?", "This cannot be undone.", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive" }])}
              style={[styles.button, styles.delete]}
            ><Text style={styles.buttonText}>Delete</Text></Pressable>
          </View>
        )}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 140, paddingHorizontal: 8, paddingTop: 24 },
  title: { color: theme.colors.textInverse, fontSize: 32, fontWeight: "900", marginBottom: 18 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14 },
  button: { borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
  edit: { backgroundColor: theme.colors.primary },
  delete: { backgroundColor: "#8B2E24" },
  buttonText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
});
