import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppAvatar,
  AppButton,
  AppCard,
  AppTextField,
  FormMessage,
  QueryBoundary,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/typography";
import { useAuth } from "../../contexts/AuthContext";
import { useApiQuery } from "../../hooks/useApiQuery";
import { mensagemDeErro } from "../services/api";
import { usuarioApi } from "../services/endpoints";
import type { MeuPerfilProfissional } from "../services/types";

import { styles } from "./EditarPerfilProfissional.styles";

export default function EditarPerfilProfissional() {
  const { data, loading, error, recarregar } = useApiQuery(() =>
    usuarioApi.meuPerfilProfissional(),
  );

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Perfil Profissional" onBack={() => router.back()} />
      <QueryBoundary loading={loading} error={error} onRetry={recarregar}>
        {data && <Formulario perfil={data} />}
      </QueryBoundary>
    </Screen>
  );
}

function Formulario({ perfil }: { perfil: MeuPerfilProfissional }) {
  const { usuario } = useAuth();
  const [especialidade, setEspecialidade] = useState(perfil.especialidade);
  const [descricao, setDescricao] = useState(perfil.descricao ?? "");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSalvar = async () => {
    if (!especialidade.trim()) {
      setErro("Informe a especialidade.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await usuarioApi.atualizarPerfilProfissional({
        especialidade: especialidade.trim(),
        descricao,
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
        <View style={styles.avatarBlock}>
          <AppAvatar label={usuario?.nome} size={100} />
        </View>

        <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
          <AppTextField
            filter="nome"
            maxLength={40}
            label="Especialidade"
            value={especialidade}
            onChangeText={setEspecialidade}
          />
          <AppTextField
            filter="descricao"
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
            placeholder="Conte um pouco sobre sua experiência e áreas de atuação"
          />
          {erro && <FormMessage tipo="erro">{erro}</FormMessage>}
          <AppButton
            title="Salvar Perfil Profissional"
            icon={<Feather name="save" size={20} color={colors.white} />}
            onPress={handleSalvar}
            loading={carregando}
          />
        </View>
      </AppCard>
    </View>
  );
}
