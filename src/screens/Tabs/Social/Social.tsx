import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppChip, Screen } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';
import { profissionais } from '../../../data/mockData';

import { styles } from './Social.styles';

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
