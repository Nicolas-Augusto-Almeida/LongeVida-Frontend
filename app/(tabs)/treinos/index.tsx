import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, AppChip, Fab, IconButtonCircle, Screen } from '../../../src/components/ui';
import { colors } from '../../../src/theme/colors';
import { fontSize, spacing } from '../../../src/theme/typography';
import { treinos } from '../../../src/data/mockData';

function nivelColor(nivel: string) {
  if (nivel === 'Iniciante') return colors.primary;
  if (nivel === 'Intermediário') return colors.secondary;
  return colors.warning;
}

export default function Treinos() {
  return (
    <View style={styles.wrapper}>
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Treinos</Text>
        <Text style={styles.headerSubtitle}>Gerencie seus treinos personalizados</Text>
      </View>

      <View style={styles.content}>
        {treinos.map((treino) => (
          <AppCard key={treino.id}>
            <View style={{ gap: 8, marginBottom: spacing.sm }}>
              <Text style={styles.itemTitle}>{treino.nome}</Text>
              <AppChip label={treino.nivel} color={nivelColor(treino.nivel)} />
            </View>

            <View style={styles.infoBlock}>
              <View style={styles.row}>
                <Feather name="target" size={20} color={colors.secondary} />
                <Text style={styles.text}>{treino.objetivo}</Text>
              </View>
              <View style={styles.row}>
                <Feather name="zap" size={20} color={colors.primary} />
                <Text style={styles.mutedText}>{treino.exercicios.length} exercícios</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <IconButtonCircle color={colors.secondary} accessibilityLabel="Ver treino" onPress={() => router.push(`/(tabs)/treinos/${treino.id}`)}>
                <Feather name="eye" size={22} color={colors.white} />
              </IconButtonCircle>
              <IconButtonCircle color={colors.primary} accessibilityLabel="Editar treino" onPress={() => router.push(`/(tabs)/treinos/editar/${treino.id}`)}>
                <Feather name="edit-2" size={22} color={colors.white} />
              </IconButtonCircle>
              <IconButtonCircle color={colors.destructive} accessibilityLabel="Excluir treino">
                <Feather name="trash-2" size={22} color={colors.white} />
              </IconButtonCircle>
            </View>
          </AppCard>
        ))}

        {treinos.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Você ainda não tem treinos cadastrados</Text>
            <Text style={styles.emptySubtitle}>Toque no botão + para criar seu primeiro treino</Text>
          </View>
        )}
      </View>
    </Screen>

      <Fab color={colors.secondary} onPress={() => router.push('/(tabs)/treinos/criar')}>
        <Feather name="plus" size={30} color={colors.white} />
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.secondary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.md },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  infoBlock: { gap: spacing.sm, marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: fontSize.base, color: colors.foreground },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  actions: { flexDirection: 'row', gap: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyTitle: { fontSize: fontSize.md, color: colors.mutedForeground, textAlign: 'center' },
  emptySubtitle: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: 8, textAlign: 'center' },
});
