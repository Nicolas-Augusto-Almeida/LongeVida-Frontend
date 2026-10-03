import { StyleSheet } from 'react-native';

import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  switchText: { fontSize: fontSize.base, color: colors.foreground },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  exerciciosHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  mutedCenter: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center', paddingVertical: spacing.lg },
  exercicioHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  exercicioTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  rowGap: { flexDirection: 'row', gap: spacing.md },
  actions: { gap: spacing.sm },
});
