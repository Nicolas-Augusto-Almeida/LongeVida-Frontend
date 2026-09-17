import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 56,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12, alignSelf: 'flex-start' },
  backText: { color: colors.white, fontSize: fontSize.sm, fontWeight: '600' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.white },
  subtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
});
