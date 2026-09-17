import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

import { styles } from './Fab.styles';

interface Props {
  onPress: () => void;
  color?: string;
  children: React.ReactNode;
}

export default function Fab({ onPress, color = colors.primary, children }: Props) {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Adicionar"
    >
      {children}
    </TouchableOpacity>
  );
}
