import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

import { styles } from './Splash.styles';

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
