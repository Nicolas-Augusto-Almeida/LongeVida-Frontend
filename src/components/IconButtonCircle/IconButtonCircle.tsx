import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './IconButtonCircle.styles';

interface Props {
  onPress?: () => void;
  color: string;
  children: React.ReactNode;
  accessibilityLabel: string;
}

export default function IconButtonCircle({ onPress, color, children, accessibilityLabel }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </TouchableOpacity>
  );
}
