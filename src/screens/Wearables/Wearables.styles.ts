import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  nome: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  marca: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 },
  sync: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.md },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: fontSize.md, color: colors.mutedForeground },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.sm },
  dadoItem: { fontSize: fontSize.base, color: colors.foreground },
});
