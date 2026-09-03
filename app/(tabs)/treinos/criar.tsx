import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  AppButton,
  AppCard,
  AppDivider,
  AppSelect,
  AppSwitch,
  AppTextField,
  IconButtonCircle,
  Screen,
  ScreenHeader,
} from '../../../src/components/ui';
import { colors } from '../../../src/theme/colors';
import { fontSize, spacing } from '../../../src/theme/typography';

interface ExercicioForm {
  id: number;
  nome: string;
  series: string;
  repeticoes: string;
  grupoMuscular: string;
}

const NIVEIS = [
  { label: 'Iniciante', value: 'iniciante' },
  { label: 'Intermediário', value: 'intermediario' },
  { label: 'Avançado', value: 'avancado' },
];

export default function CriarTreino() {
  const [nome, setNome] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [nivel, setNivel] = useState('');
  const [exercicios, setExercicios] = useState<ExercicioForm[]>([]);
  const [publicar, setPublicar] = useState(false);

  const adicionarExercicio = () => {
    setExercicios((prev) => [...prev, { id: Date.now(), nome: '', series: '', repeticoes: '', grupoMuscular: '' }]);
  };

  const removerExercicio = (id: number) => setExercicios((prev) => prev.filter((e) => e.id !== id));

  const atualizarExercicio = (id: number, campo: keyof ExercicioForm, valor: string) =>
    setExercicios((prev) => prev.map((e) => (e.id === id ? { ...e, [campo]: valor } : e)));

  const handleSalvar = () => {
    if (nome && objetivo && nivel) {
      router.back();
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Criar Novo Treino" backgroundColor={colors.secondary} onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={{ gap: spacing.md }}>
            <AppTextField label="Nome do Treino" value={nome} onChangeText={setNome} />
            <AppTextField label="Objetivo" value={objetivo} onChangeText={setObjetivo} />
            <AppSelect label="Nível" value={nivel} onChange={setNivel} options={NIVEIS} />

            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <Feather name="globe" size={20} color={colors.foreground} />
                <Text style={styles.switchText}>Publicar Treino (Perfil Profissional)</Text>
              </View>
              <AppSwitch value={publicar} onValueChange={setPublicar} color={colors.secondary} />
            </View>
          </View>
        </AppCard>

        <AppCard>
          <View style={styles.exerciciosHeader}>
            <Text style={styles.sectionTitle}>Exercícios</Text>
            <AppButton
              title="Adicionar"
              fullWidth={false}
              color={colors.secondary}
              icon={<Feather name="plus" size={18} color={colors.white} />}
              onPress={adicionarExercicio}
              style={{ height: 44, paddingHorizontal: 16 }}
            />
          </View>

          {exercicios.length === 0 && (
            <Text style={styles.mutedCenter}>Nenhum exercício adicionado ainda</Text>
          )}

          {exercicios.map((exercicio, index) => (
            <View key={exercicio.id}>
              {index > 0 && <AppDivider />}
              <View style={{ gap: spacing.md, marginTop: index > 0 ? 0 : spacing.md }}>
                <View style={styles.exercicioHeader}>
                  <Text style={styles.exercicioTitle}>Exercício {index + 1}</Text>
                  <IconButtonCircle
                    color="transparent"
                    accessibilityLabel="Remover exercício"
                    onPress={() => removerExercicio(exercicio.id)}
                  >
                    <Feather name="trash-2" size={22} color={colors.destructive} />
                  </IconButtonCircle>
                </View>

                <AppTextField label="Nome do Exercício" value={exercicio.nome} onChangeText={(v) => atualizarExercicio(exercicio.id, 'nome', v)} />
                <View style={styles.rowGap}>
                  <View style={{ flex: 1 }}>
                    <AppTextField label="Séries" value={exercicio.series} onChangeText={(v) => atualizarExercicio(exercicio.id, 'series', v)} keyboardType="numeric" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppTextField label="Repetições" value={exercicio.repeticoes} onChangeText={(v) => atualizarExercicio(exercicio.id, 'repeticoes', v)} keyboardType="numeric" />
                  </View>
                </View>
                <AppTextField label="Grupo Muscular" value={exercicio.grupoMuscular} onChangeText={(v) => atualizarExercicio(exercicio.id, 'grupoMuscular', v)} />
              </View>
            </View>
          ))}
        </AppCard>

        <AppButton title="Salvar Treino" icon={<Feather name="save" size={20} color={colors.white} />} onPress={handleSalvar} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  switchText: { fontSize: fontSize.base, color: colors.foreground },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  exerciciosHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  mutedCenter: { fontSize: fontSize.base, color: colors.mutedForeground, textAlign: 'center', paddingVertical: spacing.lg },
  exercicioHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  exercicioTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  rowGap: { flexDirection: 'row', gap: spacing.md },
});
