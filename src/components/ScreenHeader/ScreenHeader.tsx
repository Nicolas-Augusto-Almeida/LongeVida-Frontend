import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

import { styles } from './ScreenHeader.styles';

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backgroundColor?: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export default function ScreenHeader({ title, subtitle, onBack, backgroundColor = colors.primary, icon, rightAction }: Props) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Feather name="arrow-left" size={22} color={colors.white} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      )}
      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          {icon}
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightAction}
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
