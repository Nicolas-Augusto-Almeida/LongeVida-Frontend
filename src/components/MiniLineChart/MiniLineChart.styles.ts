import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/typography';

export const styles = StyleSheet.create({
  legend: { flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { fontSize: fontSize.xs, color: colors.mutedForeground },
});
