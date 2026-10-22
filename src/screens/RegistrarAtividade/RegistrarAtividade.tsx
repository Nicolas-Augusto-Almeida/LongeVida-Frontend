import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppChip,
  AppDivider,
  AppSelect,
  AppTextField,
  FormMessage,
  IconCircle,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { atividadesApi, treinosApi } from "../services/endpoints";

import { styles } from "./RegistrarAtividade.styles";

const KCAL_POR_EXERCICIO = 50;

export default function RegistroAtividade() {
  const [treinoSelecionadoId, setTreinoSelecionadoId] = useState("");
  const [concluidos, setConcluidos] = useState<Set<number>>(new Set());
  const [duracao, setDuracao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const { data, loading, error, recarregar } = useApiQuery(() =>
    treinosApi.listar(),
  );
  const treinos = data ?? [];
  const opcoesTreinos = useMemo(
    () => treinos.map((t) => ({ label: t.nome, value: String(t.id) })),
    [data],
  );

  const treinoAtual = treinos.find((t) => t.id === Number(treinoSelecionadoId));

  const toggleExercicio = (exercicioId: number) => {
    setConcluidos((prev) => {
      const next = new Set(prev);
      if (next.has(exercicioId)) next.delete(exercicioId);
      else next.add(exercicioId);
      return next;
    });
  };

  const caloriasEstimadas = useMemo(
    () => concluidos.size * KCAL_POR_EXERCICIO,
    [concluidos],
  );
  const podeRegistrar =
    !!treinoSelecionadoId && concluidos.size > 0 && Number(duracao) >= 1;

  const handleRegistrar = async () => {
    if (!podeRegistrar) return;
    setErro(null);
    setCarregando(true);
    try {
      await atividadesApi.registrar({
        treinoId: Number(treinoSelecionadoId),
        exerciciosConcluidosIds: Array.from(concluidos),
        duracaoMin: Number(duracao),
      });
      router.back();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Registrar Atividade Física"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
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
                options={opcoesTreinos}
                icon={
                  <Feather
                    name="zap"
                    size={20}
                    color={colors.mutedForeground}
                  />
                }
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
                <View key={exercicio.id}>
                  {index > 0 && <AppDivider style={{ marginVertical: 12 }} />}
                  <TouchableOpacity
                    style={styles.exercicioRow}
                    onPress={() => toggleExercicio(exercicio.id)}
                    accessibilityRole="checkbox"
                    accessibilityState={{
                      checked: concluidos.has(exercicio.id),
                    }}
                    accessibilityLabel={exercicio.nome}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        concluidos.has(exercicio.id) && {
                          backgroundColor: colors.secondary,
                          borderColor: colors.secondary,
                        },
                      ]}
                    >
                      {concluidos.has(exercicio.id) && (
                        <Feather name="check" size={20} color={colors.white} />
                      )}
                    </View>
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.exercicioNome}>{exercicio.nome}</Text>
                      <View style={styles.row}>
                        <Text style={styles.mutedText}>
                          {exercicio.series} séries
                        </Text>
                        <Text style={styles.mutedText}>
                          {exercicio.repeticoes} repetições
                        </Text>
                      </View>
                      {exercicio.grupoMuscular !== "" && (
                        <AppChip
                          label={exercicio.grupoMuscular}
                          color="#F5F5F5"
                          textColor={colors.foreground}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              {treinoAtual.exercicios.length === 0 && (
                <Text style={styles.mutedText}>
                  Este treino ainda não tem exercícios. Edite o treino para
                  adicioná-los.
                </Text>
              )}

              <View style={{ marginTop: spacing.md }}>
                <AppTextField
                  filter="inteiro"
                  maxValue={1440}
                  label="Duração (minutos)"
                  value={duracao}
                  onChangeText={setDuracao}
                  placeholder="Ex: 30"
                />
              </View>

              {concluidos.size > 0 && (
                <View style={styles.resumoBox}>
                  <Text style={styles.sectionTitle}>Resumo</Text>
                  <Text style={styles.resumoText}>
                    Exercícios concluídos:{" "}
                    <Text style={styles.bold}>
                      {concluidos.size} de {treinoAtual.exercicios.length}
                    </Text>
                  </Text>
                  <Text style={styles.resumoText}>
                    Calorias estimadas:{" "}
                    <Text style={styles.bold}>~{caloriasEstimadas} kcal</Text>
                  </Text>
                </View>
              )}
            </AppCard>
          )}

          {!treinoAtual && (
            <AppCard style={{ backgroundColor: colors.background }}>
              <Text style={[styles.mutedText, { textAlign: "center" }]}>
                Selecione um treino para registrar seus exercícios
              </Text>
            </AppCard>
          )}
        </QueryBoundary>

        {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

        <AppButton
          title="Registrar Atividade"
          color={colors.secondary}
          icon={<Feather name="save" size={20} color={colors.white} />}
          disabled={!podeRegistrar}
          loading={carregando}
          onPress={handleRegistrar}
        />
      </View>
    </Screen>
  );
}
