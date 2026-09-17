import { StyleSheet } from 'react-native';

import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginBottom: 10 },
  objetivoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: spacing.md },
  mutedText: { fontSize: fontSize.base, color: colors.mutedForeground },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.md },
  exercicioNome: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  row: { flexDirection: 'row', gap: spacing.md },
});
