import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

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

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 6, fontWeight: '500' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: touchTarget,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    gap: 8,
  },
  input: { flex: 1, fontSize: fontSize.base, color: colors.foreground },
});
