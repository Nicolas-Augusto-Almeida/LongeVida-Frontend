import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

import { styles } from './FormMessage.styles';

interface Props {
  tipo: 'erro' | 'sucesso';
  children: React.ReactNode;
}

export default function FormMessage({ tipo, children }: Props) {
  const erro = tipo === 'erro';
  return (
    <View
      style={[styles.box, erro ? styles.erro : styles.sucesso]}
      accessibilityRole={erro ? 'alert' : undefined}
      accessibilityLiveRegion={erro ? 'assertive' : 'polite'}
    >
      <Feather
        name={erro ? 'alert-circle' : 'check-circle'}
        size={20}
        color={erro ? colors.destructiveDark : colors.primaryDark}
      />
      <Text style={erro ? styles.textoErro : styles.textoSucesso}>{children}</Text>
    </View>
  );
}
