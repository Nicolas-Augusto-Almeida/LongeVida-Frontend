import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppTextField, IconCircle } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, radius, spacing } from '../../../theme/typography';
import { emailValido } from '../../../utils/inputFilters';

import { styles } from './RecuperacaoSenha.styles';

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (emailValido(email)) setEnviado(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.secondary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>Digite seu e-mail para receber instruções</Text>
        </View>

        {enviado && (
          <View style={styles.alert}>
            <Feather name="check-circle" size={20} color={colors.primaryDark} />
            <Text style={styles.alertText}>Verifique seu e-mail para instruções de recuperação</Text>
          </View>
        )}

        <View style={styles.form}>
          <AppTextField filter="email"
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            icon={<Feather name="mail" size={20} color={colors.mutedForeground} />}
          />
          <AppButton title="Enviar Link de Recuperação" color={colors.secondary} onPress={handleEnviar} />
          <AppButton
            title="Voltar para Login"
            variant="text"
            icon={<Feather name="arrow-left" size={18} color={colors.primary} />}
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
}
