import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { fontSize, spacing, radius } from '../../../theme/typography';

export const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.lg },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: fontSize.base, color: colors.foreground },
  progressValue: { fontSize: fontSize.base, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, justifyContent: 'space-between' },
  quickAction: { width: '47%', backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md, alignItems: 'center', gap: spacing.sm, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  quickActionLabel: { fontSize: fontSize.sm, fontWeight: '600', color: colors.foreground, textAlign: 'center' },
  reminderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md },
  reminderTitle: { fontSize: fontSize.base, color: colors.foreground },
  reminderTime: { fontSize: fontSize.sm, color: colors.mutedForeground },
  mutedText: { fontSize: fontSize.base, color: colors.mutedForeground },
});
