import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppChip,
  FormMessage,
  IconCircle,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { comunidadeApi } from "../services/endpoints";
import { NIVEL_TREINO_LABEL } from "../../utils/labels";

import { styles } from "./ImportarTreino.styles";

export default function ImportarTreino() {
  const { treinoId: treinoIdParam } = useLocalSearchParams<{
    treinoId: string;
  }>();
  const treinoId = Number(treinoIdParam);
  const {
    data: treino,
    loading,
    error,
    recarregar,
  } = useApiQuery(() => comunidadeApi.treinoPublico(treinoId), [treinoId]);
  const [importando, setImportando] = useState(false);
  const [erroImportar, setErroImportar] = useState<string | null>(null);

  const handleImportar = async () => {
    setErroImportar(null);
    setImportando(true);
    try {
      await comunidadeApi.importarTreino(treinoId);
      router.replace("/(tabs)/treinos");
    } catch (e) {
      setErroImportar(mensagemDeErro(e));
      setImportando(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Importar Treino"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
      />

      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {treino && (
          <View style={styles.content}>
            <AppCard style={{ alignItems: "center" }}>
              <IconCircle color={colors.secondaryLight} size={88}>
                <Feather name="download" size={40} color={colors.secondary} />
              </IconCircle>
              <Text style={styles.title}>{treino.nome}</Text>
              <Text style={styles.subtitle}>
                Publicado por {treino.autor.nome}
              </Text>
              <View style={{ marginTop: spacing.md }}>
                <AppChip
                  label={NIVEL_TREINO_LABEL[treino.nivel]}
                  color={colors.secondary}
                  size="medium"
                />
              </View>
              <Text style={styles.description}>
                Este treino será adicionado à sua lista de "Meus Treinos" como
                uma cópia editável, mantendo o crédito ao profissional que o
                publicou.
              </Text>
            </AppCard>

            {erroImportar && (
              <FormMessage tipo="erro">{erroImportar}</FormMessage>
            )}

            <AppButton
              title="Importar Treino"
              color={colors.secondary}
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
