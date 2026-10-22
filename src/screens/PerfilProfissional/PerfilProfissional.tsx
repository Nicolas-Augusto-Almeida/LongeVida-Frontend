import React, { useState } from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppAvatar,
  AppButton,
  AppCard,
  AppChip,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { fontSize, radius, spacing } from "../../theme/typography";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { comunidadeApi } from "../services/endpoints";
import { NIVEL_TREINO_LABEL } from "../../utils/labels";

import { styles } from "./PerfilProfissional.styles";
export default function PerfilProfissional() {
  const { profissionalId } = useLocalSearchParams<{ profissionalId: string }>();
  const {
    data: profissional,
    loading,
    error,
    recarregar,
    setData,
  } = useApiQuery(
    () => comunidadeApi.profissional(Number(profissionalId)),
    [profissionalId],
  );
  const [ocupado, setOcupado] = useState(false);
  const [erroSeguir, setErroSeguir] = useState<string | null>(null);

  const alternarSeguir = async () => {
    if (!profissional) return;
    setErroSeguir(null);
    setOcupado(true);
    try {
      setData(
        profissional.seguindo
          ? await comunidadeApi.deixarDeSeguir(profissional.id)
          : await comunidadeApi.seguir(profissional.id),
      );
    } catch (e) {
      setErroSeguir(mensagemDeErro(e));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader
        title="Perfil Profissional"
        backgroundColor={colors.secondary}
        onBack={() => router.back()}
      />

      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {profissional && (
          <View style={styles.content}>
            <AppCard>
              <View style={styles.profileHeader}>
                <AppAvatar
                  uri={profissional.foto ?? undefined}
                  label={profissional.nome}
                  size={88}
                />
                <Text style={styles.nome}>{profissional.nome}</Text>
                <AppChip
                  label={profissional.especialidade}
                  color={colors.secondary}
                  size="medium"
                />
                <View style={styles.followRow}>
                  <Feather
                    name="user-check"
                    size={18}
                    color={colors.mutedForeground}
                  />
                  <Text style={styles.mutedText}>
                    {profissional.seguidores.toLocaleString("pt-BR")} seguidores
                  </Text>
                </View>
              </View>
              {!!profissional.descricao && (
                <Text style={styles.descricao}>{profissional.descricao}</Text>
              )}

              {erroSeguir && (
                <FormMessage tipo="erro">{erroSeguir}</FormMessage>
              )}
              {!profissional.ehVoce && (
                <AppButton
                  title={profissional.seguindo ? "Deixar de Seguir" : "Seguir"}
                  variant={profissional.seguindo ? "outlined" : "contained"}
                  color={colors.secondary}
                  icon={
                    <Feather
                      name={profissional.seguindo ? "user-check" : "user-plus"}
                      size={20}
                      color={
                        profissional.seguindo ? colors.secondary : colors.white
                      }
                    />
                  }
                  loading={ocupado}
                  onPress={alternarSeguir}
                />
              )}
            </AppCard>
            {profissional.dietas.length > 0 && (
              <AppCard>
                <View style={styles.sectionTitleRow}>
                  <Feather name="clipboard" size={22} color={colors.primary} />
                  <Text style={styles.sectionTitle}>Dietas Publicadas</Text>
                </View>
                {profissional.dietas.map((dieta) => (
                  <View key={dieta.id} style={styles.listItem}>
                    <View style={styles.listItemInfo}>
                      <Text style={styles.listItemTitle}>{dieta.nome}</Text>
                      <Text style={styles.mutedText}>
                        {dieta.calorias} kcal
                      </Text>
                    </View>
                    <AppButton
                      title="Importar"
                      fullWidth={false}
                      style={styles.importarBtn}
                      onPress={() => router.push(`/importar-dieta/${dieta.id}`)}
                    />
                  </View>
                ))}
              </AppCard>
            )}
            {profissional.treinos.length > 0 && (
              <AppCard>
                <View style={styles.sectionTitleRow}>
                  <Feather name="zap" size={22} color={colors.secondary} />
                  <Text style={styles.sectionTitle}>Treinos Publicados</Text>
                </View>
                {profissional.treinos.map((treino) => (
                  <View key={treino.id} style={styles.listItem}>
                    <View style={styles.listItemInfo}>
                      <Text style={styles.listItemTitle}>{treino.nome}</Text>
                      <Text style={styles.mutedText}>
                        {NIVEL_TREINO_LABEL[treino.nivel]}
                      </Text>
                    </View>
                    <AppButton
                      title="Importar"
                      fullWidth={false}
                      color={colors.secondary}
                      style={styles.importarBtn}
                      onPress={() =>
                        router.push(`/importar-treino/${treino.id}`)
                      }
                    />
                  </View>
                ))}
              </AppCard>
            )}
          </View>
        )}
      </QueryBoundary>
    </Screen>
  );
}
