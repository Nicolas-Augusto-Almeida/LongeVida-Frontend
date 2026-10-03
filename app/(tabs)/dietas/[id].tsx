import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, Screen, ScreenHeader } from '../../../src/components/ui';
import { colors } from '../../../src/theme/colors';
import { fontSize, radius, spacing } from '../../../src/theme/typography';
import { dietas } from '../../../src/data/mockData';

export default function DetalheDieta() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dieta = dietas.find((d) => d.id === Number(id)) ?? dietas[0];

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

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginBottom: 10 },
  description: { fontSize: fontSize.base, color: colors.mutedForeground, marginVertical: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  mutedLabel: { fontSize: fontSize.xs, color: colors.mutedForeground },
  infoValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  macrosBox: { backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  macrosGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  macroCell: { alignItems: 'center', flex: 1 },
});
