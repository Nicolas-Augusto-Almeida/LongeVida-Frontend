import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';

import { styles } from './ProgressBar.styles';

interface Props {
  value: number; // 0-100
  color?: string;
}

export default function ProgressBar({ value, color = colors.primary }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: clamped }}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: color }]} />
    </View>
  );
}
