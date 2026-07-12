import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import type { ProviderCardData } from "./ProviderCard";

type ProviderDetailModalProps = {
  item: ProviderCardData | null;
  onClose: () => void;
  children?: React.ReactNode;
};

const theme = getTheme(false);

export const ProviderDetailModal = ({ item, onClose, children }: ProviderDetailModalProps) => (
  <Modal animationType="fade" onRequestClose={onClose} transparent visible={item !== null}>
    <View style={styles.overlay}>
      <Pressable accessibilityLabel="Close details" onPress={onClose} style={styles.backdrop} />
      {!!item && (
        <View style={styles.wrapper}>
          <View style={styles.card}>
            <Pressable
              accessibilityLabel="Close details"
              accessibilityRole="button"
              hitSlop={6}
              onPress={onClose}
              style={styles.close}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
              {(item.category || item.status) && (
                <View style={styles.pills}>
                  {!!item.category && <Text style={[styles.pill, styles.category]}>{item.category}</Text>}
                  {!!item.status && <Text style={[styles.pill, styles.status]}>{item.status}</Text>}
                </View>
              )}
              <Text accessibilityRole="header" style={styles.title}>{item.title}</Text>
              {!!item.notes && (
                <View style={styles.block}>
                  <Text style={styles.label}>DETAILS</Text>
                  <Text style={styles.notes}>{item.notes}</Text>
                </View>
              )}
              {!!item.address && (
                <View style={styles.block}>
                  <Text style={styles.label}>LOCATION</Text>
                  <Text style={styles.value}>{item.address}</Text>
                </View>
              )}
              {!!item.metadata && (
                <View style={styles.block}>
                  <Text style={styles.label}>UPDATED</Text>
                  <Text style={styles.value}>{item.metadata}</Text>
                </View>
              )}
              {children}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  wrapper: { paddingBottom: 100, paddingHorizontal: 14 },
  card: {
    ...theme.shadows.floating,
    alignSelf: "stretch",
    backgroundColor: theme.colors.background,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 70,
    maxHeight: "92%",
    overflow: "hidden",
  },
  content: { padding: 24, paddingBottom: 42, paddingTop: 32 },
  close: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 19,
    height: 38,
    justifyContent: "center",
    position: "absolute",
    right: 14,
    top: 14,
    width: 38,
    zIndex: 2,
  },
  closeText: { color: theme.colors.text, fontSize: 24, fontWeight: "900", lineHeight: 26 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 14, paddingRight: 48 },
  pill: { borderRadius: 999, fontSize: 12, fontWeight: "900", overflow: "hidden", paddingHorizontal: 12, paddingVertical: 6 },
  category: { backgroundColor: "#F2E7C9", color: "#B7791F" },
  status: { backgroundColor: "#DDF7F1", color: "#0F766E" },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: "900", lineHeight: 30, marginBottom: 18, paddingRight: 34 },
  block: { marginBottom: 14 },
  label: { color: theme.colors.textMuted, fontSize: 12, fontWeight: "900", marginBottom: 4 },
  value: { color: theme.colors.text, fontSize: 15, fontWeight: "700", lineHeight: 22 },
  notes: { color: "#374151", fontSize: 15, lineHeight: 23 },
});
