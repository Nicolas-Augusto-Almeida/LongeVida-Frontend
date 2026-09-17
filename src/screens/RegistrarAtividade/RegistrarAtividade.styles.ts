import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  iconRow: { alignItems: 'center' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  exercicioRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: colors.mutedForeground, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  exercicioNome: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  row: { flexDirection: 'row', gap: spacing.md },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  resumoBox: { backgroundColor: colors.secondaryLight, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg, gap: 6 },
  resumoText: { fontSize: fontSize.base, color: colors.foreground },
  bold: { fontWeight: '700' },
});
