import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppTextField, IconCircle } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/typography';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (email && senha) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.primary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>LongeVida</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
        </View>

        <View style={styles.form}>
          <AppTextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Feather name="mail" size={20} color={colors.mutedForeground} />}
          />
          <AppTextField
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            icon={<Feather name="lock" size={20} color={colors.mutedForeground} />}
          />

          <AppButton title="Entrar" onPress={handleLogin} />

          <View style={{ gap: 12, marginTop: 4 }}>
            <AppButton
              title="Criar Conta"
              variant="outlined"
              onPress={() => router.push('/cadastro')}
            />
            <AppButton
              title="Esqueci Minha Senha"
              variant="text"
              color={colors.secondary}
              onPress={() => router.push('/recuperacao-senha')}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  headerGroup: { alignItems: 'center', marginBottom: spacing.xl, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground },
  form: { gap: spacing.md },
});
