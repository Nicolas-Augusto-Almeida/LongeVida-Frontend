import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppDivider, ConfirmDialog, Screen } from '../../src/components/ui';
import { colors } from '../../src/theme/colors';
import { fontSize, spacing } from '../../src/theme/typography';
import { usuarioAtual } from '../../src/data/mockData';

export default function Perfil() {
  const [dialogAberto, setDialogAberto] = useState(false);

  const handleConfirmarLogout = () => {
    setDialogAberto(false);
    router.replace('/login');
  };

  return (
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <View style={styles.content}>
        <AppCard>
          <View style={styles.avatarBlock}>
            <AppAvatar label={usuarioAtual.nome} size={100} />
            <Text style={styles.nome}>{usuarioAtual.nome}</Text>
            <Text style={styles.mutedText}>{usuarioAtual.idade} anos</Text>
          </View>

          <AppDivider />

          <View style={{ gap: spacing.md }}>
            <InfoRow icon="anchor" color={colors.primary} label="Peso" value={`${usuarioAtual.peso} kg`} />
            <InfoRow icon="bar-chart-2" color={colors.primary} label="Altura" value={`${usuarioAtual.altura} cm`} />
            <InfoRow icon="activity" color={colors.secondary} label="Nível de Atividade" value={usuarioAtual.nivelAtividade} />
          </View>
        </AppCard>

        <View style={{ gap: spacing.sm }}>
          <AppButton title="Editar Perfil" icon={<Feather name="edit-2" size={20} color={colors.white} />} style={styles.leftAlignedBtn} />

          {usuarioAtual.isProfissional && (
            <AppButton
              title="Perfil Profissional"
              color={colors.secondary}
              icon={<Feather name="briefcase" size={20} color={colors.white} />}
              onPress={() => router.push('/editar-perfil-profissional')}
              style={styles.leftAlignedBtn}
            />
          )}

          <AppButton
            title="Dispositivos Conectados"
            variant="outlined"
            icon={<Feather name="watch" size={20} color={colors.primary} />}
            onPress={() => router.push('/wearables')}
            style={styles.leftAlignedBtn}
          />

          <AppButton
            title="Notificações"
            variant="outlined"
            color={colors.secondary}
            icon={<Feather name="bell" size={20} color={colors.secondary} />}
            onPress={() => router.push('/notificacoes')}
            style={styles.leftAlignedBtn}
          />

          <AppButton
            title="Configurações"
            variant="outlined"
            color={colors.mutedForeground}
            icon={<Feather name="settings" size={20} color={colors.mutedForeground} />}
            onPress={() => router.push('/configuracoes')}
            style={styles.leftAlignedBtn}
          />

          <AppDivider />

          <AppButton
            title="Sair da Conta"
            variant="outlined"
            color={colors.destructive}
            icon={<Feather name="log-out" size={20} color={colors.destructive} />}
            onPress={() => setDialogAberto(true)}
            style={styles.leftAlignedBtn}
          />
        </View>
      </View>

      <ConfirmDialog
        visible={dialogAberto}
        title="Confirmar Saída"
        message="Tem certeza que deseja sair da sua conta?"
        confirmLabel="Sair"
        onConfirm={handleConfirmarLogout}
        onCancel={() => setDialogAberto(false)}
      />
    </Screen>
  );
}

function InfoRow({ icon, color, label, value }: { icon: keyof typeof Feather.glyphMap; color: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Feather name={icon} size={24} color={color} />
      <View style={{ flex: 1 }}>
        <Text style={styles.mutedText}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary, paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headerTitle: { fontSize: fontSize.xl, color: colors.white, fontWeight: '700' },
  content: { padding: spacing.lg, gap: spacing.lg },
  avatarBlock: { alignItems: 'center', gap: 6, marginBottom: spacing.md },
  nome: { fontSize: fontSize.lg, fontWeight: '700', color: colors.foreground, marginTop: spacing.sm },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  leftAlignedBtn: { justifyContent: 'flex-start', paddingLeft: 20 },
});
