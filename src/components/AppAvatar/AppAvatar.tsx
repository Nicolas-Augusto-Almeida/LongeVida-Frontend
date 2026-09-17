import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

import { styles } from './AppAvatar.styles';

interface Props {
  uri?: string;
  label?: string;
  size?: number;
  bgColor?: string;
}

export default function AppAvatar({ uri, label, size = 72, bgColor = colors.primary }: Props) {
  if (uri) {
    return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
  }
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
      <Text style={{ color: colors.white, fontSize: size * 0.4, fontWeight: '700' }}>
        {label ? label.charAt(0).toUpperCase() : '?'}
      </Text>
    </View>
  );
}
