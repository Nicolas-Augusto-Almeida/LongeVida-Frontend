import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";
import { fontSize, spacing } from "../../theme/typography";

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.foreground,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: { fontSize: fontSize.base, color: colors.foreground },
  lembreteItem: {
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  lembreteTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  lembreteTitulo: { flex: 1, minWidth: 0 },
  horarioBox: { width: 170 },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  fieldLabel: { fontSize: fontSize.base, color: colors.foreground },
  mutedText: {
    fontSize: fontSize.base,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: 24,
  },
});
