import { useState } from "react";
import * as Location from "expo-location";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { getTheme } from "@shared-ui/theme/theme";
import { geocodeAddress } from "../src/resources/geocodeAddress";
import { normalizePhone } from "../src/resources/normalizePhone";
import { useAuth } from "../src/auth/useAuth";
import { useResourceStore } from "../state/ResourceStore";

const theme = getTheme(false);
const categories = ["Food Bank", "Soup Kitchen", "Charging Station", "Shelter"] as const;
const CUSTOM_CATEGORY = "+ Custom";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export const PostResourceScreen = () => {
  const { addResource } = useResourceStore();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [expiresAt, setExpiresAt] = useState("");
  const [phone, setPhone] = useState("");
  const [normalizedPhone, setNormalizedPhone] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"error" | "success" | null>(null);
  const [isPinning, setIsPinning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const category = selectedCategory === CUSTOM_CATEGORY
    ? customCategory.trim()
    : selectedCategory;

  const showError = (error: string) => {
    setMessageKind("error");
    setMessage(error);
  };

  const handlePhoneBlur = () => {
    if (phone.trim().length === 0) {
      setNormalizedPhone(null);
      return;
    }

    const result = normalizePhone(phone.trim());
    setNormalizedPhone(result.ok ? result.value : null);

    if (!result.ok) {
      showError("Phone must contain exactly 10 digits.");
    }
  };

  const handleExpirationChange = (value: string) => {
    const deletingAutoInsertedSlash =
      value.length < expiresAt.length &&
      expiresAt.endsWith("/") &&
      value === expiresAt.slice(0, -1);
    const inputDigits = value.replace(/\D/g, "").slice(0, 8);
    const digits = deletingAutoInsertedSlash
      ? inputDigits.slice(0, -1)
      : inputDigits;

    if (digits.length < 2) {
      setExpiresAt(digits);
      return;
    }

    if (digits.length < 4) {
      setExpiresAt(`${digits.slice(0, 2)}/${digits.slice(2)}`);
      return;
    }

    setExpiresAt(
      `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`,
    );
  };

  const handlePinAddress = async () => {
    setIsPinning(true);
    setMessage("");
    setMessageKind(null);

    if (address.trim().length === 0) {
      showError("Invalid address");
      setIsPinning(false);
      return;
    }

    if (Platform.OS === "android") {
      const currentPermission = await Location.getForegroundPermissionsAsync();
      const permission = currentPermission.status === "granted"
        ? currentPermission
        : await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        showError("Location permission is required to pin this address.");
        setIsPinning(false);
        return;
      }
    }

    const result = await geocodeAddress(address.trim(), {
      geocode: async (value) => {
        const locations = await Location.geocodeAsync(value);
        const firstLocation = locations[0];

        return firstLocation === undefined
          ? null
          : {
              latitude: firstLocation.latitude,
              longitude: firstLocation.longitude,
            };
      },
    });

    if (!result.ok) {
      setCoordinates(null);
      showError(result.error ?? "Invalid address");
      setIsPinning(false);
      return;
    }

    setCoordinates({ latitude: result.latitude, longitude: result.longitude });
    setMessageKind("success");
    setMessage("Address pinned successfully.");
    setIsPinning(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage("");
    setMessageKind(null);

    let phoneForResource: string | undefined;

    if (phone.trim().length > 0) {
      const phoneResult = normalizedPhone === null
        ? normalizePhone(phone.trim())
        : { ok: true as const, value: normalizedPhone };

      if (!phoneResult.ok) {
        showError("Phone must contain exactly 10 digits.");
        setIsSubmitting(false);
        return;
      }

      phoneForResource = phoneResult.value;
      setNormalizedPhone(phoneResult.value);
    }

    const expirationDigits = expiresAt.replace(/\D/g, "");
    const expiration = expirationDigits.length === 8
      ? new Date(
          Number(expirationDigits.slice(4, 8)),
          Number(expirationDigits.slice(0, 2)) - 1,
          Number(expirationDigits.slice(2, 4)),
          23,
          59,
          59,
        )
      : new Date(Number.NaN);

    if (coordinates === null) {
      showError("Resource location requires a pinned address.");
      setIsSubmitting(false);
      return;
    }

    const result = await addResource({
      title: title.trim(),
      category,
      address: address.trim(),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      expiresAt: expiration,
      notes: details.trim(),
      providerId: user?.id ?? "user_jacq",
      ...(phoneForResource === undefined ? {} : { phone: phoneForResource }),
      ...(website.trim().length === 0 ? {} : { website: website.trim() }),
    });

    if (!result.ok) {
      showError(result.error);
      setIsSubmitting(false);
      return;
    }

    setMessageKind("success");
    setMessage("Resource submitted successfully.");
    setIsSubmitting(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={styles.title}>Post a resource</Text>

        <View style={styles.group}>
          <Text nativeID="resource-name-label" style={styles.label}>Resource name</Text>
          <TextInput
            accessibilityLabel="Resource name"
            accessibilityLabelledBy="resource-name-label"
            nativeID="resource-name-input"
            onChangeText={setTitle}
            placeholder="Name"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            value={title}
          />
        </View>

        <View style={styles.group}>
          <Text nativeID="resource-category-label" style={styles.label}>Category</Text>
          <View accessibilityLabelledBy="resource-category-label" style={styles.chips}>
            {[...categories, CUSTOM_CATEGORY].map((item) => (
              <Pressable
                accessibilityRole="button"
                key={item}
                onPress={() => setSelectedCategory(item)}
                style={[styles.chip, selectedCategory === item && styles.chipSelected]}
              >
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
          {selectedCategory === CUSTOM_CATEGORY && (
            <TextInput
              accessibilityLabel="Custom category"
              nativeID="custom-category-input"
              onChangeText={setCustomCategory}
              placeholder="Enter category"
              placeholderTextColor={theme.colors.textMuted}
              style={styles.input}
              value={customCategory}
            />
          )}
        </View>

        <View style={styles.group}>
          <Text nativeID="resource-address-label" style={styles.label}>Address</Text>
          <View style={styles.addressRow}>
            <TextInput
              accessibilityLabel="Resource address"
              accessibilityLabelledBy="resource-address-label"
              nativeID="resource-address-input"
              onChangeText={(value) => {
                setAddress(value);
                setCoordinates(null);
              }}
              placeholder="Street, city, state, ZIP"
              placeholderTextColor={theme.colors.textMuted}
              style={[styles.input, styles.addressInput]}
              value={address}
            />
            <Pressable
              accessibilityLabel="Pin resource address"
              accessibilityRole="button"
              disabled={isPinning}
              onPress={handlePinAddress}
              style={[styles.locationButton, isPinning && styles.disabled]}
            >
              <Text style={styles.locationText}>{isPinning ? "Pinning…" : "Pin Address"}</Text>
            </Pressable>
          </View>
          <Text style={styles.helper}>Use the complete public address shown to readers.</Text>
        </View>

        {coordinates !== null && (
          <View style={styles.previewMapCard}>
            <MapView
              accessibilityLabel="Preview of pinned resource address"
              region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}
              style={styles.previewMap}
            >
              <Marker coordinate={coordinates} title={title.trim() || "New resource"} />
            </MapView>
          </View>
        )}

        <View style={styles.group}>
          <Text nativeID="resource-expiration-label" style={styles.label}>Expiration date (MM/DD/YYYY)</Text>
          <TextInput
            accessibilityLabel="Resource expiration date"
            accessibilityLabelledBy="resource-expiration-label"
            keyboardType="number-pad"
            nativeID="resource-expiration-input"
            onChangeText={handleExpirationChange}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            value={expiresAt}
          />
          <Text style={styles.helper}>Required. Choose a future date within one year.</Text>
        </View>

        <View style={styles.group}>
          <Text nativeID="resource-phone-label" style={styles.label}>Phone (optional)</Text>
          <TextInput
            accessibilityLabel="Resource phone number"
            accessibilityLabelledBy="resource-phone-label"
            keyboardType="phone-pad"
            nativeID="resource-phone-input"
            onBlur={handlePhoneBlur}
            onChangeText={(value) => {
              setPhone(value);
              setNormalizedPhone(null);
            }}
            placeholder="10-digit phone number"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            value={normalizedPhone ?? phone}
          />
        </View>

        <View style={styles.group}>
          <Text nativeID="resource-website-label" style={styles.label}>Website (optional)</Text>
          <TextInput
            accessibilityLabel="Resource website"
            accessibilityLabelledBy="resource-website-label"
            autoCapitalize="none"
            keyboardType="url"
            nativeID="resource-website-input"
            onChangeText={setWebsite}
            placeholder="https://example.org"
            placeholderTextColor={theme.colors.textMuted}
            style={styles.input}
            value={website}
          />
        </View>

        <View style={styles.group}>
          <Text nativeID="resource-details-label" style={styles.label}>Details</Text>
          <TextInput
            accessibilityLabel="Resource details"
            accessibilityLabelledBy="resource-details-label"
            multiline
            nativeID="resource-details-input"
            onChangeText={setDetails}
            placeholder="Hours, eligibility, and availability"
            placeholderTextColor={theme.colors.textMuted}
            style={[styles.input, styles.notes]}
            textAlignVertical="top"
            value={details}
          />
        </View>

        {message.length > 0 && (
          <Text
            accessibilityLiveRegion="polite"
            style={messageKind === "success" ? styles.success : styles.error}
          >
            {message}
          </Text>
        )}

        <Pressable
          accessibilityLabel="Submit resource"
          accessibilityRole="button"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={[styles.submit, isSubmitting && styles.disabled]}
        >
          <Text style={styles.submitText}>{isSubmitting ? "Submitting…" : "Submit resource"}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.appBackground, flex: 1 },
  content: {
    gap: theme.spacing.md,
    paddingBottom: 120,
    paddingHorizontal: theme.spacing.sm,
    paddingTop: theme.spacing.md,
  },
  title: {
    color: theme.colors.textInverse,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: theme.spacing.xs,
  },
  group: { gap: 6 },
  label: { color: theme.colors.textInverse, fontSize: 14, fontWeight: "800" },
  input: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: 14,
    color: theme.colors.textInverse,
    fontSize: 16,
    padding: 14,
    width: "100%",
  },
  addressRow: { flexDirection: "row", gap: 10, width: "100%" },
  addressInput: { flex: 1, width: undefined },
  locationButton: {
    alignItems: "center",
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 14,
    justifyContent: "center",
    minWidth: 112,
    padding: 14,
  },
  locationText: { color: theme.colors.textInverse, fontWeight: "800" },
  helper: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm },
  chip: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: theme.radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: { backgroundColor: theme.colors.cta },
  chipText: { color: theme.colors.textInverse, fontWeight: "700" },
  previewMapCard: {
    borderRadius: theme.radius.xl,
    height: 220,
    overflow: "hidden",
    width: "100%",
  },
  previewMap: { flex: 1 },
  notes: { minHeight: 100 },
  success: { color: theme.colors.success, fontSize: 14, fontWeight: "800" },
  error: { color: theme.colors.danger, fontSize: 14, fontWeight: "800" },
  submit: {
    alignItems: "center",
    backgroundColor: theme.colors.cta,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    width: "100%",
  },
  submitText: { color: theme.colors.textInverse, fontSize: 16, fontWeight: "900" },
  disabled: { opacity: 0.6 },
});
