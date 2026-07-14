import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ResourceDetailModal } from "@/components/resource-detail-modal";
import { READER_SCREEN_INSET } from "@/constants/layout";
import {
  deleteSavedResource,
  getSavedResources,
  type SavedResourceRecord,
} from "@/api/client";
import { useReaderAuth } from "@/auth/useReaderAuth";
import { getSavedResourcesForUser } from "@/resources/getSavedResourcesForUser";
import { removeSavedResource } from "@/resources/removeSavedResource";
import { getTheme } from "@shared-ui/theme/theme";
import type { SavedResourceItem } from "../state/SavedResourcesStore";

const theme = getTheme(false);

const toSavedResourceItem = (
  record: SavedResourceRecord,
): SavedResourceItem => ({
  id: record.id,
  resourceId: record.resourceId,
  userId: record.readerId,
  title: record.title,
  category: record.category,
  address: record.address,
  latitude: record.latitude,
  longitude: record.longitude,
  notes: record.notes ?? "",
  status: record.status ?? "Saved",
  savedAt: record.savedAt,
});

export const SavedScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useReaderAuth();
  const [items, setItems] = useState<readonly SavedResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<SavedResourceItem | null>(null);

  const loadSavedResources = useCallback(async (): Promise<void> => {
    if (user === null) {
      setItems([]);
      setError("Log in to view saved resources");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const records = await getSavedResources();
      const readerItems = records.map(toSavedResourceItem);
      setItems(getSavedResourcesForUser(readerItems, user.id));
    } catch (loadError: unknown) {
      setItems([]);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load saved resources",
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      void loadSavedResources();
    }, [loadSavedResources]),
  );

  const deleteItem = async (item: SavedResourceItem): Promise<void> => {
    setDeletingId(item.id);
    setError(null);

    try {
      await deleteSavedResource(item.id);
      setItems((current) => removeSavedResource(current, item.id));
      setSelected(null);
      await loadSavedResources();
    } catch (deleteError: unknown) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete saved resource",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (item: SavedResourceItem) => {
    Alert.alert(
      "Delete saved resource?",
      `Remove ${item.title} from your saved resources?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            void deleteItem(item);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 140, paddingTop: insets.top + 24 }]}>
        <Text accessibilityRole="header" style={styles.screenTitle}>Saved</Text>
        {loading ? (
          <View accessibilityLabel="Loading saved resources" style={styles.stateCard}>
            <ActivityIndicator color={theme.colors.accent} />
            <Text style={styles.stateBody}>Loading saved resources…</Text>
          </View>
        ) : items.length > 0 ? (
          items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Pressable accessibilityHint="Opens saved resource details" accessibilityRole="button" onPress={() => setSelected(item)} style={styles.detailsButton}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.hint}>Tap for details</Text>
              </Pressable>
              <Pressable accessibilityLabel={`Delete ${item.title} from saved resources`} accessibilityRole="button" disabled={deletingId === item.id} onPress={() => confirmDelete(item)} style={[styles.delete, deletingId === item.id && styles.disabled]}>
                <Text style={styles.deleteText}>{deletingId === item.id ? "Deleting…" : "Delete"}</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.stateCard}>
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.stateBody}>{error ?? "Resources you save will appear here for quick access."}</Text>
          </View>
        )}
        {error !== null && items.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
      </ScrollView>
      <ResourceDetailModal item={selected} onClose={() => setSelected(null)} showSave={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: { paddingHorizontal: READER_SCREEN_INSET },
  screenTitle: { color: theme.colors.textInverse, fontSize: 32, fontWeight: "900", marginBottom: 18 },
  card: { ...theme.shadows.card, backgroundColor: theme.colors.background, borderRadius: 24, marginBottom: 14, padding: 16, width: "100%" },
  detailsButton: { minHeight: 44 },
  category: { color: theme.colors.primary, fontSize: 12, fontWeight: "900", marginBottom: 6 },
  title: { color: theme.colors.text, fontSize: 18, fontWeight: "900", marginBottom: 6 },
  address: { color: theme.colors.textMuted, fontSize: 14, fontWeight: "600", marginBottom: 8 },
  hint: { color: theme.colors.primary, fontSize: 13, fontWeight: "800" },
  delete: { alignSelf: "flex-start", backgroundColor: theme.colors.danger, borderRadius: 16, marginTop: 10, minHeight: 44, paddingHorizontal: 16, paddingVertical: 11 },
  deleteText: { color: theme.colors.textInverse, fontSize: 13, fontWeight: "900" },
  stateCard: { ...theme.shadows.card, alignItems: "center", backgroundColor: theme.colors.background, borderRadius: 24, padding: 24 },
  emptyTitle: { color: theme.colors.text, fontSize: 18, fontWeight: "900", marginBottom: 6 },
  stateBody: { color: theme.colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: theme.spacing.sm, textAlign: "center" },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800", marginTop: theme.spacing.sm },
  disabled: { opacity: 0.6 },
});
