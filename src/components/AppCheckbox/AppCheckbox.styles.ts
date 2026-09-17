import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  box: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.mutedForeground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: fontSize.base, color: colors.foreground },
});
