import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  dialog: { width: '100%', backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.lg },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: 10 },
  message: { fontSize: fontSize.base, color: colors.mutedForeground, marginBottom: 20 },
  actions: { flexDirection: 'row', gap: 12 },
});
