import { StyleSheet } from 'react-native';

import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  switchText: { fontSize: fontSize.base, color: colors.foreground },
  actions: { gap: spacing.sm },
});
