import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppTextField, IconCircle } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

import { styles } from './Cadastro.styles';

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
