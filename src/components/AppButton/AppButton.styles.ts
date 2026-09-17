import { StyleSheet } from 'react-native';

import { fontSize, radius, touchTarget } from '../../theme/typography';

export const styles = StyleSheet.create({
  base: {
    height: touchTarget,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fullWidth: { width: '100%' },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: fontSize.base, fontWeight: '600' },
});
