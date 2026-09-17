import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, IconCircle, ProgressBar, Screen } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, radius, spacing } from '../../../theme/typography';
import { usuarioAtual } from '../../../data/mockData';

import { styles } from './Home.styles';

export default function Home() {
  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Olá, {usuarioAtual.nome.split(' ')[0]}!</Text>
          <TouchableOpacity
            onPress={() => router.push('/notificacoes')}
            accessibilityRole="button"
            accessibilityLabel="Ver notificações"
          >
            <Feather name="bell" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Sua jornada de saúde hoje</Text>
      </View>

      <View style={styles.content}>
        <AppCard>
          <View style={styles.cardTitleRow}>
            <Feather name="zap" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Resumo Diário</Text>
          </View>

          <View style={{ gap: spacing.md }}>
            <View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Calorias Consumidas</Text>
                <Text style={[styles.progressValue, { color: colors.primary }]}>1.450 / 2.000</Text>
              </View>
              <ProgressBar value={72.5} color={colors.primary} />
            </View>
            <View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Calorias Gastas</Text>
                <Text style={[styles.progressValue, { color: colors.secondary }]}>350 / 500</Text>
              </View>
              <ProgressBar value={70} color={colors.secondary} />
            </View>
            <View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Meta de Água</Text>
                <Text style={[styles.progressValue, { color: colors.secondary }]}>1,5L / 2L</Text>
              </View>
              <ProgressBar value={75} color={colors.secondary} />
            </View>
          </View>
        </AppCard>

        <View style={styles.grid}>
          <QuickAction
            label="Registrar Refeição"
            iconName="coffee"
            color={colors.primary}
            onPress={() => router.push('/registrar-refeicao')}
          />
          <QuickAction
            label="Registrar Atividade"
            iconName="activity"
            color={colors.secondary}
            onPress={() => router.push('/registrar-atividade')}
          />
          <QuickAction
            label="Minhas Dietas"
            iconName="clipboard"
            color={colors.primary}
            onPress={() => router.push('/(tabs)/dietas')}
          />
          <QuickAction
            label="Meus Treinos"
            iconName="zap"
            color={colors.secondary}
            onPress={() => router.push('/(tabs)/treinos')}
          />
        </View>

        <AppCard>
          <View style={styles.cardTitleRow}>
            <Feather name="droplet" size={24} color={colors.secondary} />
            <Text style={styles.cardTitle}>Lembretes de Hoje</Text>
          </View>
          <View style={{ gap: spacing.sm }}>
            <View style={styles.reminderRow}>
              <Feather name="coffee" size={22} color={colors.primary} />
              <View>
                <Text style={styles.reminderTitle}>Almoço</Text>
                <Text style={styles.reminderTime}>12:00</Text>
              </View>
            </View>
            <View style={styles.reminderRow}>
              <Feather name="zap" size={22} color={colors.secondary} />
              <View>
                <Text style={styles.reminderTitle}>Treino de Força</Text>
                <Text style={styles.reminderTime}>16:00</Text>
              </View>
            </View>
          </View>
        </AppCard>

        <TouchableOpacity onPress={() => router.push('/progresso')} activeOpacity={0.8}>
          <AppCard>
            <View style={styles.cardTitleRow}>
              <Feather name="trending-up" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Ver Meu Progresso</Text>
            </View>
            <Text style={styles.mutedText}>Acompanhe sua evolução com gráficos e estatísticas</Text>
          </AppCard>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

function QuickAction({
  label,
  iconName,
  color,
  onPress,
}: {
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={label}>
      <IconCircle color={`${color}22`} size={64}>
        <Feather name={iconName} size={30} color={color} />
      </IconCircle>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
