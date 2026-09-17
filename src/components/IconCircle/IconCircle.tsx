import React from 'react';
import { View } from 'react-native';

import { styles } from './IconCircle.styles';

interface Props {
  children: React.ReactNode;
  color: string;
  size?: number;
}

export default function IconCircle({ children, color, size = 64 }: Props) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      {children}
    </View>
  );
}
