import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppDivider, AppSwitch, AppTextField, Screen, ScreenHeader } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/typography';

export default function Configuracoes() {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [metaAgua, setMetaAgua] = useState('2000');
  const [metaCalorias, setMetaCalorias] = useState('2000');
  const [metaExercicios, setMetaExercicios] = useState('30');

  const handleSalvar = () => {
    router.replace('/(tabs)/perfil');
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Configurações" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.sectionTitleRow}>
            <Feather name="bell" size={24} color={colors.primary} />
            <Text style={styles.sectionTitle}>Notificações</Text>
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Receber notificações</Text>
            <AppSwitch value={notificacoesAtivas} onValueChange={setNotificacoesAtivas} />
          </View>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Metas Diárias</Text>

          <View style={{ gap: spacing.md, marginTop: spacing.md }}>
            <View>
              <View style={styles.fieldLabelRow}>
                <Feather name="droplet" size={22} color={colors.secondary} />
                <Text style={styles.fieldLabel}>Meta de Água (ml)</Text>
              </View>
              <AppTextField label="" value={metaAgua} onChangeText={setMetaAgua} keyboardType="numeric" />
            </View>

            <AppDivider style={{ marginVertical: 4 }} />

            <View>
              <View style={styles.fieldLabelRow}>
                <Feather name="zap" size={22} color={colors.primary} />
                <Text style={styles.fieldLabel}>Meta de Calorias (kcal)</Text>
              </View>
              <AppTextField label="" value={metaCalorias} onChangeText={setMetaCalorias} keyboardType="numeric" />
            </View>

            <AppDivider style={{ marginVertical: 4 }} />

            <View>
              <View style={styles.fieldLabelRow}>
                <Feather name="activity" size={22} color={colors.secondary} />
                <Text style={styles.fieldLabel}>Meta de Exercícios (minutos)</Text>
              </View>
              <AppTextField label="" value={metaExercicios} onChangeText={setMetaExercicios} keyboardType="numeric" />
            </View>
          </View>
        </AppCard>

        <AppCard style={{ backgroundColor: colors.secondaryLight }}>
          <Text style={styles.sectionTitle}>Horários dos Lembretes</Text>
          <Text style={styles.mutedText}>
            Configure os horários dos seus lembretes diários de refeições, hidratação e exercícios através das notificações.
          </Text>
        </AppCard>

        <AppButton title="Salvar Configurações" icon={<Feather name="save" size={20} color={colors.white} />} onPress={handleSalvar} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  switchLabel: { fontSize: fontSize.base, color: colors.foreground },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  fieldLabel: { fontSize: fontSize.base, color: colors.foreground },
  mutedText: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 24 },
});
