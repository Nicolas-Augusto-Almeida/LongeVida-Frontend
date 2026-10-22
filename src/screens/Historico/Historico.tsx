import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AppCard, QueryBoundary, Screen, ScreenHeader } from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { progressoApi } from "../services/endpoints";
import { horaCurta, rotuloDia } from "../../utils/format";

import { styles } from "./Historico.styles";

type Filtro = "todos" | "refeicao" | "atividade";

const FILTROS: { label: string; value: Filtro }[] = [
  { label: "Todos", value: "todos" },
  { label: "Refeições", value: "refeicao" },
  { label: "Atividades", value: "atividade" },
];

export default function Historico() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const tipo =
    filtro === "refeicao"
      ? "REFEICAO"
      : filtro === "atividade"
        ? "ATIVIDADE"
        : undefined;
  const { data, loading, error, recarregar } = useApiQuery(
    () => progressoApi.historico(tipo),
    [filtro],
  );
  const itensFiltrados = data ?? [];

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
              style={[
                styles.filterChip,
                ativo && { backgroundColor: colors.primary },
              ]}
              accessibilityRole="button"
              accessibilityLabel={f.label}
              accessibilityState={{ selected: ativo }}
            >
              <Text
                style={[styles.filterText, ativo && { color: colors.white }]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.content}>
        <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
          {itensFiltrados.map((item) => (
            <AppCard key={`${item.tipo}-${item.id}`}>
              <View style={styles.itemRow}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor:
                        item.tipo === "REFEICAO"
                          ? colors.primaryLight
                          : colors.secondaryLight,
                    },
                  ]}
                >
                  <Feather
                    name={item.tipo === "REFEICAO" ? "coffee" : "activity"}
                    size={26}
                    color={
                      item.tipo === "REFEICAO"
                        ? colors.primary
                        : colors.secondary
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemHorario}>
                    {rotuloDia(item.data)} • {horaCurta(item.horario)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.itemValor,
                    {
                      color:
                        item.tipo === "REFEICAO"
                          ? colors.primary
                          : colors.secondary,
                    },
                  ]}
                >
                  {item.tipo === "REFEICAO"
                    ? `${item.calorias} kcal`
                    : `${item.duracaoMin} min`}
                </Text>
              </View>
            </AppCard>
          ))}

          {itensFiltrados.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
            </View>
          )}
        </QueryBoundary>
      </View>
    </Screen>
  );
}
