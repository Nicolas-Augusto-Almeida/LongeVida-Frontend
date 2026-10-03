import React from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, AppDivider, Screen, ScreenHeader } from '../../../../components';
import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';
import { treinos } from '../../../../data/mockData';

import { styles } from './DetalheTreino.styles';

export default function DetalheTreino() {
  const { treinoId } = useLocalSearchParams<{ treinoId: string }>();
  const treino = treinos.find((t) => t.id === Number(treinoId)) ?? treinos[0];

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Detalhes do Treino" backgroundColor={colors.secondary} onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <Text style={styles.title}>{treino.nome}</Text>
          <AppChip label={treino.nivel} color={colors.secondary} size="medium" />

          <View style={styles.objetivoRow}>
            <Feather name="zap" size={22} color={colors.primary} />
            <Text style={styles.mutedText}>{treino.objetivo}</Text>
          </View>

          <Text style={styles.sectionTitle}>Exercícios</Text>

          {treino.exercicios.map((exercicio, index) => (
            <View key={exercicio.nome}>
              {index > 0 && <AppDivider />}
              <View style={{ gap: 4 }}>
                <Text style={styles.exercicioNome}>{exercicio.nome}</Text>
                <View style={styles.row}>
                  <Text style={styles.mutedText}>{exercicio.series} séries</Text>
                  <Text style={styles.mutedText}>{exercicio.repeticoes} repetições</Text>
                </View>
                <AppChip label={exercicio.grupoMuscular} color="#F5F5F5" textColor={colors.foreground} />
              </View>
            </View>
          ))}
        </AppCard>

        <View style={{ gap: spacing.sm }}>
          <AppButton title="Editar Treino" color={colors.secondary} icon={<Feather name="edit-2" size={20} color={colors.white} />} onPress={() => router.push(`/(tabs)/treinos/editar/${treino.id}`)} />
          <AppButton title="Excluir Treino" variant="outlined" color={colors.destructive} icon={<Feather name="trash-2" size={20} color={colors.destructive} />} />
          <AppButton title="Publicar Treino" icon={<Feather name="globe" size={20} color={colors.white} />} />
        </View>
      </View>
    </Screen>
  );
}
