import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppCard,
  AppChip,
  ConfirmDialog,
  Fab,
  FormMessage,
  IconButtonCircle,
  QueryBoundary,
  Screen,
} from "../../../../components";
import { colors } from "../../../../theme/colors";
import { fontSize, spacing } from "../../../../theme/typography";
import { useApiQuery } from "../../../../hooks/useApiQuery";
import { mensagemDeErro } from "../../../services/api";
import { treinosApi } from "../../../services/endpoints";
import type { NivelTreino, Treino } from "../../../services/types";
import { NIVEL_TREINO_LABEL } from "../../../../utils/labels";

import { styles } from "./MeusTreinos.styles";

function nivelColor(nivel: NivelTreino) {
  if (nivel === "INICIANTE") return colors.primary;
  if (nivel === "INTERMEDIARIO") return colors.secondary;
  return colors.warning;
}

export default function Treinos() {
  const { data, loading, error, recarregar } = useApiQuery(() =>
    treinosApi.listar(),
  );
  const treinos = data ?? [];
  const [paraExcluir, setParaExcluir] = useState<Treino | null>(null);
  const [erroExclusao, setErroExclusao] = useState<string | null>(null);

  const confirmarExclusao = async () => {
    if (!paraExcluir) return;
    const alvo = paraExcluir;
    setParaExcluir(null);
    try {
      await treinosApi.excluir(alvo.id);
      setErroExclusao(null);
      await recarregar();
    } catch (e) {
      setErroExclusao(mensagemDeErro(e));
    }
  };

  return (
    <View style={styles.wrapper}>
      <Screen contentStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Treinos</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie seus treinos personalizados
          </Text>
        </View>

        <View style={styles.content}>
          {erroExclusao && (
            <FormMessage tipo="erro">{erroExclusao}</FormMessage>
          )}

          <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
            {treinos.map((treino) => (
              <AppCard key={treino.id}>
                <View style={{ gap: 8, marginBottom: spacing.sm }}>
                  <Text style={styles.itemTitle}>{treino.nome}</Text>
                  <AppChip
                    label={NIVEL_TREINO_LABEL[treino.nivel]}
                    color={nivelColor(treino.nivel)}
                  />
                </View>

                <View style={styles.infoBlock}>
                  <View style={styles.row}>
                    <Feather name="target" size={20} color={colors.secondary} />
                    <Text style={styles.text}>{treino.objetivo}</Text>
                  </View>
                  <View style={styles.row}>
                    <Feather name="zap" size={20} color={colors.primary} />
                    <Text style={styles.mutedText}>
                      {treino.exercicios.length} exercícios
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <IconButtonCircle
                    color={colors.secondary}
                    accessibilityLabel="Ver treino"
                    onPress={() => router.push(`/(tabs)/treinos/${treino.id}`)}
                  >
                    <Feather name="eye" size={22} color={colors.white} />
                  </IconButtonCircle>
                  <IconButtonCircle
                    color={colors.primary}
                    accessibilityLabel="Editar treino"
                    onPress={() =>
                      router.push(`/(tabs)/treinos/editar/${treino.id}`)
                    }
                  >
                    <Feather name="edit-2" size={22} color={colors.white} />
                  </IconButtonCircle>
                  <IconButtonCircle
                    color={colors.destructive}
                    accessibilityLabel="Excluir treino"
                    onPress={() => setParaExcluir(treino)}
                  >
                    <Feather name="trash-2" size={22} color={colors.white} />
                  </IconButtonCircle>
                </View>
              </AppCard>
            ))}

            {treinos.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  Você ainda não tem treinos cadastrados
                </Text>
                <Text style={styles.emptySubtitle}>
                  Toque no botão + para criar seu primeiro treino
                </Text>
              </View>
            )}
          </QueryBoundary>
        </View>
      </Screen>

      <Fab
        color={colors.secondary}
        onPress={() => router.push("/(tabs)/treinos/criar")}
      >
        <Feather name="plus" size={30} color={colors.white} />
      </Fab>

      <ConfirmDialog
        visible={paraExcluir !== null}
        title="Excluir treino?"
        message={
          paraExcluir
            ? `O treino "${paraExcluir.nome}" será apagado. Esta ação não pode ser desfeita.`
            : ""
        }
        confirmLabel="Excluir"
        confirmColor={colors.destructive}
        onConfirm={confirmarExclusao}
        onCancel={() => setParaExcluir(null)}
      />
    </View>
  );
}
