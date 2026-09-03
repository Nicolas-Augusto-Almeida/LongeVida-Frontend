import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  btn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
