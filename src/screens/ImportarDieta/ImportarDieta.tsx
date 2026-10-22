import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  FormMessage,
  IconCircle,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { comunidadeApi } from "../services/endpoints";

import { styles } from "./ImportarDieta.styles";

export default function ImportarDieta() {
  const { dietaId: dietaIdParam } = useLocalSearchParams<{ dietaId: string }>();
  const dietaId = Number(dietaIdParam);
  const {
    data: dieta,
    loading,
    error,
    recarregar,
  } = useApiQuery(() => comunidadeApi.dietaPublica(dietaId), [dietaId]);
  const [importando, setImportando] = useState(false);
  const [erroImportar, setErroImportar] = useState<string | null>(null);

  const handleImportar = async () => {
    setErroImportar(null);
    setImportando(true);
    try {
      await comunidadeApi.importarDieta(dietaId);
      router.replace("/(tabs)/dietas");
    } catch (e) {
      setErroImportar(mensagemDeErro(e));
      setImportando(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Importar Dieta" onBack={() => router.back()} />

      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {dieta && (
          <View style={styles.content}>
            <AppCard style={{ alignItems: "center" }}>
              <IconCircle color={colors.primaryLight} size={88}>
                <Feather name="download" size={40} color={colors.primary} />
              </IconCircle>
              <Text style={styles.title}>{dieta.nome}</Text>
              <Text style={styles.subtitle}>
                Publicada por {dieta.autor.nome}
              </Text>
              <View style={styles.infoRow}>
                <Feather name="zap" size={22} color={colors.primary} />
                <Text style={styles.infoText}>{dieta.calorias} kcal</Text>
              </View>
              <Text style={styles.description}>
                Esta dieta será adicionada à sua lista de "Minhas Dietas" como
                uma cópia editável, mantendo o crédito ao profissional que a
                publicou.
              </Text>
            </AppCard>

            {erroImportar && (
              <FormMessage tipo="erro">{erroImportar}</FormMessage>
            )}

            <AppButton
              title="Importar Dieta"
              icon={<Feather name="download" size={20} color={colors.white} />}
              onPress={handleImportar}
              loading={importando}
            />
            <AppButton
              title="Cancelar"
              variant="outlined"
              color={colors.mutedForeground}
              onPress={() => router.back()}
            />
          </View>
        )}
      </QueryBoundary>
    </Screen>
  );
}
