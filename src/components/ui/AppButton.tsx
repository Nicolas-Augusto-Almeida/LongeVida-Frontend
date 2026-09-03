import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';

type Variant = 'contained' | 'outlined' | 'text';

interface Props {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  color?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: any;
}

export default function AppButton({
  title,
  onPress,
  variant = 'contained',
  color = colors.primary,
  icon,
  disabled,
  loading,
  fullWidth = true,
  style,
}: Props) {
  const isContained = variant === 'contained';
  const isOutlined = variant === 'outlined';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        isContained && { backgroundColor: disabled ? colors.disabled : color },
        isOutlined && {
          borderWidth: 2,
          borderColor: disabled ? colors.disabled : color,
          backgroundColor: 'transparent',
        },
        variant === 'text' && { backgroundColor: 'transparent', height: 'auto', paddingVertical: 10 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isContained ? colors.white : color} />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text
            style={[
              styles.text,
              isContained && { color: colors.white },
              (isOutlined || variant === 'text') && { color: disabled ? colors.disabled : color },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: touchTarget,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fullWidth: { width: '100%' },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: fontSize.base, fontWeight: '600' },
});
