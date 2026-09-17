import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, alignItems: 'center', gap: 6 },
  statValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground },
  statLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: 'center' },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.md },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  summaryItem: { width: '47%', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md },
  mutedLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginBottom: 4 },
  summaryValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
});
