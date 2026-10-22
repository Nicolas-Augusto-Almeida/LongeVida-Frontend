import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppDivider, ConfirmDialog, Screen } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';
import { useAuth } from '../../../contexts/AuthContext';
import { NIVEL_ATIVIDADE_LABEL } from '../../../utils/labels';
import { decimal } from '../../../utils/format';

import { styles } from './Perfil.styles';

export default function Perfil() {
  const [dialogAberto, setDialogAberto] = useState(false);
  const { usuario, logout } = useAuth();

  const handleConfirmarLogout = async () => {
    setDialogAberto(false);
    await logout();
    router.replace('/login');
  };

  if (!usuario) return null;

  return (
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <View style={styles.content}>
        <AppCard>
          <View style={styles.avatarBlock}>
            <AppAvatar label={usuario.nome} size={100} />
            <Text style={styles.nome}>{usuario.nome}</Text>
            <Text style={styles.mutedText}>{usuario.idade} anos</Text>
          </View>

          <AppDivider />

          <View style={{ gap: spacing.md }}>
            <InfoRow icon="anchor" color={colors.primary} label="Peso" value={usuario.peso !== null ? `${decimal(usuario.peso)} kg` : '—'} />
            <InfoRow icon="bar-chart-2" color={colors.primary} label="Altura" value={usuario.altura !== null ? `${usuario.altura} cm` : '—'} />
            <InfoRow icon="activity" color={colors.secondary} label="Nível de Atividade" value={usuario.nivelAtividade ? NIVEL_ATIVIDADE_LABEL[usuario.nivelAtividade] : '—'} />
          </View>
        </AppCard>

        <View style={{ gap: spacing.sm }}>
          <AppButton title="Editar Perfil" icon={<Feather name="edit-2" size={20} color={colors.white} />} onPress={() => router.push('/editar-perfil')} style={styles.leftAlignedBtn} />

          {usuario.isProfissional && (
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
