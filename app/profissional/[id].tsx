import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppChip, Screen, ScreenHeader } from '../../src/components/ui';
import { colors } from '../../src/theme/colors';
import { fontSize, radius, spacing } from '../../src/theme/typography';
import { profissionais } from '../../src/data/mockData';

export default function PerfilProfissional() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profissional = profissionais.find((p) => p.id === Number(id)) ?? profissionais[0];

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Perfil Profissional" backgroundColor={colors.secondary} onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.profileHeader}>
            <AppAvatar uri={profissional.foto} size={88} />
            <Text style={styles.nome}>{profissional.nome}</Text>
            <AppChip label={profissional.especialidade} color={colors.secondary} size="medium" />
            <View style={styles.followRow}>
              <Feather name="user-check" size={18} color={colors.mutedForeground} />
              <Text style={styles.mutedText}>{profissional.seguidores.toLocaleString('pt-BR')} seguidores</Text>
            </View>
          </View>

          <Text style={styles.descricao}>{profissional.descricao}</Text>

          <AppButton title="Seguir" color={colors.secondary} icon={<Feather name="user-plus" size={20} color={colors.white} />} />
        </AppCard>

        {profissional.dietas.length > 0 && (
          <AppCard>
            <View style={styles.sectionTitleRow}>
              <Feather name="clipboard" size={22} color={colors.primary} />
              <Text style={styles.sectionTitle}>Dietas Publicadas</Text>
            </View>
            {profissional.dietas.map((dieta) => (
              <View key={dieta.id} style={styles.listItem}>
                <View>
                  <Text style={styles.listItemTitle}>{dieta.nome}</Text>
                  <Text style={styles.mutedText}>{dieta.calorias} kcal</Text>
                </View>
                <AppButton
                  title="Importar"
                  fullWidth={false}
                  style={{ height: 44, paddingHorizontal: 16 }}
                  onPress={() => router.push(`/importar-dieta/${dieta.id}`)}
                />
              </View>
            ))}
          </AppCard>
        )}

        {profissional.treinos.length > 0 && (
          <AppCard>
            <View style={styles.sectionTitleRow}>
              <Feather name="zap" size={22} color={colors.secondary} />
              <Text style={styles.sectionTitle}>Treinos Publicados</Text>
            </View>
            {profissional.treinos.map((treino) => (
              <View key={treino.id} style={styles.listItem}>
                <View>
                  <Text style={styles.listItemTitle}>{treino.nome}</Text>
                  <Text style={styles.mutedText}>{treino.nivel}</Text>
                </View>
                <AppButton
                  title="Importar"
                  fullWidth={false}
                  color={colors.secondary}
                  style={{ height: 44, paddingHorizontal: 16 }}
                  onPress={() => router.push(`/importar-treino/${treino.id}`)}
                />
              </View>
            ))}
          </AppCard>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  profileHeader: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  nome: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  descricao: { fontSize: fontSize.base, color: colors.foreground, marginBottom: spacing.md, lineHeight: 26 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  listItemTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.foreground },
});
