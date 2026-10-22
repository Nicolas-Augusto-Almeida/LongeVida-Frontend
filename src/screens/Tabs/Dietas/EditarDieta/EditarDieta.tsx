import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppSwitch,
  AppTextField,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../../../components";
import { colors } from "../../../../theme/colors";
import { spacing } from "../../../../theme/typography";
import { useAuth } from "../../../../contexts/AuthContext";
import { useApiQuery } from "../../../../hooks/useApiQuery";
import { mensagemDeErro } from "../../../services/api";
import { dietasApi } from "../../../services/endpoints";
import type { Dieta } from "../../../services/types";
import { lerNumero } from "../../../../utils/format";

import { styles } from "./EditarDieta.styles";

export default function EditarDieta() {
  const { dietaId } = useLocalSearchParams<{ dietaId: string }>();
  const {
    data: dieta,
    loading,
    error,
    recarregar,
  } = useApiQuery(() => dietasApi.obter(Number(dietaId)), [dietaId]);

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Editar Dieta" onBack={() => router.back()} />
      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {dieta && <FormularioDieta dieta={dieta} />}
      </QueryBoundary>
    </Screen>
  );
}

function FormularioDieta({ dieta }: { dieta: Dieta }) {
  const { usuario } = useAuth();
  const [nome, setNome] = useState(dieta.nome);
  const [descricao, setDescricao] = useState(dieta.descricao ?? "");
  const [calorias, setCalorias] = useState(String(dieta.calorias));
  const [proteinas, setProteinas] = useState(String(dieta.proteinas));
  const [carboidratos, setCarboidratos] = useState(String(dieta.carboidratos));
  const [gorduras, setGorduras] = useState(String(dieta.gorduras));
  const [publicar, setPublicar] = useState(dieta.status === "PUBLICA");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !calorias) {
      setErro("Preencha o nome, a descrição e a meta calórica.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await dietasApi.atualizar(dieta.id, {
        nome,
        descricao,
        calorias: Number(calorias),
        proteinas: lerNumero(proteinas) || 0,
        carboidratos: lerNumero(carboidratos) || 0,
        gorduras: lerNumero(gorduras) || 0,
        ...(usuario?.isProfissional ? { publicar } : {}),
      });
      router.back();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.content}>
      <AppCard>
        <View style={{ gap: spacing.md }}>
          <AppTextField
            filter="texto"
            label="Nome da Dieta"
            value={nome}
            onChangeText={setNome}
          />
          <AppTextField
            filter="descricao"
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
          />
          <AppTextField
            filter="inteiro"
            maxValue={10000}
            label="Meta Calórica (kcal)"
            value={calorias}
            onChangeText={setCalorias}
          />

          <Text style={styles.sectionTitle}>Macronutrientes (gramas)</Text>
          <AppTextField
            filter="decimal"
            maxValue={1000}
            label="Proteínas"
            value={proteinas}
            onChangeText={setProteinas}
          />
          <AppTextField
            filter="decimal"
            maxValue={1000}
            label="Carboidratos"
            value={carboidratos}
            onChangeText={setCarboidratos}
          />
          <AppTextField
            filter="decimal"
            maxValue={1000}
            label="Gorduras"
            value={gorduras}
            onChangeText={setGorduras}
          />

          {usuario?.isProfissional && (
            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <Feather name="globe" size={20} color={colors.foreground} />
                <Text style={styles.switchText}>
                  Publicar Dieta (Perfil Profissional)
                </Text>
              </View>
              <AppSwitch value={publicar} onValueChange={setPublicar} />
            </View>
          )}
        </View>
      </AppCard>

      {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

      <View style={styles.actions}>
        <AppButton
          title="Salvar Alterações"
          icon={<Feather name="save" size={20} color={colors.white} />}
          onPress={handleSalvar}
          loading={carregando}
        />
        <AppButton
          title="Cancelar"
          variant="outlined"
          color={colors.mutedForeground}
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}
