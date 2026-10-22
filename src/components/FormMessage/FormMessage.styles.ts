import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius } from '../../theme/typography';

export const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: radius.md },
  sucesso: { backgroundColor: colors.primaryLight },
  erro: { backgroundColor: 'rgba(244, 67, 54, 0.10)' },
  textoSucesso: { flex: 1, color: colors.primaryDark, fontSize: fontSize.sm },
  textoErro: { flex: 1, color: colors.destructiveDark, fontSize: fontSize.sm },
});
