import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  filterChip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: radius.full, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  filterText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.foreground },
  content: { padding: spacing.lg, gap: spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrapper: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  itemNome: { fontSize: fontSize.base, fontWeight: '700', color: colors.foreground },
  itemHorario: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  itemValor: { fontSize: fontSize.base, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: fontSize.base, color: colors.mutedForeground },
});
