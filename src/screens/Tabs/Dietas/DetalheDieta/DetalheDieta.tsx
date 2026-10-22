import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppChip,
  ConfirmDialog,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../../../components";
import { colors } from "../../../../theme/colors";
import { fontSize, radius, spacing } from "../../../../theme/typography";
import { useAuth } from "../../../../contexts/AuthContext";
import { useApiQuery } from "../../../../hooks/useApiQuery";
import { mensagemDeErro } from "../../../services/api";
import { dietasApi } from "../../../services/endpoints";
import { decimal } from "../../../../utils/format";

import { styles } from "./DetalheDieta.styles";

export default function DetalheDieta() {
  const { dietaId } = useLocalSearchParams<{ dietaId: string }>();
  const { usuario } = useAuth();
  const {
    data: dieta,
    loading,
    error,
    recarregar,
    setData,
  } = useApiQuery(() => dietasApi.obter(Number(dietaId)), [dietaId]);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  const excluir = async () => {
    if (!dieta) return;
    setConfirmarExclusao(false);
    setOcupado(true);
    try {
      await dietasApi.excluir(dieta.id);
      router.back();
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
      setOcupado(false);
    }
  };

  const alternarPublicacao = async () => {
    if (!dieta) return;
    setErroAcao(null);
    setOcupado(true);
    try {
      const atualizada =
        dieta.status === "PUBLICA"
          ? await dietasApi.despublicar(dieta.id)
          : await dietasApi.publicar(dieta.id);
      setData(atualizada);
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Detalhes da Dieta" onBack={() => router.back()} />

      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {dieta && (
          <View style={styles.content}>
            <AppCard>
              <Text style={styles.title}>{dieta.nome}</Text>
              <AppChip
                label={dieta.status === "PUBLICA" ? "Pública" : "Privada"}
                color={
                  dieta.status === "PUBLICA"
                    ? colors.secondary
                    : colors.mutedForeground
                }
                icon={
                  dieta.status === "PUBLICA" ? (
                    <Feather name="globe" size={14} color={colors.white} />
                  ) : undefined
                }
              />
              {dieta.creditoNome && (
                <Text style={styles.mutedLabel}>
                  Criada por {dieta.creditoNome}
                </Text>
              )}
              <Text style={styles.description}>{dieta.descricao}</Text>

              <View style={styles.infoRow}>
                <Feather name="zap" size={26} color={colors.primary} />
                <View>
                  <Text style={styles.mutedLabel}>Meta Calórica</Text>
                  <Text style={styles.infoValue}>{dieta.calorias} kcal</Text>
                </View>
              </View>

              <View style={styles.macrosBox}>
                <Text style={styles.sectionTitle}>Macronutrientes</Text>
                <View style={styles.macrosGrid}>
                  <View style={styles.macroCell}>
                    <Text style={styles.mutedLabel}>Proteínas</Text>
                    <Text style={styles.infoValue}>
                      {decimal(dieta.proteinas)}g
                    </Text>
                  </View>
                  <View style={styles.macroCell}>
                    <Text style={styles.mutedLabel}>Carboidratos</Text>
                    <Text style={styles.infoValue}>
                      {decimal(dieta.carboidratos)}g
                    </Text>
                  </View>
                  <View style={styles.macroCell}>
                    <Text style={styles.mutedLabel}>Gorduras</Text>
                    <Text style={styles.infoValue}>
                      {decimal(dieta.gorduras)}g
                    </Text>
                  </View>
                </View>
              </View>
            </AppCard>

            {erroAcao && <FormMessage tipo="erro">{erroAcao}</FormMessage>}

            <View style={{ gap: spacing.sm }}>
              <AppButton
                title="Editar Dieta"
                color={colors.secondary}
                icon={<Feather name="edit-2" size={20} color={colors.white} />}
                onPress={() => router.push(`/(tabs)/dietas/editar/${dieta.id}`)}
              />
              <AppButton
                title="Excluir Dieta"
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
                    dieta.status === "PUBLICA"
                      ? "Tornar Dieta Privada"
                      : "Publicar Dieta"
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
        title="Excluir dieta?"
        message="Esta dieta será apagada. Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        confirmColor={colors.destructive}
        onConfirm={excluir}
        onCancel={() => setConfirmarExclusao(false)}
      />
    </Screen>
  );
}
