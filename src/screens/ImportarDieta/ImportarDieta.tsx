import React from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, IconCircle, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { fontSize, radius, spacing } from '../../theme/typography';
import { profissionais } from '../../data/mockData';

import { styles } from './ImportarDieta.styles';

export default function ImportarDieta() {
  const { dietaId: dietaIdParam } = useLocalSearchParams<{ dietaId: string }>();
  const dietaId = Number(dietaIdParam);
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
