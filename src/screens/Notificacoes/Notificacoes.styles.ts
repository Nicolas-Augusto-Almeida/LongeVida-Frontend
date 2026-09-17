import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  row: { flexDirection: 'row', gap: spacing.md },
  iconWrapper: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  titulo: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, flex: 1 },
  mensagem: { fontSize: fontSize.base, color: colors.mutedForeground, marginBottom: 6 },
  horario: { fontSize: fontSize.sm, color: colors.mutedForeground },
  empty: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  emptyTitle: { fontSize: fontSize.md, color: colors.mutedForeground, fontWeight: '600' },
  emptySubtitle: { fontSize: fontSize.base, color: colors.mutedForeground },
});
