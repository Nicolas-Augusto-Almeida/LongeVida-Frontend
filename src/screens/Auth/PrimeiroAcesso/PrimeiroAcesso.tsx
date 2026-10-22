import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCheckbox,
  AppSelect,
  AppTextField,
  FormMessage,
  IconCircle,
  Screen,
} from "../../../components";
import { colors } from "../../../theme/colors";
import { fontSize, spacing } from "../../../theme/typography";
import { useAuth } from "../../../contexts/AuthContext";
import { mensagemDeErro } from "../../services/api";
import { usuarioApi } from "../../services/endpoints";
import type { NivelAtividade, Restricao } from "../../services/types";
import { NIVEIS_ATIVIDADE_OPCOES } from "../../../utils/labels";
import { lerNumero } from "../../../utils/format";

import { styles } from "./PrimeiroAcesso.styles";

const RESTRICOES: { chave: Restricao; label: string }[] = [
  { chave: "DIABETES", label: "Diabetes" },
  { chave: "HIPERTENSAO", label: "Hipertensão" },
  { chave: "LACTOSE", label: "Intolerância à Lactose" },
  { chave: "GLUTEN", label: "Glúten" },
  { chave: "OUTRAS", label: "Outras" },
];

export default function PrimeiroAcesso() {
  const { usuario, atualizarUsuario } = useAuth();
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [nivelAtividade, setNivelAtividade] = useState("");
  const [restricoes, setRestricoes] = useState<Restricao[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const toggle = (chave: Restricao) =>
    setRestricoes((prev) =>
      prev.includes(chave) ? prev.filter((r) => r !== chave) : [...prev, chave],
    );

  const handleSalvar = async () => {
    if (!usuario) return;
    if (!peso || !altura || !nivelAtividade) {
      setErro("Preencha o peso, a altura e o nível de atividade física.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      const atualizado = await usuarioApi.atualizar({
        nome: usuario.nome,
        idade: usuario.idade,
        peso: lerNumero(peso),
        altura: Number(altura),
        nivelAtividade: nivelAtividade as NivelAtividade,
        restricoes,
      });
      atualizarUsuario(atualizado);
      router.replace("/(tabs)/home");
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Screen contentStyle={styles.scrollContent}>
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.primary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>Informações de Saúde</Text>
          <Text style={styles.subtitle}>
            Vamos personalizar sua experiência
          </Text>
        </View>

        <View style={styles.form}>
          <AppTextField
            filter="decimal"
            maxValue={500}
            label="Peso (kg)"
            value={peso}
            onChangeText={setPeso}
            icon={
              <Feather name="anchor" size={20} color={colors.mutedForeground} />
            }
          />
          <AppTextField
            filter="inteiro"
            maxValue={250}
            label="Altura (cm)"
            value={altura}
            onChangeText={setAltura}
            icon={
              <Feather
                name="bar-chart-2"
                size={20}
                color={colors.mutedForeground}
              />
            }
          />

          <AppSelect
            label="Nível de Atividade Física"
            value={nivelAtividade}
            onChange={setNivelAtividade}
            options={NIVEIS_ATIVIDADE_OPCOES}
            icon={
              <Feather
                name="activity"
                size={20}
                color={colors.mutedForeground}
              />
            }
          />

          <View>
            <Text style={styles.sectionTitle}>Restrições Alimentares</Text>
            {RESTRICOES.map((r) => (
              <AppCheckbox
                key={r.chave}
                label={r.label}
                checked={restricoes.includes(r.chave)}
                onToggle={() => toggle(r.chave)}
              />
            ))}
          </View>

          {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

          <AppButton
            title="Salvar"
            onPress={handleSalvar}
            loading={carregando}
          />
        </View>
      </View>
    </Screen>
  );
}
