import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import { EditResourceModal } from "../components/EditResourceModal";
import { ProviderCard, type ProviderCardData } from "../components/ProviderCard";
import { ProviderDetailModal } from "../components/ProviderDetailModal";
import { type StoredResource, useResourceStore } from "../state/ResourceStore";

const theme = getTheme(false);

export const MyPostsScreen = () => {
  const { removeResource, resources } = useResourceStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<StoredResource | null>(null);
  const selectedResource = resources.find(({ id }) => id === selectedId) ?? null;

  const confirmDelete = (resource: StoredResource) => {
    Alert.alert(
      "Delete resource?",
      "This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeResource(resource.id);
            setSelectedId(null);
          },
        },
      ],
    );
  };

  const openEdit = (resource: StoredResource) => {
    setSelectedId(null);
    setEditingResource(resource);
  };

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
              item={item}
              key={resource.id}
              onPress={() => setSelectedId(resource.id)}
            />
          );
        })}
      </ScrollView>

      <ProviderDetailModal
        item={selectedResource}
        onClose={() => setSelectedId(null)}
      >
        {selectedResource !== null && (
          <View style={styles.actions}>
            <Pressable
              accessibilityLabel={`Edit ${selectedResource.title}`}
              accessibilityRole="button"
              onPress={() => openEdit(selectedResource)}
              style={[styles.button, styles.edit]}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable
              accessibilityLabel={`Delete ${selectedResource.title}`}
              accessibilityRole="button"
              onPress={() => confirmDelete(selectedResource)}
              style={[styles.button, styles.delete]}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      </ProviderDetailModal>

      <EditResourceModal
        onClose={() => setEditingResource(null)}
        resource={editingResource}
      />
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
    marginTop: theme.spacing.sm,
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
