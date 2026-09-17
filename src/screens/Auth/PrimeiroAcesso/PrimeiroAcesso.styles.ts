import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl },
  headerGroup: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
  form: { gap: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.foreground, marginBottom: 8 },
});
