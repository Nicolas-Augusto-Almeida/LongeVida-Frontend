import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.md },
  text: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
  error: { fontSize: fontSize.base, color: colors.destructiveDark, textAlign: 'center' },
});
