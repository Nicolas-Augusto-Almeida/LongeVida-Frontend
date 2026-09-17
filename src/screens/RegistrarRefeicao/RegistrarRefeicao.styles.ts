import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  iconRow: { alignItems: 'center' },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.md },
  addRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  foodRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  foodName: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  macrosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 6 },
  macroText: { fontSize: fontSize.xs, color: colors.foreground },
  totaisBox: { backgroundColor: colors.primaryLight, borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  macrosGrid2: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'space-between' },
  totalCalorias: { fontSize: fontSize.lg, fontWeight: '700', color: colors.primary },
  totalValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
});
