import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, Screen, ScreenHeader } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, spacing } from '../src/theme/typography';
import { dispositivos } from '../src/data/mockData';

const DADOS_SINCRONIZADOS = ['Passos diários', 'Batimentos cardíacos', 'Calorias gastas', 'Qualidade do sono'];

export default function Wearables() {
  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Dispositivos Conectados"
        onBack={() => router.back()}
        icon={<Feather name="watch" size={28} color={colors.white} />}
      />

      <View style={styles.content}>
        {dispositivos.map((dispositivo) => (
          <AppCard key={dispositivo.id}>
            <Text style={styles.nome}>{dispositivo.nome}</Text>
            <Text style={styles.marca}>{dispositivo.marca}</Text>
            <View style={{ marginTop: spacing.sm, marginBottom: spacing.md, alignSelf: 'flex-start' }}>
              <AppChip
                label={dispositivo.conectado ? 'Conectado' : 'Desconectado'}
                color={dispositivo.conectado ? colors.primary : '#9E9E9E'}
                icon={dispositivo.conectado ? <Feather name="check-circle" size={14} color={colors.white} /> : undefined}
              />
            </View>
            <Text style={styles.sync}>Última sincronização: {dispositivo.ultimaSync}</Text>
            {dispositivo.conectado && (
              <AppButton
                title="Sincronizar"
                variant="outlined"
                icon={<Feather name="refresh-cw" size={20} color={colors.primary} />}
              />
            )}
          </AppCard>
        ))}

        {dispositivos.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum dispositivo conectado</Text>
          </View>
        )}

        <AppButton title="Conectar Dispositivo" icon={<Feather name="plus" size={20} color={colors.white} />} />

        <AppCard style={{ backgroundColor: colors.secondaryLight }}>
          <Text style={styles.sectionTitle}>Dados Sincronizados</Text>
          <View style={{ gap: 8 }}>
            {DADOS_SINCRONIZADOS.map((dado) => (
              <Text key={dado} style={styles.dadoItem}>
                • {dado}
              </Text>
            ))}
          </View>
        </AppCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  nome: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  marca: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 },
  sync: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: spacing.md },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: fontSize.md, color: colors.mutedForeground },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground, marginBottom: spacing.sm },
  dadoItem: { fontSize: fontSize.base, color: colors.foreground },
});
