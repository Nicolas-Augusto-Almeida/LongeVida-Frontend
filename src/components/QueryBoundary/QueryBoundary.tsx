import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import AppButton from '../AppButton/AppButton';

import { styles } from './QueryBoundary.styles';

interface Props {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  children: React.ReactNode;
}

export default function QueryBoundary({ loading, error, onRetry, children }: Props) {
  if (loading) {
    return (
      <View style={styles.container} accessibilityLiveRegion="polite">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container} accessibilityLiveRegion="assertive">
        <Text style={styles.error}>{error}</Text>
        <AppButton title="Tentar novamente" onPress={onRetry} />
      </View>
    );
  }
  return <>{children}</>;
}
