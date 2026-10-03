import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  content: { padding: spacing.lg, gap: spacing.lg },
  avatarBlock: { alignItems: 'center', gap: 6, marginBottom: spacing.md },
  nome: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.sm },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  // O botão é uma coluna: alignItems controla o eixo horizontal (esquerda) e
  // justifyContent precisa continuar 'center' para o texto ficar no meio na vertical.
  leftAlignedBtn: { alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20 },
});
