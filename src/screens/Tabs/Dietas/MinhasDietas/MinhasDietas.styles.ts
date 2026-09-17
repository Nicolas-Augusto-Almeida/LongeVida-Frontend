import { StyleSheet } from 'react-native';

import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';

export const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.md },
  cardTop: { flexDirection: 'row', marginBottom: spacing.sm },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  infoBlock: { gap: spacing.sm, marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: fontSize.base, color: colors.foreground },
  macrosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  macroText: { fontSize: fontSize.xs, color: colors.mutedForeground },
  actions: { flexDirection: 'row', gap: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyTitle: { fontSize: fontSize.md, color: colors.mutedForeground, textAlign: 'center' },
  emptySubtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 8, textAlign: 'center' },
});
