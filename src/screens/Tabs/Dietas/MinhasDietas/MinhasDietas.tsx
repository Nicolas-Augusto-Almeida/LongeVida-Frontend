import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, AppChip, Fab, IconButtonCircle, Screen } from '../../../../components';
import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';
import { dietas } from '../../../../data/mockData';

import { styles } from './MinhasDietas.styles';

export default function MinhasDietas() {
  return (
    <View style={styles.wrapper}>
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Dietas</Text>
        <Text style={styles.headerSubtitle}>Gerencie suas dietas personalizadas</Text>
      </View>

      <View style={styles.content}>
        {dietas.map((dieta) => (
          <AppCard key={dieta.id}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1, gap: 8 }}>
                <Text style={styles.itemTitle}>{dieta.nome}</Text>
                <AppChip
                  label={dieta.status === 'publica' ? 'Pública' : 'Privada'}
                  color={dieta.status === 'publica' ? colors.secondary : colors.mutedForeground}
                  icon={<Feather name={dieta.status === 'publica' ? 'globe' : 'lock'} size={14} color={colors.white} />}
                />
              </View>
            </View>

            <View style={styles.infoBlock}>
              <View style={styles.row}>
                <Feather name="zap" size={20} color={colors.primary} />
                <Text style={styles.text}>{dieta.calorias} kcal</Text>
              </View>
              <View style={styles.macrosRow}>
                <Text style={styles.macroText}>Proteínas: {dieta.proteinas}g</Text>
                <Text style={styles.macroText}>Carboidratos: {dieta.carboidratos}g</Text>
                <Text style={styles.macroText}>Gorduras: {dieta.gorduras}g</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <IconButtonCircle color={colors.primary} accessibilityLabel="Ver dieta" onPress={() => router.push(`/(tabs)/dietas/${dieta.id}`)}>
                <Feather name="eye" size={22} color={colors.white} />
              </IconButtonCircle>
              <IconButtonCircle color={colors.secondary} accessibilityLabel="Editar dieta" onPress={() => router.push(`/(tabs)/dietas/editar/${dieta.id}`)}>
                <Feather name="edit-2" size={22} color={colors.white} />
              </IconButtonCircle>
              <IconButtonCircle color={colors.destructive} accessibilityLabel="Excluir dieta">
                <Feather name="trash-2" size={22} color={colors.white} />
              </IconButtonCircle>
            </View>
          </AppCard>
        ))}

        {dietas.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Você ainda não tem dietas cadastradas</Text>
            <Text style={styles.emptySubtitle}>Toque no botão + para criar sua primeira dieta</Text>
          </View>
        )}
      </View>
    </Screen>

      <Fab color={colors.primary} onPress={() => router.push('/(tabs)/dietas/criar')}>
        <Feather name="plus" size={30} color={colors.white} />
      </Fab>
    </View>
  );
}
