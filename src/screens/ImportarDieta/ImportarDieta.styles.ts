import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.md, textAlign: 'center' },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.background, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginTop: spacing.md },
  infoText: { fontSize: fontSize.base, fontWeight: '700', color: colors.foreground },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: 'center', marginTop: spacing.md, lineHeight: 22 },
});
