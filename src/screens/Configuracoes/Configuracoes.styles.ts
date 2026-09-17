import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { fontSize: fontSize.base, color: colors.foreground },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  fieldLabel: { fontSize: fontSize.base, color: colors.foreground },
  mutedText: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 24 },
});
