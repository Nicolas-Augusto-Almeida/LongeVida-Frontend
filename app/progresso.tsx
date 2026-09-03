import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, MiniLineChart, Screen, ScreenHeader } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, radius, spacing } from '../src/theme/typography';
import { dadosCalorias, dadosPeso, usuarioAtual } from '../src/data/mockData';

export default function Progresso() {
  const dias = dadosPeso.map((d) => d.dia);
  const pesos = dadosPeso.map((d) => d.peso);
  const pesoInicial = pesos[0];
  const pesoAtual = pesos[pesos.length - 1];
  const variacao = Math.round((pesoAtual - pesoInicial) * 10) / 10;

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Meu Progresso" subtitle="Acompanhe sua evolução ao longo do tempo" onBack={() => router.back()} />

      <View style={styles.content}>
        <View style={styles.statsRow}>
          <AppCard style={styles.statCard}>
            <Feather name="anchor" size={26} color={colors.primary} />
            <Text style={styles.statValue}>{pesoAtual} kg</Text>
            <Text style={styles.statLabel}>Peso Atual</Text>
          </AppCard>
          <AppCard style={styles.statCard}>
            <Feather name={variacao <= 0 ? 'trending-down' : 'trending-up'} size={26} color={variacao <= 0 ? colors.primary : colors.warning} />
            <Text style={styles.statValue}>{variacao > 0 ? `+${variacao}` : variacao} kg</Text>
            <Text style={styles.statLabel}>Variação (7 dias)</Text>
          </AppCard>
        </View>

        <AppCard>
          <Text style={styles.cardTitle}>Evolução do Peso</Text>
          <MiniLineChart categories={dias} series={[{ label: 'Peso (kg)', color: colors.primary, values: pesos }]} />
        </AppCard>

        <AppCard>
          <Text style={styles.cardTitle}>Calorias Consumidas x Gastas</Text>
          <MiniLineChart
            categories={dadosCalorias.map((d) => d.dia)}
            series={[
              { label: 'Consumidas', color: colors.primary, values: dadosCalorias.map((d) => d.consumidas) },
              { label: 'Gastas', color: colors.secondary, values: dadosCalorias.map((d) => d.gastas) },
            ]}
          />
        </AppCard>

        <AppCard>
          <Text style={styles.cardTitle}>Resumo Corporal</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.mutedLabel}>Altura</Text>
              <Text style={styles.summaryValue}>{usuarioAtual.altura} cm</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.mutedLabel}>Peso</Text>
              <Text style={styles.summaryValue}>{usuarioAtual.peso} kg</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.mutedLabel}>IMC</Text>
              <Text style={styles.summaryValue}>
                {(usuarioAtual.peso / (usuarioAtual.altura / 100) ** 2).toFixed(1)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.mutedLabel}>Nível de Atividade</Text>
              <Text style={styles.summaryValue}>{usuarioAtual.nivelAtividade}</Text>
            </View>
          </View>
        </AppCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, alignItems: 'center', gap: 6 },
  statValue: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground },
  statLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: 'center' },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.md },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  summaryItem: { width: '47%', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md },
  mutedLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginBottom: 4 },
  summaryValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
});
