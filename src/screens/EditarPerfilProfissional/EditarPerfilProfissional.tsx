import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppTextField, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/typography';
import { usuarioAtual } from '../../data/mockData';

import { styles } from './EditarPerfilProfissional.styles';

export default function EditarPerfilProfissional() {
  const [especialidade, setEspecialidade] = useState('Nutricionista');
  const [descricao, setDescricao] = useState('');

  const handleSalvar = () => {
    router.replace('/(tabs)/perfil');
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Perfil Profissional" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.avatarBlock}>
            <AppAvatar label={usuarioAtual.nome} size={100} />
            <AppButton
              title="Alterar Foto"
              variant="outlined"
              fullWidth={false}
              icon={<Feather name="upload" size={18} color={colors.primary} />}
              style={{ height: 48, paddingHorizontal: 20, marginTop: spacing.md }}
            />
          </View>

          <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
            <AppTextField label="Especialidade" value={especialidade} onChangeText={setEspecialidade} />
            <AppTextField
              label="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              placeholder="Conte um pouco sobre sua experiência e áreas de atuação"
            />
            <AppButton title="Salvar Perfil Profissional" icon={<Feather name="save" size={20} color={colors.white} />} onPress={handleSalvar} />
          </View>
        </AppCard>
      </View>
    </Screen>
  );
}
