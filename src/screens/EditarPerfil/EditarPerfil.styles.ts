import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  content: { padding: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.foreground, marginBottom: 8 },
});
