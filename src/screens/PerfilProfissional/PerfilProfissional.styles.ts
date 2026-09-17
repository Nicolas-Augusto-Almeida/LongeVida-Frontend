import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  profileHeader: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  nome: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  descricao: { fontSize: fontSize.base, color: colors.foreground, marginBottom: spacing.md, lineHeight: 26 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  listItemTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
});
