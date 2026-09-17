import React from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, IconCircle, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { fontSize, spacing } from '../../theme/typography';
import { profissionais } from '../../data/mockData';

import { styles } from './ImportarTreino.styles';

export default function ImportarTreino() {
  const { treinoId: treinoIdParam } = useLocalSearchParams<{ treinoId: string }>();
  const treinoId = Number(treinoIdParam);
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
