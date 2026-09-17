import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppCard, Screen, ScreenHeader } from '../../components';
import { colors } from '../../theme/colors';
import { fontSize, radius, spacing } from '../../theme/typography';
import { historico } from '../../data/mockData';

import { styles } from './Historico.styles';

type Filtro = 'todos' | 'refeicao' | 'atividade';

const FILTROS: { label: string; value: Filtro }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Refeições', value: 'refeicao' },
  { label: 'Atividades', value: 'atividade' },
];

export default function Historico() {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const itensFiltrados = historico.filter((item) => filtro === 'todos' || item.tipo === filtro);

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Histórico" onBack={() => router.back()} />

      <View style={styles.filterRow}>
        {FILTROS.map((f) => {
          const ativo = filtro === f.value;
          return (
            <TouchableOpacity
              key={f.value}
              onPress={() => setFiltro(f.value)}
              style={[styles.filterChip, ativo && { backgroundColor: colors.primary }]}
              accessibilityRole="button"
              accessibilityLabel={f.label}
              accessibilityState={{ selected: ativo }}
            >
              <Text style={[styles.filterText, ativo && { color: colors.white }]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.content}>
        {itensFiltrados.map((item, index) => (
          <AppCard key={`${item.nome}-${index}`}>
            <View style={styles.itemRow}>
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: item.tipo === 'refeicao' ? colors.primaryLight : colors.secondaryLight },
                ]}
              >
                <Feather
                  name={item.tipo === 'refeicao' ? 'coffee' : 'activity'}
                  size={26}
                  color={item.tipo === 'refeicao' ? colors.primary : colors.secondary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemHorario}>{item.horario}</Text>
              </View>
              <Text style={[styles.itemValor, { color: item.tipo === 'refeicao' ? colors.primary : colors.secondary }]}>
                {item.tipo === 'refeicao' ? `${item.calorias} kcal` : `${item.duracao} min`}
              </Text>
            </View>
          </AppCard>
        ))}

        {itensFiltrados.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
