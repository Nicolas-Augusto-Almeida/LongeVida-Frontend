import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 60,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: { fontSize: fontSize.xxl, color: colors.white, fontWeight: '700', marginBottom: spacing.md },
  subtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: spacing.xl },
  spinner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: colors.white,
  },
});
