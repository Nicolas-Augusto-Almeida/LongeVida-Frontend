import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, IconCircle, Screen, ScreenHeader } from '../../src/components/ui';
import { colors } from '../../src/theme/colors';
import { fontSize, radius, spacing } from '../../src/theme/typography';
import { profissionais } from '../../src/data/mockData';

export default function ImportarDieta() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dietaId = Number(id);
  const profissional = profissionais.find((p) => p.dietas.some((d) => d.id === dietaId));
  const dieta = profissional?.dietas.find((d) => d.id === dietaId);

  const handleImportar = () => {
    router.replace('/(tabs)/dietas');
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Importar Dieta" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard style={{ alignItems: 'center' }}>
          <IconCircle color={colors.primaryLight} size={88}>
            <Feather name="download" size={40} color={colors.primary} />
          </IconCircle>
          <Text style={styles.title}>{dieta?.nome ?? 'Dieta'}</Text>
          {profissional && <Text style={styles.subtitle}>Publicada por {profissional.nome}</Text>}
          {dieta && (
            <View style={styles.infoRow}>
              <Feather name="zap" size={22} color={colors.primary} />
              <Text style={styles.infoText}>{dieta.calorias} kcal</Text>
            </View>
          )}
          <Text style={styles.description}>
            Esta dieta será adicionada à sua lista de "Minhas Dietas" como uma cópia editável, mantendo
            o crédito ao profissional que a publicou.
          </Text>
        </AppCard>

        <AppButton title="Importar Dieta" icon={<Feather name="download" size={20} color={colors.white} />} onPress={handleImportar} />
        <AppButton title="Cancelar" variant="outlined" color={colors.mutedForeground} onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.md, textAlign: 'center' },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.background, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginTop: spacing.md },
  infoText: { fontSize: fontSize.base, fontWeight: '700', color: colors.foreground },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: 'center', marginTop: spacing.md, lineHeight: 22 },
});
