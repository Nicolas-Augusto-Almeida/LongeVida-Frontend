import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius } from '../../theme/typography';

import { styles } from './AppChip.styles';

interface Props {
  label: string;
  color?: string;
  textColor?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export default function AppChip({ label, color = colors.secondary, textColor = colors.white, icon, size = 'small' }: Props) {
  return (
    <View style={[styles.chip, { backgroundColor: color }, size === 'medium' && styles.medium]}>
      {icon}
      <Text style={[styles.text, { color: textColor }, size === 'medium' && { fontSize: fontSize.base }]}>{label}</Text>
    </View>
  );
}
