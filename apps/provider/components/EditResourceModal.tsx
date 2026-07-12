import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getTheme } from "@shared-ui/theme/theme";
import {
  type StoredResource,
  type StoredResourceChanges,
  useResourceStore,
} from "../state/ResourceStore";

type EditResourceModalProps = {
  resource: StoredResource | null;
  onClose: () => void;
};

const theme = getTheme(false);

const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
};

const maskDate = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const parseDate = (value: string): Date => {
  const digits = value.replace(/\D/g, "");

  if (digits.length !== 8) {
    return new Date(Number.NaN);
  }

  return new Date(
    Number(digits.slice(4, 8)),
    Number(digits.slice(0, 2)) - 1,
    Number(digits.slice(2, 4)),
    23,
    59,
    59,
  );
};

export const EditResourceModal = ({ resource, onClose }: EditResourceModalProps) => {
  const { updateStoredResource } = useResourceStore();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resource === null) {
      return;
    }

    setTitle(resource.title);
    setCategory(resource.category);
    setAddress(resource.address);
    setPhone(resource.phone ?? "");
    setWebsite(resource.website ?? "");
    setNotes(resource.notes);
    setExpiresAt(formatDate(resource.expiresAt));
    setError("");
  }, [resource]);

  const handleSave = async () => {
    if (resource === null) {
      return;
    }

    setSaving(true);
    setError("");

    const changes: StoredResourceChanges = {
      title: title.trim(),
      category: category.trim(),
      address: address.trim(),
      phone: phone.trim().length === 0 ? undefined : phone.trim(),
      website: website.trim().length === 0 ? undefined : website.trim(),
      notes: notes.trim(),
      expiresAt: parseDate(expiresAt),
    };
    const result = await updateStoredResource(resource.id, changes);

    if (!result.ok) {
      setError(result.error);
      setSaving(false);
      return;
    }

    setSaving(false);
    onClose();
  };

  const fields = [
    { id: "edit-title", label: "Resource name", value: title, onChangeText: setTitle },
    { id: "edit-category", label: "Category", value: category, onChangeText: setCategory },
    { id: "edit-address", label: "Address", value: address, onChangeText: setAddress },
    { id: "edit-phone", label: "Phone (optional)", value: phone, onChangeText: setPhone },
    { id: "edit-website", label: "Website (optional)", value: website, onChangeText: setWebsite },
  ] as const;

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={resource !== null}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <Pressable accessibilityLabel="Close edit resource" onPress={onClose} style={styles.backdrop} />
        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text accessibilityRole="header" style={styles.title}>Edit resource</Text>
              <Pressable accessibilityLabel="Close edit resource" accessibilityRole="button" onPress={onClose} style={styles.close}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            {fields.map((field) => (
              <View key={field.id} style={styles.group}>
                <Text nativeID={`${field.id}-label`} style={styles.label}>{field.label}</Text>
                <TextInput
                  accessibilityLabel={field.label}
                  accessibilityLabelledBy={`${field.id}-label`}
                  autoCapitalize={field.id === "edit-website" ? "none" : "sentences"}
                  editable={!saving}
                  nativeID={`${field.id}-input`}
                  onChangeText={field.onChangeText}
                  style={styles.input}
                  value={field.value}
                />
              </View>
            ))}

            <View style={styles.group}>
              <Text nativeID="edit-expiration-label" style={styles.label}>Expiration (MM/DD/YYYY)</Text>
              <TextInput
                accessibilityLabel="Expiration date"
                accessibilityLabelledBy="edit-expiration-label"
                editable={!saving}
                keyboardType="number-pad"
                nativeID="edit-expiration-input"
                onChangeText={(value) => setExpiresAt(maskDate(value))}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.input}
                value={expiresAt}
              />
            </View>

            <View style={styles.group}>
              <Text nativeID="edit-details-label" style={styles.label}>Details</Text>
              <TextInput
                accessibilityLabel="Resource details"
                accessibilityLabelledBy="edit-details-label"
                editable={!saving}
                multiline
                nativeID="edit-details-input"
                onChangeText={setNotes}
                style={[styles.input, styles.notes]}
                textAlignVertical="top"
                value={notes}
              />
            </View>

            {error.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}

            <View style={styles.actions}>
              <Pressable accessibilityLabel="Save resource changes" accessibilityRole="button" disabled={saving} onPress={handleSave} style={[styles.action, styles.save, saving && styles.disabled]}>
                <Text style={styles.actionText}>{saving ? "Saving…" : "Save"}</Text>
              </Pressable>
              <Pressable accessibilityLabel="Cancel editing" accessibilityRole="button" disabled={saving} onPress={onClose} style={[styles.action, styles.cancel]}>
                <Text style={styles.actionText}>Cancel</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.appBackground, opacity: 0.72 },
  sheet: { backgroundColor: theme.colors.appBackground, borderTopLeftRadius: theme.radius.xl, borderTopRightRadius: theme.radius.xl, maxHeight: "92%", overflow: "hidden" },
  content: { gap: 12, padding: theme.spacing.lg, paddingBottom: 300 },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  title: { color: theme.colors.textInverse, fontSize: 24, fontWeight: "900" },
  close: { alignItems: "center", backgroundColor: theme.colors.surfaceDark, borderRadius: 20, height: 40, justifyContent: "center", width: 40 },
  closeText: { color: theme.colors.textInverse, fontSize: 24, fontWeight: "900", lineHeight: 26 },
  group: { gap: 6 },
  label: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
  input: { backgroundColor: theme.colors.surfaceDark, borderRadius: 14, color: theme.colors.textInverse, fontSize: 16, padding: 14 },
  notes: { minHeight: 100 },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: theme.spacing.sm },
  action: { borderRadius: theme.radius.md, paddingHorizontal: 18, paddingVertical: 14 },
  save: { backgroundColor: theme.colors.cta },
  cancel: { backgroundColor: theme.colors.surfaceDark },
  actionText: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "900" },
  disabled: { opacity: 0.6 },
});
