import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, radius, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  header: { backgroundColor: colors.secondary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.md },
  profRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  actions: { flexDirection: 'row', gap: spacing.sm },

  // Pesquisa e filtros
  filtrosBox: { gap: spacing.md },
  filtroLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.mutedForeground, marginBottom: 6 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  filtroChip: { minHeight: 44, paddingHorizontal: 16, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  filtroChipAtivo: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  filtroChipText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.foreground },
  filtroChipTextAtivo: { color: colors.white },
  resultadoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resultadoText: { fontSize: fontSize.sm, color: colors.mutedForeground, flex: 1 },
  empty: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  emptyTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, textAlign: 'center' },
  emptySubtitle: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
});
