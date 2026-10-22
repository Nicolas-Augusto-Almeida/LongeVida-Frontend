import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppSwitch,
  AppTextField,
  FormMessage,
  Screen,
  ScreenHeader,
} from "../../../../components";
import { colors } from "../../../../theme/colors";
import { fontSize, spacing } from "../../../../theme/typography";
import { useAuth } from "../../../../contexts/AuthContext";
import { mensagemDeErro } from "../../../services/api";
import { dietasApi } from "../../../services/endpoints";
import { lerNumero } from "../../../../utils/format";

import { styles } from "./CriarDieta.styles";

export default function CriarDieta() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [calorias, setCalorias] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [carboidratos, setCarboidratos] = useState("");
  const [gorduras, setGorduras] = useState("");
  const [publicar, setPublicar] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const { usuario } = useAuth();

  const handleSalvar = async () => {
    if (!nome.trim() || !descricao.trim() || !calorias) {
      setErro("Preencha o nome, a descrição e a meta calórica.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await dietasApi.criar({
        nome,
        descricao,
        calorias: Number(calorias),
        proteinas: lerNumero(proteinas) || 0,
        carboidratos: lerNumero(carboidratos) || 0,
        gorduras: lerNumero(gorduras) || 0,
        publicar: !!usuario?.isProfissional && publicar,
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
      <ScreenHeader title="Criar Nova Dieta" onBack={() => router.back()} />

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

        <AppButton
          title="Salvar Dieta"
          icon={<Feather name="save" size={20} color={colors.white} />}
          onPress={handleSalvar}
          loading={carregando}
        />
      </View>
    </Screen>
  );
}
