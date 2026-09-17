import React from 'react';
import { Switch, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  value: boolean;
  onValueChange: (v: boolean) => void;
  color?: string;
}

export default function AppSwitch({ value, onValueChange, color = colors.primary }: Props) {
  return (
    <View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: color }}
        thumbColor={colors.white}
        accessibilityRole="switch"
      />
    </View>
  );
}
