import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppDivider,
  AppSelect,
  AppTextField,
  FormMessage,
  IconButtonCircle,
  IconCircle,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { alimentosApi, refeicoesApi } from "../services/endpoints";
import { horarioValido } from "../../utils/inputFilters";
import { lerNumero } from "../../utils/format";

import { styles } from "./RegistrarRefeicao.styles";

interface AlimentoAdicionado {
  id: number;
  alimentoId: number;
  nome: string;
  quantidade: number;
  unidade: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

export default function RegistroRefeicao() {
  const [nomeRefeicao, setNomeRefeicao] = useState("");
  const [horario, setHorario] = useState("");
  const [alimentoSelecionadoId, setAlimentoSelecionadoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [alimentosAdicionados, setAlimentosAdicionados] = useState<
    AlimentoAdicionado[]
  >([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const {
    data: catalogo,
    loading: carregandoCatalogo,
    error: erroCatalogo,
    recarregar,
  } = useApiQuery(() => alimentosApi.listar());
  const opcoesAlimentos = useMemo(
    () =>
      (catalogo ?? []).map((a) => ({
        label: `${a.nome} (${a.porcao})`,
        value: String(a.id),
      })),
    [catalogo],
  );

  const adicionarAlimento = () => {
    const qtd = lerNumero(quantidade);
    if (!alimentoSelecionadoId || !(qtd > 0)) return;
    const alimento = catalogo?.find(
      (a) => a.id === Number(alimentoSelecionadoId),
    );
    if (!alimento) return;

    const fator = qtd / alimento.porcaoQuantidade;

    const novo: AlimentoAdicionado = {
      id: Date.now(),
      alimentoId: alimento.id,
      nome: alimento.nome,
      quantidade: qtd,
      unidade:
        alimento.porcaoUnidade === "unidade"
          ? "unidade(s)"
          : alimento.porcaoUnidade,
      calorias: Math.round(alimento.calorias * fator),
      proteinas: Math.round(alimento.proteinas * fator * 10) / 10,
      carboidratos: Math.round(alimento.carboidratos * fator * 10) / 10,
      gorduras: Math.round(alimento.gorduras * fator * 10) / 10,
    };

    setAlimentosAdicionados((prev) => [...prev, novo]);
    setAlimentoSelecionadoId("");
    setQuantidade("");
  };

  const removerAlimento = (id: number) =>
    setAlimentosAdicionados((prev) => prev.filter((a) => a.id !== id));

  const totais = useMemo(
    () =>
      alimentosAdicionados.reduce(
        (acc, item) => ({
          calorias: acc.calorias + item.calorias,
          proteinas: Math.round((acc.proteinas + item.proteinas) * 10) / 10,
          carboidratos:
            Math.round((acc.carboidratos + item.carboidratos) * 10) / 10,
          gorduras: Math.round((acc.gorduras + item.gorduras) * 10) / 10,
        }),
        { calorias: 0, proteinas: 0, carboidratos: 0, gorduras: 0 },
      ),
    [alimentosAdicionados],
  );

  const podeRegistrar =
    !!nomeRefeicao && horarioValido(horario) && alimentosAdicionados.length > 0;

  const handleRegistrar = async () => {
    if (!podeRegistrar) return;
    setErro(null);
    setCarregando(true);
    try {
      await refeicoesApi.registrar({
        nome: nomeRefeicao.trim(),
        horario,
        itens: alimentosAdicionados.map((a) => ({
          alimentoId: a.alimentoId,
          quantidade: a.quantidade,
        })),
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
      <ScreenHeader title="Registrar Refeição" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={styles.iconRow}>
            <IconCircle color={colors.primaryLight} size={88}>
              <Feather name="coffee" size={40} color={colors.primary} />
            </IconCircle>
          </View>
          <View style={{ gap: spacing.md, marginTop: spacing.md }}>
            <AppTextField
              filter="texto"
              maxLength={40}
              label="Nome da Refeição"
              value={nomeRefeicao}
              onChangeText={setNomeRefeicao}
              placeholder="Ex: Café da manhã, Almoço, Jantar"
            />
            <AppTextField
              filter="horario"
              label="Horário"
              value={horario}
              onChangeText={setHorario}
              placeholder="Ex: 12:30"
              icon={
                <Feather
                  name="clock"
                  size={20}
                  color={colors.mutedForeground}
                />
              }
            />
          </View>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Adicionar Alimentos</Text>
          <QueryBoundary
            loading={carregandoCatalogo}
            error={erroCatalogo}
            onRetry={recarregar}
          >
            <View style={{ gap: spacing.md }}>
              <AppSelect
                label="Selecione um Alimento"
                value={alimentoSelecionadoId}
                onChange={setAlimentoSelecionadoId}
                options={opcoesAlimentos}
              />
              <View style={styles.addRow}>
                <View style={{ flex: 1 }}>
                  <AppTextField
                    filter="decimal"
                    maxValue={5000}
                    label="Quantidade"
                    value={quantidade}
                    onChangeText={setQuantidade}
                    placeholder="Ex: 100, 150, 200"
                  />
                </View>
                <IconButtonCircle
                  color={
                    alimentoSelecionadoId && quantidade
                      ? colors.primary
                      : colors.disabled
                  }
                  accessibilityLabel="Adicionar alimento"
                  onPress={adicionarAlimento}
                >
                  <Feather name="plus" size={26} color={colors.white} />
                </IconButtonCircle>
              </View>
            </View>
          </QueryBoundary>
        </AppCard>

        {alimentosAdicionados.length > 0 && (
          <AppCard>
            <Text style={styles.sectionTitle}>Alimentos Adicionados</Text>
            {alimentosAdicionados.map((item, index) => (
              <View key={item.id}>
                {index > 0 && <AppDivider style={{ marginVertical: 12 }} />}
                <View style={styles.foodRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{item.nome}</Text>
                    <Text style={styles.mutedText}>
                      {item.quantidade} {item.unidade}
                    </Text>
                    <View style={styles.macrosGrid}>
                      <Text style={styles.macroText}>
                        🔥 {item.calorias} kcal
                      </Text>
                      <Text style={styles.macroText}>P: {item.proteinas}g</Text>
                      <Text style={styles.macroText}>
                        C: {item.carboidratos}g
                      </Text>
                      <Text style={styles.macroText}>G: {item.gorduras}g</Text>
                    </View>
                  </View>
                  <IconButtonCircle
                    color="transparent"
                    accessibilityLabel="Remover alimento"
                    onPress={() => removerAlimento(item.id)}
                  >
                    <Feather
                      name="trash-2"
                      size={22}
                      color={colors.destructive}
                    />
                  </IconButtonCircle>
                </View>
              </View>
            ))}

            <AppDivider />

            <View style={styles.totaisBox}>
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>
                Totais da Refeição
              </Text>
              <View style={styles.macrosGrid2}>
                <View>
                  <Text style={styles.mutedText}>Calorias</Text>
                  <Text style={[styles.totalCalorias]}>
                    {totais.calorias} kcal
                  </Text>
                </View>
                <View>
                  <Text style={styles.mutedText}>Proteínas</Text>
                  <Text style={styles.totalValue}>{totais.proteinas}g</Text>
                </View>
                <View>
                  <Text style={styles.mutedText}>Carboidratos</Text>
                  <Text style={styles.totalValue}>{totais.carboidratos}g</Text>
                </View>
                <View>
                  <Text style={styles.mutedText}>Gorduras</Text>
                  <Text style={styles.totalValue}>{totais.gorduras}g</Text>
                </View>
              </View>
            </View>
          </AppCard>
        )}

        {alimentosAdicionados.length === 0 && (
          <AppCard style={{ backgroundColor: colors.background }}>
            <Text style={[styles.mutedText, { textAlign: "center" }]}>
              Adicione alimentos à sua refeição
            </Text>
          </AppCard>
        )}

        {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

        <AppButton
          title="Registrar Refeição"
          icon={<Feather name="save" size={20} color={colors.white} />}
          disabled={!podeRegistrar}
          loading={carregando}
          onPress={handleRegistrar}
        />
      </View>
    </Screen>
  );
}
