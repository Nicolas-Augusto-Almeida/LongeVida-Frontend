import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';
import { useAuth } from '../../contexts/AuthContext';

import { styles } from './Splash.styles';

export default function SplashScreen() {
  const spin = useRef(new Animated.Value(0)).current;
  const { usuario, carregando } = useAuth();
  const [tempoMinimoPassou, setTempoMinimoPassou] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 900, useNativeDriver: true })
    ).start();

    const timer = setTimeout(() => setTempoMinimoPassou(true), 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!tempoMinimoPassou || carregando) return;
    if (!usuario) {
      router.replace('/login');
    } else if (usuario.perfilSaudeCompleto) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/primeiro-acesso');
    }
  }, [tempoMinimoPassou, carregando, usuario]);

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
