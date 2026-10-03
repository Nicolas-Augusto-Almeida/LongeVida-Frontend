import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppDivider, AppSwitch, AppTextField, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';

import { styles } from './Configuracoes.styles';

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
              <AppTextField filter="inteiro" maxValue={10000} label="" value={metaAgua} onChangeText={setMetaAgua} />
            </View>

            <AppDivider style={{ marginVertical: 4 }} />

            <View>
              <View style={styles.fieldLabelRow}>
                <Feather name="zap" size={22} color={colors.primary} />
                <Text style={styles.fieldLabel}>Meta de Calorias (kcal)</Text>
              </View>
              <AppTextField filter="inteiro" maxValue={10000} label="" value={metaCalorias} onChangeText={setMetaCalorias} />
            </View>

            <AppDivider style={{ marginVertical: 4 }} />

            <View>
              <View style={styles.fieldLabelRow}>
                <Feather name="activity" size={22} color={colors.secondary} />
                <Text style={styles.fieldLabel}>Meta de Exercícios (minutos)</Text>
              </View>
              <AppTextField filter="inteiro" maxValue={1440} label="" value={metaExercicios} onChangeText={setMetaExercicios} />
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
