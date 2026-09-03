import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, IconCircle, Screen, ScreenHeader } from '../../src/components/ui';
import { colors } from '../../src/theme/colors';
import { fontSize, spacing } from '../../src/theme/typography';
import { profissionais } from '../../src/data/mockData';

export default function ImportarTreino() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const treinoId = Number(id);
  const profissional = profissionais.find((p) => p.treinos.some((t) => t.id === treinoId));
  const treino = profissional?.treinos.find((t) => t.id === treinoId);

  const handleImportar = () => {
    router.replace('/(tabs)/treinos');
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Importar Treino" backgroundColor={colors.secondary} onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard style={{ alignItems: 'center' }}>
          <IconCircle color={colors.secondaryLight} size={88}>
            <Feather name="download" size={40} color={colors.secondary} />
          </IconCircle>
          <Text style={styles.title}>{treino?.nome ?? 'Treino'}</Text>
          {profissional && <Text style={styles.subtitle}>Publicado por {profissional.nome}</Text>}
          {treino && (
            <View style={{ marginTop: spacing.md }}>
              <AppChip label={treino.nivel} color={colors.secondary} size="medium" />
            </View>
          )}
          <Text style={styles.description}>
            Este treino será adicionado à sua lista de "Meus Treinos" como uma cópia editável, mantendo
            o crédito ao profissional que o publicou.
          </Text>
        </AppCard>

        <AppButton title="Importar Treino" color={colors.secondary} icon={<Feather name="download" size={20} color={colors.white} />} onPress={handleImportar} />
        <AppButton title="Cancelar" variant="outlined" color={colors.mutedForeground} onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.md, textAlign: 'center' },
  subtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 4 },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: 'center', marginTop: spacing.md, lineHeight: 22 },
});
