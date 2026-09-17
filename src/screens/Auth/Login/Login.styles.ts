import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  headerGroup: { alignItems: 'center', marginBottom: spacing.xl, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground },
  form: { gap: spacing.md },
});
