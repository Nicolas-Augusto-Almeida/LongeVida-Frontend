import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppChip, Screen } from '../../src/components/ui';
import { colors } from '../../src/theme/colors';
import { fontSize, spacing } from '../../src/theme/typography';
import { profissionais } from '../../src/data/mockData';

export default function Social() {
  return (
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Feather name="users" size={28} color={colors.white} />
          <Text style={styles.headerTitle}>Comunidade</Text>
        </View>
        <Text style={styles.headerSubtitle}>Conecte-se com profissionais de saúde</Text>
      </View>

      <View style={styles.content}>
        {profissionais.map((profissional) => (
          <AppCard key={profissional.id}>
            <View style={styles.profRow}>
              <AppAvatar uri={profissional.foto} size={72} />
              <View style={{ flex: 1, gap: 8 }}>
                <Text style={styles.itemTitle}>{profissional.nome}</Text>
                <AppChip label={profissional.especialidade} color={colors.secondary} />
              </View>
            </View>

            <View style={styles.followRow}>
              <Feather name="user-check" size={18} color={colors.mutedForeground} />
              <Text style={styles.mutedText}>{profissional.seguidores.toLocaleString('pt-BR')} seguidores</Text>
            </View>

            <View style={styles.actions}>
              <View style={{ flex: 1 }}>
                <AppButton
                  title="Ver Perfil"
                  onPress={() => router.push(`/profissional/${profissional.id}`)}
                  style={{ height: 48 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton title="Seguir" variant="outlined" color={colors.secondary} style={{ height: 48 }} />
              </View>
            </View>
          </AppCard>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.secondary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  headerSubtitle: { fontSize: fontSize.base, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  content: { padding: spacing.lg, gap: spacing.md },
  profRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  itemTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  followRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  actions: { flexDirection: 'row', gap: spacing.sm },
});
