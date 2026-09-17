import { StyleSheet } from 'react-native';

import { fontSize, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  medium: { paddingVertical: 8, paddingHorizontal: 16 },
  text: { fontSize: fontSize.xs, fontWeight: '600' },
});
