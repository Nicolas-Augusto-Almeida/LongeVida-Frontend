import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

import { styles } from './AppTextField.styles';

interface Props extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function AppTextField({ label, icon, multiline, numberOfLines, style, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          multiline && { height: undefined, minHeight: touchTarget, alignItems: 'flex-start', paddingVertical: 12 },
        ]}
      >
        {icon}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.mutedForeground}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[styles.input, multiline && { textAlignVertical: 'top' }, style]}
          {...rest}
        />
      </View>
    </View>
  );
}
