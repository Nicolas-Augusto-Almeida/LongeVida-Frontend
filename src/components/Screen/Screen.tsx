import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

import { styles } from './Screen.styles';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
}

// Envoltório padrão de tela: fundo cinza-claro e rolagem opcional.
export default function Screen({ children, scroll = true, contentStyle }: Props) {
  if (!scroll) {
    return <View style={styles.container}>{children}</View>;
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={contentStyle} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}
