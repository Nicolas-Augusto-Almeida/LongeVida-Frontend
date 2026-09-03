import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius } from '../../theme/typography';

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

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  medium: { paddingVertical: 8, paddingHorizontal: 16 },
  text: { fontSize: fontSize.xs, fontWeight: '600' },
});
