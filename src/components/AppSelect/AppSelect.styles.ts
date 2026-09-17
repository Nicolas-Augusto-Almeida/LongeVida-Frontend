import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

export const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 6, fontWeight: '500' },
  field: {
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
  value: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, maxHeight: '60%', padding: 16 },
  sheetTitle: { fontSize: fontSize.md, fontWeight: '700', marginBottom: 12, color: colors.foreground },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: { fontSize: fontSize.base, color: colors.foreground },
});
