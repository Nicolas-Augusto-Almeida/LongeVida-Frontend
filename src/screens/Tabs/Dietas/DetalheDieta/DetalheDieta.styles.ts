import { StyleSheet } from 'react-native';

import { colors } from '../../../../theme/colors';
import { fontSize, spacing, radius } from '../../../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginBottom: 10 },
  description: { fontSize: fontSize.base, color: colors.mutedForeground, marginVertical: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  mutedLabel: { fontSize: fontSize.xs, color: colors.mutedForeground },
  infoValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  macrosBox: { backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  macrosGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  macroCell: { alignItems: 'center', flex: 1 },
});
