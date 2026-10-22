import React, { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppTextField,
  FormMessage,
  IconCircle,
} from "../../../components";
import { colors } from "../../../theme/colors";
import { fontSize, radius, spacing } from "../../../theme/typography";
import { emailValido } from "../../../utils/inputFilters";
import { authApi } from "../../services/endpoints";
import { mensagemDeErro } from "../../services/api";

import { styles } from "./RecuperacaoSenha.styles";

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [concluido, setConcluido] = useState(false);

  const handleEnviar = async () => {
    if (!emailValido(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await authApi.esqueciSenha(email.trim());
      setEnviado(true);
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  const handleRedefinir = async () => {
    if (codigo.length !== 6) {
      setErro("O código tem 6 números.");
      return;
    }
    if (novaSenha.length < 8) {
      setErro("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      await authApi.redefinirSenha(email.trim(), codigo, novaSenha);
      setConcluido(true);
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.secondary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu e-mail para receber o código
          </Text>
        </View>

        {enviado && (
          <View style={styles.alert}>
            <Feather name="check-circle" size={20} color={colors.primaryDark} />
            <Text style={styles.alertText}>
              {concluido
                ? "Senha redefinida! Volte para o login e entre com a nova senha."
                : "Se o e-mail estiver cadastrado, enviamos um código de 6 números. Digite-o abaixo com a sua nova senha."}
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <AppTextField
            filter="email"
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            editable={!enviado}
            icon={
              <Feather name="mail" size={20} color={colors.mutedForeground} />
            }
          />

          {enviado && !concluido && (
            <>
              <AppTextField
                label="Código recebido por e-mail"
                value={codigo}
                onChangeText={(t) =>
                  setCodigo(t.replace(/\D/g, "").slice(0, 6))
                }
                keyboardType="number-pad"
                maxLength={6}
                icon={
                  <Feather
                    name="hash"
                    size={20}
                    color={colors.mutedForeground}
                  />
                }
              />
              <AppTextField
                filter="senha"
                label="Nova senha (mínimo 8 caracteres)"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
                icon={
                  <Feather
                    name="lock"
                    size={20}
                    color={colors.mutedForeground}
                  />
                }
              />
            </>
          )}

          {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

          {!concluido && (
            <AppButton
              title={
                enviado ? "Redefinir Senha" : "Enviar Código de Recuperação"
              }
              color={colors.secondary}
              onPress={enviado ? handleRedefinir : handleEnviar}
              loading={carregando}
            />
          )}
          {enviado && !concluido && (
            <AppButton
              title="Enviar novo código"
              variant="text"
              color={colors.secondary}
              onPress={handleEnviar}
            />
          )}
          <AppButton
            title="Voltar para Login"
            variant="text"
            icon={
              <Feather name="arrow-left" size={18} color={colors.primary} />
            }
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
}
