import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  AppButton,
  AppTextField,
  FormMessage,
  IconCircle,
} from "../../../components";
import { colors } from "../../../theme/colors";
import { fontSize, spacing } from "../../../theme/typography";
import { emailValido } from "../../../utils/inputFilters";
import { useAuth } from "../../../contexts/AuthContext";
import { mensagemDeErro } from "../../services/api";

import { styles } from "./Login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailValido(email) || !senha) {
      setErro("Informe um e-mail válido e a sua senha.");
      return;
    }
    setErro(null);
    setCarregando(true);
    try {
      const usuario = await login(email, senha);
      router.replace(
        usuario.perfilSaudeCompleto ? "/(tabs)/home" : "/primeiro-acesso",
      );
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.primary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>LongeVida</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
        </View>

        <View style={styles.form}>
          <AppTextField
            filter="email"
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            icon={
              <Feather name="mail" size={20} color={colors.mutedForeground} />
            }
          />
          <AppTextField
            filter="senha"
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            icon={
              <Feather name="lock" size={20} color={colors.mutedForeground} />
            }
          />

          {erro && <FormMessage tipo="erro">{erro}</FormMessage>}

          <AppButton
            title="Entrar"
            onPress={handleLogin}
            loading={carregando}
          />

          <View style={{ gap: 12, marginTop: 4 }}>
            <AppButton
              title="Criar Conta"
              variant="outlined"
              onPress={() => router.push("/cadastro")}
            />
            <AppButton
              title="Esqueci Minha Senha"
              variant="text"
              color={colors.secondary}
              onPress={() => router.push("/recuperacao-senha")}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
