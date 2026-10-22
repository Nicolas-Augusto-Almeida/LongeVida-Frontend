import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppCard,
  MiniLineChart,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { progressoApi } from "../services/endpoints";
import { decimal, diaDaSemanaAbrev } from "../../utils/format";
import { NIVEL_ATIVIDADE_LABEL } from "../../utils/labels";

import { styles } from "./Progresso.styles";

export default function Progresso() {
  const {
    data: p,
    loading,
    error,
    recarregar,
  } = useApiQuery(() => progressoApi.progresso(7));
  const variacao = p?.variacaoPeso ?? null;
  const pesos = p?.pesos ?? [];

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Meu Progresso"
        subtitle="Acompanhe sua evolução ao longo do tempo"
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
          {p && (
            <>
              <View style={styles.statsRow}>
                <AppCard style={styles.statCard}>
                  <Feather name="anchor" size={26} color={colors.primary} />
                  <Text style={styles.statValue}>
                    {p.pesoAtual !== null ? `${decimal(p.pesoAtual)} kg` : "—"}
                  </Text>
                  <Text style={styles.statLabel}>Peso Atual</Text>
                </AppCard>
                <AppCard style={styles.statCard}>
                  <Feather
                    name={
                      variacao === null || variacao <= 0
                        ? "trending-down"
                        : "trending-up"
                    }
                    size={26}
                    color={
                      variacao === null || variacao <= 0
                        ? colors.primary
                        : colors.warning
                    }
                  />
                  <Text style={styles.statValue}>
                    {variacao === null
                      ? "—"
                      : `${variacao > 0 ? "+" : ""}${decimal(variacao)} kg`}
                  </Text>
                  <Text style={styles.statLabel}>Variação (7 dias)</Text>
                </AppCard>
              </View>

              <AppCard>
                <Text style={styles.cardTitle}>Evolução do Peso</Text>
                {pesos.length > 0 ? (
                  <MiniLineChart
                    categories={pesos.map((d) => diaDaSemanaAbrev(d.data))}
                    series={[
                      {
                        label: "Peso (kg)",
                        color: colors.primary,
                        values: pesos.map((d) => d.peso),
                      },
                    ]}
                  />
                ) : (
                  <Text style={styles.mutedLabel}>
                    Ainda não há pesos registrados nos últimos 7 dias. Atualize
                    seu peso em "Editar Perfil".
                  </Text>
                )}
              </AppCard>

              <AppCard>
                <Text style={styles.cardTitle}>
                  Calorias Consumidas x Gastas
                </Text>
                <MiniLineChart
                  categories={p.calorias.map((d) => diaDaSemanaAbrev(d.data))}
                  series={[
                    {
                      label: "Consumidas",
                      color: colors.primary,
                      values: p.calorias.map((d) => d.consumidas),
                    },
                    {
                      label: "Gastas",
                      color: colors.secondary,
                      values: p.calorias.map((d) => d.gastas),
                    },
                  ]}
                />
              </AppCard>

              <AppCard>
                <Text style={styles.cardTitle}>Resumo Corporal</Text>
                <View style={styles.summaryGrid}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.mutedLabel}>Altura</Text>
                    <Text style={styles.summaryValue}>
                      {p.resumoCorporal.altura !== null
                        ? `${p.resumoCorporal.altura} cm`
                        : "—"}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.mutedLabel}>Peso</Text>
                    <Text style={styles.summaryValue}>
                      {p.resumoCorporal.peso !== null
                        ? `${decimal(p.resumoCorporal.peso)} kg`
                        : "—"}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.mutedLabel}>IMC</Text>
                    <Text style={styles.summaryValue}>
                      {p.resumoCorporal.imc !== null
                        ? decimal(p.resumoCorporal.imc)
                        : "—"}
                    </Text>
                  </View>
                  <View style={styles.summaryItem}>
                    <Text style={styles.mutedLabel}>Nível de Atividade</Text>
                    <Text style={styles.summaryValue}>
                      {p.resumoCorporal.nivelAtividade
                        ? NIVEL_ATIVIDADE_LABEL[p.resumoCorporal.nivelAtividade]
                        : "—"}
                    </Text>
                  </View>
                </View>
              </AppCard>
            </>
          )}
        </QueryBoundary>
      </View>
    </Screen>
  );
}
