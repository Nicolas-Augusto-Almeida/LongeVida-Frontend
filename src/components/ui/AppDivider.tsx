import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function AppDivider({ style }: { style?: any }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: { height: 1, backgroundColor: colors.border, width: '100%', marginVertical: 16 },
});
