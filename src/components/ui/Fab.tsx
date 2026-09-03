import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  onPress: () => void;
  color?: string;
  children: React.ReactNode;
}

export default function Fab({ onPress, color = colors.primary, children }: Props) {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Adicionar"
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
