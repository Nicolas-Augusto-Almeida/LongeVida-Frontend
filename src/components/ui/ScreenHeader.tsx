import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

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

const styles = StyleSheet.create({
  header: {
    paddingTop: 56,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12, alignSelf: 'flex-start' },
  backText: { color: colors.white, fontSize: fontSize.sm, fontWeight: '600' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.white },
  subtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
});
