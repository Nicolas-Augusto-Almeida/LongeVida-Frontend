import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.md, textAlign: 'center' },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 4 },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: 'center', marginTop: spacing.md, lineHeight: 22 },
});
