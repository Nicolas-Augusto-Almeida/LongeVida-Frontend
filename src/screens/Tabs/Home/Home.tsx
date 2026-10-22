import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  FormMessage,
  IconCircle,
  ProgressBar,
  QueryBoundary,
  Screen,
} from "../../../components";
import { colors } from "../../../theme/colors";
import { fontSize, radius, spacing } from "../../../theme/typography";
import { useAuth } from "../../../contexts/AuthContext";
import { useApiQuery } from "../../../hooks/useApiQuery";
import { mensagemDeErro } from "../../services/api";
import { notificacoesApi, progressoApi } from "../../services/endpoints";
import { horaCurta, litros, milhar } from "../../../utils/format";

import { styles } from "./Home.styles";

const COPO_ML = 250;

function percentual(valor: number, meta: number) {
  return meta > 0 ? Math.min(100, (valor / meta) * 100) : 0;
}

const ICONE_LEMBRETE = {
  REFEICAO: "coffee",
  TREINO: "zap",
  AGUA: "droplet",
} as const;

export default function Home() {
  const { usuario } = useAuth();
  const resumo = useApiQuery(() => progressoApi.resumoDiario());
  const lembretesQuery = useApiQuery(() => notificacoesApi.lembretes());
  const lembretes = (lembretesQuery.data ?? []).filter((l) => l.ativo);
  const [registrandoAgua, setRegistrandoAgua] = useState(false);
  const [erroAgua, setErroAgua] = useState<string | null>(null);
  const r = resumo.data;

  const adicionarCopo = async () => {
    setErroAgua(null);
    setRegistrandoAgua(true);
    try {
      await progressoApi.registrarAgua(COPO_ML);
      await resumo.recarregar();
    } catch (e) {
      setErroAgua(mensagemDeErro(e));
    } finally {
      setRegistrandoAgua(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>
            Olá, {(usuario?.nome ?? "").split(" ")[0]}!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/notificacoes")}
            accessibilityRole="button"
            accessibilityLabel="Ver notificações"
          >
            <Feather name="bell" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Sua jornada de saúde hoje</Text>
      </View>

      <View style={styles.content}>
        <AppCard>
          <View style={styles.cardTitleRow}>
            <Feather name="zap" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Resumo Diário</Text>
          </View>

          <QueryBoundary
            loading={resumo.loading}
            error={resumo.error}
            onRetry={resumo.recarregar}
          >
            {r && (
              <View style={{ gap: spacing.md }}>
                <View>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>
                      Calorias Consumidas
                    </Text>
                    <Text
                      style={[styles.progressValue, { color: colors.primary }]}
                    >
                      {milhar(r.caloriasConsumidas)} /{" "}
                      {milhar(r.metas.calorias)}
                    </Text>
                  </View>
                  <ProgressBar
                    value={percentual(r.caloriasConsumidas, r.metas.calorias)}
                    color={colors.primary}
                  />
                </View>
                <View>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Calorias Gastas</Text>
                    <Text
                      style={[
                        styles.progressValue,
                        { color: colors.secondary },
                      ]}
                    >
                      {milhar(r.caloriasGastas)} /{" "}
                      {milhar(r.metas.caloriasGastas)}
                    </Text>
                  </View>
                  <ProgressBar
                    value={percentual(r.caloriasGastas, r.metas.caloriasGastas)}
                    color={colors.secondary}
                  />
                </View>
                <View>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Meta de Água</Text>
                    <Text
                      style={[
                        styles.progressValue,
                        { color: colors.secondary },
                      ]}
                    >
                      {litros(r.aguaMl)} / {litros(r.metas.aguaMl)}
                    </Text>
                  </View>
                  <ProgressBar
                    value={percentual(r.aguaMl, r.metas.aguaMl)}
                    color={colors.secondary}
                  />
                  {erroAgua && (
                    <FormMessage tipo="erro">{erroAgua}</FormMessage>
                  )}
                  <AppButton
                    title={`+ 1 copo (${COPO_ML} ml)`}
                    variant="outlined"
                    color={colors.secondary}
                    fullWidth={false}
                    loading={registrandoAgua}
                    onPress={adicionarCopo}
                    style={{
                      height: 44,
                      paddingHorizontal: 16,
                      marginTop: spacing.sm,
                      alignSelf: "flex-start",
                    }}
                  />
                </View>
              </View>
            )}
          </QueryBoundary>
        </AppCard>

        <View style={styles.grid}>
          <QuickAction
            label="Registrar Refeição"
            iconName="coffee"
            color={colors.primary}
            onPress={() => router.push("/registrar-refeicao")}
          />
          <QuickAction
            label="Registrar Atividade"
            iconName="activity"
            color={colors.secondary}
            onPress={() => router.push("/registrar-atividade")}
          />
          <QuickAction
            label="Minhas Dietas"
            iconName="clipboard"
            color={colors.primary}
            onPress={() => router.push("/(tabs)/dietas")}
          />
          <QuickAction
            label="Meus Treinos"
            iconName="zap"
            color={colors.secondary}
            onPress={() => router.push("/(tabs)/treinos")}
          />
        </View>

        <AppCard>
          <View style={styles.cardTitleRow}>
            <Feather name="droplet" size={24} color={colors.secondary} />
            <Text style={styles.cardTitle}>Lembretes de Hoje</Text>
          </View>
          <View style={{ gap: spacing.sm }}>
            {lembretes.map((l) => (
              <View key={l.id} style={styles.reminderRow}>
                <Feather
                  name={ICONE_LEMBRETE[l.tipo]}
                  size={22}
                  color={
                    l.tipo === "REFEICAO" ? colors.primary : colors.secondary
                  }
                />
                <View>
                  <Text style={styles.reminderTitle}>{l.titulo}</Text>
                  <Text style={styles.reminderTime}>
                    {horaCurta(l.horario)}
                  </Text>
                </View>
              </View>
            ))}
            {!lembretesQuery.loading && lembretes.length === 0 && (
              <Text style={styles.mutedText}>Nenhum lembrete ativo.</Text>
            )}
          </View>
        </AppCard>

        <TouchableOpacity
          onPress={() => router.push("/progresso")}
          activeOpacity={0.8}
        >
          <AppCard>
            <View style={styles.cardTitleRow}>
              <Feather name="trending-up" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Ver Meu Progresso</Text>
            </View>
            <Text style={styles.mutedText}>
              Acompanhe sua evolução com gráficos e estatísticas
            </Text>
          </AppCard>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

function QuickAction({
  label,
  iconName,
  color,
  onPress,
}: {
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <IconCircle color={`${color}22`} size={64}>
        <Feather name={iconName} size={30} color={color} />
      </IconCircle>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
