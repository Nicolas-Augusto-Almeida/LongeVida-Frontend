import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

export const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 6, fontWeight: '500' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: touchTarget,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    gap: 8,
  },
  input: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  inputRowError: { borderColor: colors.destructive },
  errorText: { fontSize: fontSize.sm, color: colors.destructive, marginTop: 6 },
});
