import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppTextField, IconCircle } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/typography';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [idade, setIdade] = useState('');

  const handleCadastro = () => {
    if (nome && email && senha && confirmarSenha && idade && senha === confirmarSenha) {
      router.replace('/primeiro-acesso');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerGroup}>
            <IconCircle color={colors.primary} size={96}>
              <Feather name="activity" size={48} color={colors.white} />
            </IconCircle>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Comece sua jornada para uma vida mais saudável</Text>
          </View>

          <View style={styles.form}>
            <AppTextField label="Nome" value={nome} onChangeText={setNome} icon={<Feather name="user" size={20} color={colors.mutedForeground} />} />
            <AppTextField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" icon={<Feather name="mail" size={20} color={colors.mutedForeground} />} />
            <AppTextField label="Senha" value={senha} onChangeText={setSenha} secureTextEntry icon={<Feather name="lock" size={20} color={colors.mutedForeground} />} />
            <AppTextField label="Confirmar Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry icon={<Feather name="lock" size={20} color={colors.mutedForeground} />} />
            <AppTextField label="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" icon={<Feather name="calendar" size={20} color={colors.mutedForeground} />} />

            <AppButton title="Cadastrar" onPress={handleCadastro} />
            <AppButton title="Já tem uma conta? Entrar" variant="text" color={colors.secondary} onPress={() => router.back()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  headerGroup: { alignItems: 'center', marginBottom: spacing.xl, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
  form: { gap: spacing.md },
});
