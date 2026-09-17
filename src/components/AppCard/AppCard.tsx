import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/typography';

import { styles } from './AppCard.styles';

export default function AppCard({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}
