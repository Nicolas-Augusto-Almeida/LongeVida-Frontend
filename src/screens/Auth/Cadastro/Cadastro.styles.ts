import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, radius, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  headerGroup: { alignItems: 'center', marginBottom: spacing.xl, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
  form: { gap: spacing.md },

  // Perfil profissional
  profissionalToggle: { backgroundColor: colors.secondaryLight, borderRadius: radius.md, padding: spacing.md, gap: spacing.xs },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  switchLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  switchText: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground, flex: 1 },
  helperText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  profissionalBox: { gap: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  erroText: { fontSize: fontSize.sm, color: colors.destructive },
});
