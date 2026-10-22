import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppDivider,
  AppSwitch,
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
import { notificacoesApi, usuarioApi } from "../services/endpoints";
import type { Configuracao, Lembrete } from "../services/types";
import { horaCurta } from "../../utils/format";
import { horarioValido } from "../../utils/inputFilters";

import { styles } from "./Configuracoes.styles";

export default function Configuracoes() {
  const { data, loading, error, recarregar } = useApiQuery(() =>
    usuarioApi.obterConfiguracao(),
  );
  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Configurações" onBack={() => router.back()} />
      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {data && <Formulario inicial={data} />}
      </QueryBoundary>
    </Screen>
  );
}

function Formulario({ inicial }: { inicial: Configuracao }) {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(
    inicial.notificacoesAtivas,
  );
  const [metaAgua, setMetaAgua] = useState(String(inicial.metaAguaMl));
  const [metaCalorias, setMetaCalorias] = useState(
    String(inicial.metaCalorias),
  );
  const [metaExercicios, setMetaExercicios] = useState(
    String(inicial.metaExercicioMin),
  );
  const [metaCaloriasGastas, setMetaCaloriasGastas] = useState(
    String(inicial.metaCaloriasGastas),
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const lembretesQuery = useApiQuery(() => notificacoesApi.lembretes());
  const lembretes = lembretesQuery.data ?? [];
  const [erroLembrete, setErroLembrete] = useState<string | null>(null);

  const [horarios, setHorarios] = useState<Record<number, string>>({});
  const horarioAtual = (l: Lembrete) => horarios[l.id] ?? horaCurta(l.horario);

  const salvarHorario = async (l: Lembrete): Promise<boolean> => {
    const novo = horarioAtual(l);
    if (novo === horaCurta(l.horario)) return true;
    if (!horarioValido(novo)) {
      setErroLembrete(
        `Horário inválido em "${l.titulo}". Use o formato HH:MM, por exemplo 12:30.`,
      );
      return false;
    }
    setErroLembrete(null);
    try {
      const atualizado = await notificacoesApi.atualizarLembrete(l.id, {
        tipo: l.tipo,
        titulo: l.titulo,
        horario: novo,
        ativo: l.ativo,
      });
      lembretesQuery.setData((lista) =>
        (lista ?? []).map((x) => (x.id === atualizado.id ? atualizado : x)),
      );
      setHorarios((h) => {
        const { [l.id]: _removido, ...resto } = h;
        return resto;
      });
      return true;
    } catch (e) {
      setErroLembrete(mensagemDeErro(e));
      return false;
    }
  };

  const alternarLembrete = async (l: Lembrete, ativo: boolean) => {
    setErroLembrete(null);
    try {
      const atualizado = await notificacoesApi.atualizarLembrete(l.id, {
        tipo: l.tipo,
        titulo: l.titulo,
        horario: l.horario,
        ativo,
      });
      lembretesQuery.setData((lista) =>
        (lista ?? []).map((x) => (x.id === atualizado.id ? atualizado : x)),
      );
    } catch (e) {
      setErroLembrete(mensagemDeErro(e));
    }
  };

  const handleSalvar = async () => {
    if (!metaAgua || !metaCalorias || !metaExercicios || !metaCaloriasGastas) {
      setErro("Preencha todas as metas.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      for (const l of lembretes) {
        if (!(await salvarHorario(l))) {
          setCarregando(false);
          return;
        }
      }
      await usuarioApi.atualizarConfiguracao({
        notificacoesAtivas,
        metaAguaMl: Number(metaAgua),
        metaCalorias: Number(metaCalorias),
        metaExercicioMin: Number(metaExercicios),
        metaCaloriasGastas: Number(metaCaloriasGastas),
      });
      router.replace("/(tabs)/perfil");
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.content}>
      <AppCard>
        <View style={styles.sectionTitleRow}>
          <Feather name="bell" size={24} color={colors.primary} />
          <Text style={styles.sectionTitle}>Notificações</Text>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Receber notificações</Text>
          <AppSwitch
            value={notificacoesAtivas}
            onValueChange={setNotificacoesAtivas}
          />
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Metas Diárias</Text>

        <View style={{ gap: spacing.md, marginTop: spacing.md }}>
          <View>
            <View style={styles.fieldLabelRow}>
              <Feather name="droplet" size={22} color={colors.secondary} />
              <Text style={styles.fieldLabel}>Meta de Água (ml)</Text>
            </View>
            <AppTextField
              filter="inteiro"
              maxValue={10000}
              label=""
              value={metaAgua}
              onChangeText={setMetaAgua}
            />
          </View>

          <AppDivider style={{ marginVertical: 4 }} />

          <View>
            <View style={styles.fieldLabelRow}>
              <Feather name="zap" size={22} color={colors.primary} />
              <Text style={styles.fieldLabel}>Meta de Calorias (kcal)</Text>
            </View>
            <AppTextField
              filter="inteiro"
              maxValue={10000}
              label=""
              value={metaCalorias}
              onChangeText={setMetaCalorias}
            />
          </View>

          <AppDivider style={{ marginVertical: 4 }} />

          <View>
            <View style={styles.fieldLabelRow}>
              <Feather name="activity" size={22} color={colors.secondary} />
              <Text style={styles.fieldLabel}>
                Meta de Exercícios (minutos)
              </Text>
            </View>
            <AppTextField
              filter="inteiro"
              maxValue={1440}
              label=""
              value={metaExercicios}
              onChangeText={setMetaExercicios}
            />
          </View>

          <AppDivider style={{ marginVertical: 4 }} />

          <View>
            <View style={styles.fieldLabelRow}>
              <Feather name="trending-up" size={22} color={colors.warning} />
              <Text style={styles.fieldLabel}>
                Meta de Calorias Gastas (kcal)
              </Text>
            </View>
            <AppTextField
              filter="inteiro"
              maxValue={10000}
              label=""
              value={metaCaloriasGastas}
              onChangeText={setMetaCaloriasGastas}
            />
          </View>
        </View>
      </AppCard>

      <AppCard style={{ backgroundColor: colors.secondaryLight }}>
        <Text style={styles.sectionTitle}>Horários dos Lembretes</Text>
        <Text style={styles.mutedText}>
          Ative ou desative os lembretes e escolha o horário de cada um (formato
          HH:MM, ex.: 07:30). Eles aparecem na tela inicial e em Notificações.
        </Text>
        <View style={{ gap: spacing.md, marginTop: spacing.md }}>
          {lembretes.map((l) => (
            <View key={l.id} style={styles.lembreteItem}>
              <View style={styles.lembreteTopo}>
                <Text style={[styles.switchLabel, styles.lembreteTitulo]}>
                  {l.titulo}
                </Text>
                <AppSwitch
                  value={l.ativo}
                  onValueChange={(v) => alternarLembrete(l, v)}
                />
              </View>
              <View style={styles.horarioBox}>
                <AppTextField
                  label="Horário"
                  filter="horario"
                  placeholder="HH:MM"
                  value={horarioAtual(l)}
                  onChangeText={(t) =>
                    setHorarios((h) => ({ ...h, [l.id]: t }))
                  }
                  onBlur={() => salvarHorario(l)}
                  icon={
                    <Feather
                      name="clock"
                      size={20}
                      color={colors.mutedForeground}
                    />
                  }
                />
              </View>
            </View>
          ))}
          {erroLembrete && (
            <FormMessage tipo="erro">{erroLembrete}</FormMessage>
          )}
        </View>
      </AppCard>

      {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

      <AppButton
        title="Salvar Configurações"
        icon={<Feather name="save" size={20} color={colors.white} />}
        onPress={handleSalvar}
        loading={carregando}
      />
    </View>
  );
}
