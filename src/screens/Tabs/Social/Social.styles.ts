import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

export const styles = StyleSheet.create({
  header: { backgroundColor: colors.secondary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.md },
  profRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  actions: { flexDirection: 'row', gap: spacing.sm },
});
