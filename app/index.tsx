import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/typography';

export default function SplashScreen() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 900, useNativeDriver: true })
    ).start();

    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather name="activity" size={72} color={colors.primary} strokeWidth={2.5} />
      </View>
      <Text style={styles.title}>LongeVida</Text>
      <Text style={styles.subtitle}>Saúde, alimentação e atividade física para uma vida melhor</Text>
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrapper: {
    backgroundColor: colors.white,
    borderRadius: 60,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: { fontSize: fontSize.xxl, color: colors.white, fontWeight: '700', marginBottom: spacing.md },
  subtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: spacing.xl },
  spinner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: colors.white,
  },
});
