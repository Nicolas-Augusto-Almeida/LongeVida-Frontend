import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppCard,
  AppChip,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { notificacoesApi } from "../services/endpoints";
import type { Notificacao } from "../services/types";
import { instanteRelativo } from "../../utils/format";

import { styles } from "./Notificacoes.styles";

const ICONES: Record<Notificacao["tipo"], keyof typeof Feather.glyphMap> = {
  LEMBRETE: "coffee",
  TREINO: "zap",
  SOCIAL: "user-plus",
};

function getTipoColor(tipo: Notificacao["tipo"]) {
  if (tipo === "LEMBRETE") return colors.primary;
  if (tipo === "TREINO") return colors.secondary;
  return colors.warning;
}

export default function Notificacoes() {
  const { data, loading, error, recarregar } = useApiQuery(() =>
    notificacoesApi.listar(),
  );
  const notificacoes = data ?? [];
  const marcou = useRef(false);

  useEffect(() => {
    if (data && !marcou.current && data.some((n) => !n.lida)) {
      marcou.current = true;
      notificacoesApi.marcarTodasLidas().catch(() => {});
    }
  }, [data]);

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Notificações"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
        icon={<Feather name="bell" size={28} color={colors.white} />}
      />

      <View style={styles.content}>
        <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
          {notificacoes.map((notificacao) => {
            const cor = getTipoColor(notificacao.tipo);
            return (
              <AppCard
                key={notificacao.id}
                style={
                  !notificacao.lida
                    ? { backgroundColor: colors.secondaryLight }
                    : undefined
                }
              >
                <View style={styles.row}>
                  <View
                    style={[
                      styles.iconWrapper,
                      { backgroundColor: `${cor}22` },
                    ]}
                  >
                    <Feather
                      name={ICONES[notificacao.tipo]}
                      size={26}
                      color={cor}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                      <Text style={styles.titulo}>{notificacao.titulo}</Text>
                      {!notificacao.lida && (
                        <AppChip label="Nova" color={colors.secondary} />
                      )}
                    </View>
                    <Text style={styles.mensagem}>{notificacao.mensagem}</Text>
                    <Text style={styles.horario}>
                      {instanteRelativo(notificacao.criadaEm)}
                    </Text>
                  </View>
                </View>
              </AppCard>
            );
          })}

          {notificacoes.length === 0 && (
            <View style={styles.empty}>
              <Feather name="bell" size={48} color={colors.mutedForeground} />
              <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
              <Text style={styles.emptySubtitle}>
                Suas notificações aparecerão aqui
              </Text>
            </View>
          )}
        </QueryBoundary>
      </View>
    </Screen>
  );
}
