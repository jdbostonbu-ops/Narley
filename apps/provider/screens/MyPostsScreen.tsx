import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { useResourceStore } from "../state/ResourceStore";

const theme = getTheme(false);

export const MyPostsScreen = () => {
  const { removeResource, resources } = useResourceStore();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>My Posts</Text>
        {resources.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyBody}>Resources you create from the Post screen will appear here.</Text>
          </View>
        ) : resources.map((resource) => {
          const item: ProviderCardData = resource;

          return (
            <ProviderCard
              actions={(
                <View style={styles.actions}>
                  <Pressable accessibilityLabel={`Edit ${resource.title}`} accessibilityRole="button" style={[styles.button, styles.edit]}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    accessibilityLabel={`Delete ${resource.title}`}
                    accessibilityRole="button"
                    onPress={() => Alert.alert(
                      "Delete resource?",
                      "This cannot be undone.",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => removeResource(resource.id),
                        },
                      ],
                    )}
                    style={[styles.button, styles.delete]}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </View>
              )}
              item={item}
              key={resource.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingBottom: 140, paddingHorizontal: 8, paddingTop: 24 },
  title: {
    color: theme.colors.textInverse,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 18,
  },
  emptyCard: {
    ...theme.shadows.card,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    width: "100%",
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: theme.spacing.sm,
  },
  emptyBody: { color: theme.colors.textMuted, fontSize: 15, lineHeight: 22 },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  button: {
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  edit: { backgroundColor: theme.colors.primary },
  delete: { backgroundColor: theme.colors.danger },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: 14,
    fontWeight: "900",
  },
});
