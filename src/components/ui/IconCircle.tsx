import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  color: string;
  size?: number;
}

export default function IconCircle({ children, color, size = 64 }: Props) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
