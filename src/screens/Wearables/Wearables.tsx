import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppChip,
  AppSelect,
  AppTextField,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { dispositivosApi } from "../services/endpoints";
import type { MedicaoWearable } from "../services/types";
import { instanteRelativo, milhar } from "../../utils/format";

import { styles } from "./Wearables.styles";

const DADOS: { tipo: MedicaoWearable["tipo"]; rotulo: string }[] = [
  { tipo: "PASSOS", rotulo: "Passos diários" },
  { tipo: "FREQUENCIA_CARDIACA", rotulo: "Batimentos cardíacos" },
  { tipo: "CALORIAS_GASTAS", rotulo: "Calorias gastas" },
  { tipo: "SONO_MINUTOS", rotulo: "Qualidade do sono" },
];

const MARCAS = ["Apple", "Samsung", "Xiaomi", "Garmin", "Fitbit", "Outra"].map(
  (m) => ({ label: m, value: m }),
);

function formatarMedicao(m: MedicaoWearable): string {
  if (m.tipo === "SONO_MINUTOS")
    return `${Math.floor(m.valor / 60)}h${String(Math.round(m.valor % 60)).padStart(2, "0")}`;
  return `${milhar(m.valor)} ${m.unidade}`;
}

export default function Wearables() {
  const dispositivos = useApiQuery(() => dispositivosApi.listar());
  const medicoes = useApiQuery(() => dispositivosApi.ultimasMedicoes());
  const lista = dispositivos.data ?? [];

  const [formAberto, setFormAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const executar = async (
    acao: () => Promise<unknown>,
    aposSucesso?: () => void,
  ) => {
    setErro(null);
    setAviso(null);
    setOcupado(true);
    try {
      await acao();
      await Promise.all([dispositivos.recarregar(), medicoes.recarregar()]);
      aposSucesso?.();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setOcupado(false);
    }
  };

  const conectar = () => {
    if (!nome.trim() || !marca) {
      setErro("Informe o nome do dispositivo e a marca.");
      return;
    }
    executar(
      () => dispositivosApi.cadastrar({ nome: nome.trim(), marca }),
      () => {
        setNome("");
        setMarca("");
        setFormAberto(false);
      },
    );
  };

  const sincronizar = () =>
    executar(
      async () => undefined,
      () =>
        setAviso(
          "Dados atualizados. A leitura automática do relógio ainda depende da integração nativa (HealthKit / Health Connect), que não está configurada.",
        ),
    );

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Dispositivos Conectados"
        onBack={() => router.back()}
        icon={<Feather name="watch" size={28} color={colors.white} />}
      />

      <View style={styles.content}>
        <QueryBoundary
          loading={dispositivos.loading}
          error={dispositivos.error}
          onRetry={dispositivos.recarregar}
        >
          {lista.map((dispositivo) => (
            <AppCard key={dispositivo.id}>
              <Text style={styles.nome}>{dispositivo.nome}</Text>
              <Text style={styles.marca}>{dispositivo.marca}</Text>
              <View
                style={{
                  marginTop: spacing.sm,
                  marginBottom: spacing.md,
                  alignSelf: "flex-start",
                }}
              >
                <AppChip
                  label={dispositivo.conectado ? "Conectado" : "Desconectado"}
                  color={dispositivo.conectado ? colors.primary : "#9E9E9E"}
                  icon={
                    dispositivo.conectado ? (
                      <Feather
                        name="check-circle"
                        size={14}
                        color={colors.white}
                      />
                    ) : undefined
                  }
                />
              </View>
              <Text style={styles.sync}>
                Última sincronização:{" "}
                {dispositivo.ultimaSincronizacao
                  ? instanteRelativo(dispositivo.ultimaSincronizacao)
                  : "nunca"}
              </Text>
              {dispositivo.conectado && (
                <AppButton
                  title="Sincronizar"
                  variant="outlined"
                  icon={
                    <Feather
                      name="refresh-cw"
                      size={20}
                      color={colors.primary}
                    />
                  }
                  onPress={sincronizar}
                  loading={ocupado}
                />
              )}
              <AppButton
                title={dispositivo.conectado ? "Desconectar" : "Reconectar"}
                variant="text"
                color={
                  dispositivo.conectado ? colors.destructive : colors.primary
                }
                onPress={() =>
                  executar(() =>
                    dispositivosApi.alterarConexao(
                      dispositivo.id,
                      !dispositivo.conectado,
                    ),
                  )
                }
                disabled={ocupado}
              />
            </AppCard>
          ))}

          {lista.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum dispositivo conectado</Text>
            </View>
          )}
        </QueryBoundary>

        {aviso && <FormMessage tipo="sucesso">{aviso}</FormMessage>}
        {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

        {formAberto ? (
          <AppCard>
            <View style={{ gap: spacing.md }}>
              <AppTextField
                filter="texto"
                maxLength={60}
                label="Nome do dispositivo"
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: Meu relógio"
              />
              <AppSelect
                label="Marca"
                value={marca}
                onChange={setMarca}
                options={MARCAS}
              />
              <AppButton
                title="Conectar"
                onPress={conectar}
                loading={ocupado}
              />
              <AppButton
                title="Cancelar"
                variant="outlined"
                color={colors.mutedForeground}
                onPress={() => setFormAberto(false)}
              />
            </View>
          </AppCard>
        ) : (
          <AppButton
            title="Conectar Dispositivo"
            icon={<Feather name="plus" size={20} color={colors.white} />}
            onPress={() => setFormAberto(true)}
          />
        )}

        <AppCard style={{ backgroundColor: colors.secondaryLight }}>
          <Text style={styles.sectionTitle}>Dados Sincronizados</Text>
          <View style={{ gap: 8 }}>
            {DADOS.map(({ tipo, rotulo }) => {
              const m = medicoes.data?.find((x) => x.tipo === tipo);
              return (
                <Text key={tipo} style={styles.dadoItem}>
                  • {rotulo}: {m ? formatarMedicao(m) : "sem dados"}
                </Text>
              );
            })}
          </View>
        </AppCard>
      </View>
    </Screen>
  );
}
