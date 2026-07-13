import { StyleSheet } from "react-native";

import { getTheme } from "@shared-ui/theme/theme";

export const readerAuthTheme = getTheme(false);

export const readerAuthStyles = StyleSheet.create({
  screen: {
    backgroundColor: readerAuthTheme.colors.appBackground,
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: readerAuthTheme.spacing.lg,
  },
  card: {
    ...readerAuthTheme.shadows.floating,
    backgroundColor: readerAuthTheme.colors.background,
    borderRadius: readerAuthTheme.radius.xl,
    padding: readerAuthTheme.spacing.lg,
  },
  eyebrow: {
    color: readerAuthTheme.colors.accent,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: readerAuthTheme.spacing.sm,
  },
  title: {
    color: readerAuthTheme.colors.text,
    fontSize: readerAuthTheme.typography.title.fontSize,
    fontWeight: readerAuthTheme.typography.title.fontWeight,
    marginBottom: readerAuthTheme.spacing.sm,
  },
  subtitle: {
    color: readerAuthTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: readerAuthTheme.spacing.lg,
  },
  fieldGroup: {
    gap: readerAuthTheme.spacing.sm,
    marginBottom: readerAuthTheme.spacing.md,
  },
  label: {
    color: readerAuthTheme.colors.text,
    fontSize: readerAuthTheme.typography.label.fontSize,
    fontWeight: readerAuthTheme.typography.label.fontWeight,
  },
  input: {
    backgroundColor: readerAuthTheme.colors.surfaceDark,
    borderRadius: readerAuthTheme.radius.sm,
    color: readerAuthTheme.colors.textInverse,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  passwordRow: {
    alignItems: "center",
    backgroundColor: readerAuthTheme.colors.surfaceDark,
    borderRadius: readerAuthTheme.radius.sm,
    flexDirection: "row",
  },
  passwordInput: {
    color: readerAuthTheme.colors.textInverse,
    flex: 1,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eyeButton: {
    alignItems: "center",
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  errorArea: {
    minHeight: 34,
  },
  error: {
    color: readerAuthTheme.colors.danger,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: readerAuthTheme.colors.cta,
    borderRadius: readerAuthTheme.radius.md,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: readerAuthTheme.spacing.md,
  },
  primaryButtonText: {
    color: readerAuthTheme.colors.textInverse,
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    alignItems: "center",
    marginTop: readerAuthTheme.spacing.md,
    minHeight: 44,
    padding: readerAuthTheme.spacing.sm,
  },
  secondaryButtonText: {
    color: readerAuthTheme.colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  disabled: {
    opacity: 0.6,
  },
});
