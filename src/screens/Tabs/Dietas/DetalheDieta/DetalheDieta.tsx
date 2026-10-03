import React from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, Screen, ScreenHeader } from '../../../../components';
import { colors } from '../../../../theme/colors';
import { fontSize, radius, spacing } from '../../../../theme/typography';
import { dietas } from '../../../../data/mockData';

import { styles } from './DetalheDieta.styles';

export default function DetalheDieta() {
  const { dietaId } = useLocalSearchParams<{ dietaId: string }>();
  const dieta = dietas.find((d) => d.id === Number(dietaId)) ?? dietas[0];

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Detalhes da Dieta" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <Text style={styles.title}>{dieta.nome}</Text>
          <AppChip
            label={dieta.status === 'publica' ? 'Pública' : 'Privada'}
            color={dieta.status === 'publica' ? colors.secondary : colors.mutedForeground}
            icon={dieta.status === 'publica' ? <Feather name="globe" size={14} color={colors.white} /> : undefined}
          />
          <Text style={styles.description}>{dieta.descricao}</Text>

          <View style={styles.infoRow}>
            <Feather name="zap" size={26} color={colors.primary} />
            <View>
              <Text style={styles.mutedLabel}>Meta Calórica</Text>
              <Text style={styles.infoValue}>{dieta.calorias} kcal</Text>
            </View>
          </View>

          <View style={styles.macrosBox}>
            <Text style={styles.sectionTitle}>Macronutrientes</Text>
            <View style={styles.macrosGrid}>
              <View style={styles.macroCell}>
                <Text style={styles.mutedLabel}>Proteínas</Text>
                <Text style={styles.infoValue}>{dieta.proteinas}g</Text>
              </View>
              <View style={styles.macroCell}>
                <Text style={styles.mutedLabel}>Carboidratos</Text>
                <Text style={styles.infoValue}>{dieta.carboidratos}g</Text>
              </View>
              <View style={styles.macroCell}>
                <Text style={styles.mutedLabel}>Gorduras</Text>
                <Text style={styles.infoValue}>{dieta.gorduras}g</Text>
              </View>
            </View>
          </View>
        </AppCard>

        <View style={{ gap: spacing.sm }}>
          <AppButton title="Editar Dieta" color={colors.secondary} icon={<Feather name="edit-2" size={20} color={colors.white} />} onPress={() => router.push(`/(tabs)/dietas/editar/${dieta.id}`)} />
          <AppButton title="Excluir Dieta" variant="outlined" color={colors.destructive} icon={<Feather name="trash-2" size={20} color={colors.destructive} />} />
          <AppButton title="Publicar Dieta" icon={<Feather name="globe" size={20} color={colors.white} />} />
        </View>
      </View>
    </Screen>
  );
}
