import { Pressable, StyleSheet, Text, View } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";

export type ProviderCardData = {
  id: string;
  category?: string;
  status?: string;
  title: string;
  notes?: string;
  address?: string;
  metadata?: string;
  phone?: string;
  website?: string;
  expiresAt?: Date;
};

type ProviderCardProps = {
  item: ProviderCardData;
  onPress?: () => void;
  actions?: React.ReactNode;
};

const theme = getTheme(false);

export const ProviderCard = ({ item, onPress, actions }: ProviderCardProps) => (
  <Pressable
    accessibilityHint={onPress ? "Opens details" : undefined}
    accessibilityRole={onPress ? "button" : undefined}
    onPress={onPress}
    style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
  >
    {(item.category || item.status) && (
      <View style={styles.header}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    )}
    <Text style={styles.title}>{item.title}</Text>
    {!!item.notes && <Text style={styles.notes}>{item.notes}</Text>}
    {!!item.address && <Text style={styles.address}>{item.address}</Text>}
    {!!item.metadata && <Text style={styles.metadata}>{item.metadata}</Text>}
    {actions}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    ...theme.shadows.card,
    backgroundColor: theme.colors.background,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 14,
    minHeight: 44,
    padding: 16,
    width: "100%",
  },
  pressed: { opacity: 0.88 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: { color: "#B7791F", fontSize: 12, fontWeight: "900" },
  status: { color: "#0F766E", fontSize: 13, fontWeight: "900" },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  notes: {
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  address: { color: theme.colors.textMuted, fontSize: 13 },
  metadata: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },
});
