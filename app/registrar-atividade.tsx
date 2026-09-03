import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppChip, AppDivider, AppSelect, IconCircle, Screen, ScreenHeader } from '../src/components/ui';
import { colors } from '../src/theme/colors';
import { fontSize, radius, spacing } from '../src/theme/typography';
import { treinos } from '../src/data/mockData';

const OPCOES_TREINOS = treinos.map((t) => ({ label: t.nome, value: String(t.id) }));

export default function RegistroAtividade() {
  const [treinoSelecionadoId, setTreinoSelecionadoId] = useState('');
  const [concluidos, setConcluidos] = useState<Set<number>>(new Set());

  const treinoAtual = treinos.find((t) => t.id === Number(treinoSelecionadoId));

  const toggleExercicio = (index: number) => {
    setConcluidos((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const caloriasEstimadas = useMemo(() => concluidos.size * 50, [concluidos]);
  const podeRegistrar = !!treinoSelecionadoId && concluidos.size > 0;

  const handleRegistrar = () => {
    if (podeRegistrar) router.back();
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Registrar Atividade Física" backgroundColor={colors.secondary} onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.iconRow}>
            <IconCircle color={colors.secondaryLight} size={88}>
              <Feather name="activity" size={40} color={colors.secondary} />
            </IconCircle>
          </View>
          <View style={{ marginTop: spacing.md }}>
            <AppSelect
              label="Selecione um Treino"
              value={treinoSelecionadoId}
              onChange={(v) => {
                setTreinoSelecionadoId(v);
                setConcluidos(new Set());
              }}
              options={OPCOES_TREINOS}
              icon={<Feather name="zap" size={20} color={colors.mutedForeground} />}
            />
          </View>
        </AppCard>

        {treinoAtual && (
          <AppCard>
            <View style={styles.sectionTitleRow}>
              <Feather name="zap" size={22} color={colors.secondary} />
              <Text style={styles.sectionTitle}>Exercícios do Treino</Text>
            </View>

            {treinoAtual.exercicios.map((exercicio, index) => (
              <View key={exercicio.nome}>
                {index > 0 && <AppDivider style={{ marginVertical: 12 }} />}
                <TouchableOpacity
                  style={styles.exercicioRow}
                  onPress={() => toggleExercicio(index)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: concluidos.has(index) }}
                  accessibilityLabel={exercicio.nome}
                >
                  <View style={[styles.checkbox, concluidos.has(index) && { backgroundColor: colors.secondary, borderColor: colors.secondary }]}>
                    {concluidos.has(index) && <Feather name="check" size={20} color={colors.white} />}
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.exercicioNome}>{exercicio.nome}</Text>
                    <View style={styles.row}>
                      <Text style={styles.mutedText}>{exercicio.series} séries</Text>
                      <Text style={styles.mutedText}>{exercicio.repeticoes} repetições</Text>
                    </View>
                    <AppChip label={exercicio.grupoMuscular} color="#F5F5F5" textColor={colors.foreground} />
                  </View>
                </TouchableOpacity>
              </View>
            ))}

            {concluidos.size > 0 && (
              <View style={styles.resumoBox}>
                <Text style={styles.sectionTitle}>Resumo</Text>
                <Text style={styles.resumoText}>
                  Exercícios concluídos: <Text style={styles.bold}>{concluidos.size} de {treinoAtual.exercicios.length}</Text>
                </Text>
                <Text style={styles.resumoText}>
                  Calorias estimadas: <Text style={styles.bold}>~{caloriasEstimadas} kcal</Text>
                </Text>
              </View>
            )}
          </AppCard>
        )}

        {!treinoAtual && (
          <AppCard style={{ backgroundColor: colors.background }}>
            <Text style={[styles.mutedText, { textAlign: 'center' }]}>Selecione um treino para registrar seus exercícios</Text>
          </AppCard>
        )}

        <AppButton
          title="Registrar Atividade"
          color={colors.secondary}
          icon={<Feather name="save" size={20} color={colors.white} />}
          disabled={!podeRegistrar}
          onPress={handleRegistrar}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  iconRow: { alignItems: 'center' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  exercicioRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: colors.mutedForeground, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  exercicioNome: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  row: { flexDirection: 'row', gap: spacing.md },
  mutedText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  resumoBox: { backgroundColor: colors.secondaryLight, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg, gap: 6 },
  resumoText: { fontSize: fontSize.base, color: colors.foreground },
  bold: { fontWeight: '700' },
});
