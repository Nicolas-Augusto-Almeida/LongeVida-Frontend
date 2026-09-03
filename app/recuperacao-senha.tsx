import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppTextField, IconCircle } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, radius, spacing } from '../src/theme/typography';

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (email) setEnviado(true);
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
          <AppTextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 24, padding: spacing.xl, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  headerGroup: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center' },
  form: { gap: spacing.md },
  alert: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primaryLight, padding: 14, borderRadius: radius.md, marginBottom: spacing.lg },
  alertText: { flex: 1, color: colors.primaryDark, fontSize: fontSize.sm },
});
