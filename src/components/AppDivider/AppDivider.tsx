import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';

import { styles } from './AppDivider.styles';

export default function AppDivider({ style }: { style?: any }) {
  return <View style={[styles.divider, style]} />;
}
