import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/typography';

import { styles } from './AppCheckbox.styles';

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
  color?: string;
}

export default function AppCheckbox({ label, checked, onToggle, color = colors.primary }: Props) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onToggle}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
    >
      <View style={[styles.box, checked && { backgroundColor: color, borderColor: color }]}>
        {checked && <Feather name="check" size={20} color={colors.white} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
