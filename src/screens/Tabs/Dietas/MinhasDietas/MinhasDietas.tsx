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
import { dietasApi } from "../../../services/endpoints";
import type { Dieta } from "../../../services/types";
import { decimal } from "../../../../utils/format";

import { styles } from "./MinhasDietas.styles";

export default function MinhasDietas() {
  const { data, loading, error, recarregar } = useApiQuery(() =>
    dietasApi.listar(),
  );
  const dietas = data ?? [];
  const [paraExcluir, setParaExcluir] = useState<Dieta | null>(null);
  const [erroExclusao, setErroExclusao] = useState<string | null>(null);

  const confirmarExclusao = async () => {
    if (!paraExcluir) return;
    const alvo = paraExcluir;
    setParaExcluir(null);
    try {
      await dietasApi.excluir(alvo.id);
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
          <Text style={styles.headerTitle}>Minhas Dietas</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie suas dietas personalizadas
          </Text>
        </View>

        <View style={styles.content}>
          {erroExclusao && (
            <FormMessage tipo="erro">{erroExclusao}</FormMessage>
          )}

          <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
            {dietas.map((dieta) => (
              <AppCard key={dieta.id}>
                <View style={styles.cardTop}>
                  <View style={{ flex: 1, gap: 8 }}>
                    <Text style={styles.itemTitle}>{dieta.nome}</Text>
                    <AppChip
                      label={dieta.status === "PUBLICA" ? "Pública" : "Privada"}
                      color={
                        dieta.status === "PUBLICA"
                          ? colors.secondary
                          : colors.mutedForeground
                      }
                      icon={
                        <Feather
                          name={dieta.status === "PUBLICA" ? "globe" : "lock"}
                          size={14}
                          color={colors.white}
                        />
                      }
                    />
                  </View>
                </View>

                <View style={styles.infoBlock}>
                  <View style={styles.row}>
                    <Feather name="zap" size={20} color={colors.primary} />
                    <Text style={styles.text}>{dieta.calorias} kcal</Text>
                  </View>
                  <View style={styles.macrosRow}>
                    <Text style={styles.macroText}>
                      Proteínas: {decimal(dieta.proteinas)}g
                    </Text>
                    <Text style={styles.macroText}>
                      Carboidratos: {decimal(dieta.carboidratos)}g
                    </Text>
                    <Text style={styles.macroText}>
                      Gorduras: {decimal(dieta.gorduras)}g
                    </Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <IconButtonCircle
                    color={colors.primary}
                    accessibilityLabel="Ver dieta"
                    onPress={() => router.push(`/(tabs)/dietas/${dieta.id}`)}
                  >
                    <Feather name="eye" size={22} color={colors.white} />
                  </IconButtonCircle>
                  <IconButtonCircle
                    color={colors.secondary}
                    accessibilityLabel="Editar dieta"
                    onPress={() =>
                      router.push(`/(tabs)/dietas/editar/${dieta.id}`)
                    }
                  >
                    <Feather name="edit-2" size={22} color={colors.white} />
                  </IconButtonCircle>
                  <IconButtonCircle
                    color={colors.destructive}
                    accessibilityLabel="Excluir dieta"
                    onPress={() => setParaExcluir(dieta)}
                  >
                    <Feather name="trash-2" size={22} color={colors.white} />
                  </IconButtonCircle>
                </View>
              </AppCard>
            ))}

            {dietas.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  Você ainda não tem dietas cadastradas
                </Text>
                <Text style={styles.emptySubtitle}>
                  Toque no botão + para criar sua primeira dieta
                </Text>
              </View>
            )}
          </QueryBoundary>
        </View>
      </Screen>

      <Fab
        color={colors.primary}
        onPress={() => router.push("/(tabs)/dietas/criar")}
      >
        <Feather name="plus" size={30} color={colors.white} />
      </Fab>

      <ConfirmDialog
        visible={paraExcluir !== null}
        title="Excluir dieta?"
        message={
          paraExcluir
            ? `A dieta "${paraExcluir.nome}" será apagada. Esta ação não pode ser desfeita.`
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
