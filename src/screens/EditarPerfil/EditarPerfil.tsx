import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppCard,
  AppCheckbox,
  AppSelect,
  AppTextField,
  FormMessage,
  Screen,
  ScreenHeader,
} from "../../components";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/typography";
import { useAuth } from "../../contexts/AuthContext";
import { mensagemDeErro } from "../services/api";
import { usuarioApi } from "../services/endpoints";
import type { NivelAtividade, Restricao } from "../services/types";
import { NIVEIS_ATIVIDADE_OPCOES } from "../../utils/labels";
import { lerNumero } from "../../utils/format";

import { styles } from "./EditarPerfil.styles";

const RESTRICOES: { chave: Restricao; label: string }[] = [
  { chave: "DIABETES", label: "Diabetes" },
  { chave: "HIPERTENSAO", label: "Hipertensão" },
  { chave: "LACTOSE", label: "Intolerância à Lactose" },
  { chave: "GLUTEN", label: "Glúten" },
  { chave: "OUTRAS", label: "Outras" },
];

export default function EditarPerfil() {
  const { usuario, atualizarUsuario } = useAuth();
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [idade, setIdade] = useState(usuario ? String(usuario.idade) : "");
  const [peso, setPeso] = useState(
    usuario?.peso != null ? String(usuario.peso) : "",
  );
  const [altura, setAltura] = useState(
    usuario?.altura != null ? String(usuario.altura) : "",
  );
  const [nivel, setNivel] = useState<string>(usuario?.nivelAtividade ?? "");
  const [restricoes, setRestricoes] = useState<Restricao[]>(
    usuario?.restricoes ?? [],
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const toggle = (chave: Restricao) =>
    setRestricoes((prev) =>
      prev.includes(chave) ? prev.filter((r) => r !== chave) : [...prev, chave],
    );

  const handleSalvar = async () => {
    if (!nome.trim() || !idade || !peso || !altura || !nivel) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      const atualizado = await usuarioApi.atualizar({
        nome: nome.trim(),
        idade: Number(idade),
        peso: lerNumero(peso),
        altura: Number(altura),
        nivelAtividade: nivel as NivelAtividade,
        restricoes,
      });
      atualizarUsuario(atualizado);
      router.back();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Editar Perfil" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={{ gap: spacing.md }}>
            <AppTextField
              filter="nome"
              maxLength={80}
              label="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <AppTextField
              filter="inteiro"
              maxValue={120}
              label="Idade"
              value={idade}
              onChangeText={setIdade}
            />
            <AppTextField
              filter="decimal"
              maxValue={500}
              label="Peso (kg)"
              value={peso}
              onChangeText={setPeso}
            />
            <AppTextField
              filter="inteiro"
              maxValue={250}
              label="Altura (cm)"
              value={altura}
              onChangeText={setAltura}
            />
            <AppSelect
              label="Nível de Atividade Física"
              value={nivel}
              onChange={setNivel}
              options={NIVEIS_ATIVIDADE_OPCOES}
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
        </AppCard>
      </View>
    </Screen>
  );
}
