import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppChip,
  AppDivider,
  ConfirmDialog,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../../../components";
import { colors } from "../../../../theme/colors";
import { fontSize, spacing } from "../../../../theme/typography";
import { useAuth } from "../../../../contexts/AuthContext";
import { useApiQuery } from "../../../../hooks/useApiQuery";
import { mensagemDeErro } from "../../../services/api";
import { treinosApi } from "../../../services/endpoints";
import { NIVEL_TREINO_LABEL } from "../../../../utils/labels";

import { styles } from "./DetalheTreino.styles";

export default function DetalheTreino() {
  const { treinoId } = useLocalSearchParams<{ treinoId: string }>();
  const { usuario } = useAuth();
  const {
    data: treino,
    loading,
    error,
    recarregar,
    setData,
  } = useApiQuery(() => treinosApi.obter(Number(treinoId)), [treinoId]);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  const excluir = async () => {
    if (!treino) return;
    setConfirmarExclusao(false);
    setOcupado(true);
    try {
      await treinosApi.excluir(treino.id);
      router.back();
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
      setOcupado(false);
    }
  };

  const alternarPublicacao = async () => {
    if (!treino) return;
    setErroAcao(null);
    setOcupado(true);
    try {
      const atualizado =
        treino.status === "PUBLICA"
          ? await treinosApi.despublicar(treino.id)
          : await treinosApi.publicar(treino.id);
      setData(atualizado);
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Detalhes do Treino"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
      />

      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {treino && (
          <View style={styles.content}>
            <AppCard>
              <Text style={styles.title}>{treino.nome}</Text>
              <AppChip
                label={NIVEL_TREINO_LABEL[treino.nivel]}
                color={colors.secondary}
                size="medium"
              />
              {treino.creditoNome && (
                <Text style={styles.mutedText}>
                  Criado por {treino.creditoNome}
                </Text>
              )}

              <View style={styles.objetivoRow}>
                <Feather name="zap" size={22} color={colors.primary} />
                <Text style={styles.mutedText}>{treino.objetivo}</Text>
              </View>

              <Text style={styles.sectionTitle}>Exercícios</Text>

              {treino.exercicios.map((exercicio, index) => (
                <View key={exercicio.id}>
                  {index > 0 && <AppDivider />}
                  <View style={{ gap: 4 }}>
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
                </View>
              ))}
            </AppCard>

            {erroAcao && <FormMessage tipo="erro">{erroAcao}</FormMessage>}

            <View style={{ gap: spacing.sm }}>
              <AppButton
                title="Editar Treino"
                color={colors.secondary}
                icon={<Feather name="edit-2" size={20} color={colors.white} />}
                onPress={() =>
                  router.push(`/(tabs)/treinos/editar/${treino.id}`)
                }
              />
              <AppButton
                title="Excluir Treino"
                variant="outlined"
                color={colors.destructive}
                icon={
                  <Feather
                    name="trash-2"
                    size={20}
                    color={colors.destructive}
                  />
                }
                onPress={() => setConfirmarExclusao(true)}
                disabled={ocupado}
              />
              {usuario?.isProfissional && (
                <AppButton
                  title={
                    treino.status === "PUBLICA"
                      ? "Tornar Treino Privado"
                      : "Publicar Treino"
                  }
                  icon={<Feather name="globe" size={20} color={colors.white} />}
                  onPress={alternarPublicacao}
                  loading={ocupado}
                />
              )}
            </View>
          </View>
        )}
      </QueryBoundary>

      <ConfirmDialog
        visible={confirmarExclusao}
        title="Excluir treino?"
        message="Este treino será apagado. Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        confirmColor={colors.destructive}
        onConfirm={excluir}
        onCancel={() => setConfirmarExclusao(false)}
      />
    </Screen>
  );
}
