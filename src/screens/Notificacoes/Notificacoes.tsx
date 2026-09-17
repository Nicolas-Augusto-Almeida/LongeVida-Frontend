import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, AppChip, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { fontSize, radius, spacing } from '../../theme/typography';
import { notificacoes, Notificacao } from '../../data/mockData';

import { styles } from './Notificacoes.styles';

const ICONES: Record<Notificacao['tipo'], keyof typeof Feather.glyphMap> = {
  lembrete: 'coffee',
  treino: 'zap',
  social: 'user-plus',
};

function getTipoColor(tipo: Notificacao['tipo']) {
  if (tipo === 'lembrete') return colors.primary;
  if (tipo === 'treino') return colors.secondary;
  return colors.warning;
}

export default function Notificacoes() {
  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Notificações"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
        icon={<Feather name="bell" size={28} color={colors.white} />}
      />

      <View style={styles.content}>
        {notificacoes.map((notificacao) => {
          const cor = getTipoColor(notificacao.tipo);
          return (
            <AppCard key={notificacao.id} style={!notificacao.lida ? { backgroundColor: colors.secondaryLight } : undefined}>
              <View style={styles.row}>
                <View style={[styles.iconWrapper, { backgroundColor: `${cor}22` }]}>
                  <Feather name={ICONES[notificacao.tipo]} size={26} color={cor} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.titulo}>{notificacao.titulo}</Text>
                    {!notificacao.lida && <AppChip label="Nova" color={colors.secondary} />}
                  </View>
                  <Text style={styles.mensagem}>{notificacao.mensagem}</Text>
                  <Text style={styles.horario}>{notificacao.horario}</Text>
                </View>
              </View>
            </AppCard>
          );
        })}

        {notificacoes.length === 0 && (
          <View style={styles.empty}>
            <Feather name="bell" size={48} color={colors.mutedForeground} />
            <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptySubtitle}>Suas notificações aparecerão aqui</Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
