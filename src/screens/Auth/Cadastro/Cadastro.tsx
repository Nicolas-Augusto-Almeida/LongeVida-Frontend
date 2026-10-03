import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppSelect, AppSwitch, AppTextField, IconCircle } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';
import { profissionais, usuarioAtual } from '../../../data/mockData';
import { emailValido } from '../../../utils/inputFilters';

import { styles } from './Cadastro.styles';

const ESPECIALIDADES = [
  { label: 'Nutricionista', value: 'Nutricionista' },
  { label: 'Personal Trainer', value: 'Personal Trainer' },
  { label: 'Educador Físico', value: 'Educador Físico' },
  { label: 'Geriatra', value: 'Geriatra' },
  { label: 'Fisioterapeuta', value: 'Fisioterapeuta' },
  { label: 'Outra', value: 'outra' },
];

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [idade, setIdade] = useState('');

  // Perfil profissional (opcional)
  const [criarPerfilProfissional, setCriarPerfilProfissional] = useState(false);
  const [especialidade, setEspecialidade] = useState('');
  const [outraEspecialidade, setOutraEspecialidade] = useState('');
  const [registro, setRegistro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const especialidadeFinal = especialidade === 'outra' ? outraEspecialidade.trim() : especialidade;

  const dadosBasicosOk = !!(nome && emailValido(email) && senha && confirmarSenha && idade && senha === confirmarSenha);
  const dadosProfissionaisOk = !criarPerfilProfissional || !!(especialidadeFinal && registro.trim());

  const handleCadastro = () => {
    setTentouEnviar(true);
    if (!dadosBasicosOk || !dadosProfissionaisOk) return;

    // Atualiza os dados mockados em memória (substituir por POST /usuarios na API).
    usuarioAtual.nome = nome;
    usuarioAtual.idade = Number(idade) || usuarioAtual.idade;
    usuarioAtual.isProfissional = criarPerfilProfissional;

    if (criarPerfilProfissional) {
      profissionais.push({
        id: Math.max(0, ...profissionais.map((p) => p.id)) + 1,
        nome,
        especialidade: especialidadeFinal,
        descricao: descricao.trim(),
        seguidores: 0,
        foto: '',
        dietas: [],
        treinos: [],
      });
    }

    router.replace('/primeiro-acesso');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.headerGroup}>
            <IconCircle color={colors.primary} size={96}>
              <Feather name="activity" size={48} color={colors.white} />
            </IconCircle>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Comece sua jornada para uma vida mais saudável</Text>
          </View>

          <View style={styles.form}>
            <AppTextField filter="nome" label="Nome" value={nome} onChangeText={setNome} icon={<Feather name="user" size={20} color={colors.mutedForeground} />} />
            <AppTextField filter="email" label="E-mail" value={email} onChangeText={setEmail} icon={<Feather name="mail" size={20} color={colors.mutedForeground} />} />
            <AppTextField filter="senha" label="Senha" value={senha} onChangeText={setSenha} secureTextEntry icon={<Feather name="lock" size={20} color={colors.mutedForeground} />} />
            <AppTextField filter="senha" label="Confirmar Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry icon={<Feather name="lock" size={20} color={colors.mutedForeground} />} />
            {tentouEnviar && confirmarSenha !== '' && senha !== confirmarSenha && (
              <Text style={styles.erroText}>As senhas não coincidem.</Text>
            )}
            <AppTextField filter="inteiro" maxValue={120} label="Idade" value={idade} onChangeText={setIdade} icon={<Feather name="calendar" size={20} color={colors.mutedForeground} />} />

            <View style={styles.profissionalToggle}>
              <View style={styles.switchRow}>
                <View style={styles.switchLabel}>
                  <Feather name="briefcase" size={22} color={colors.secondaryDark} />
                  <Text style={styles.switchText}>Sou profissional de saúde</Text>
                </View>
                <AppSwitch value={criarPerfilProfissional} onValueChange={setCriarPerfilProfissional} color={colors.secondary} />
              </View>
              <Text style={styles.helperText}>
                Crie também um perfil profissional para publicar dietas e treinos na comunidade.
              </Text>
            </View>

            {criarPerfilProfissional && (
              <View style={styles.profissionalBox}>
                <Text style={styles.sectionTitle}>Perfil Profissional</Text>

                <AppSelect label="Especialidade" value={especialidade} onChange={setEspecialidade} options={ESPECIALIDADES} />
                {especialidade === 'outra' && (
                  <AppTextField filter="nome" maxLength={40} label="Qual especialidade?" value={outraEspecialidade} onChangeText={setOutraEspecialidade} />
                )}
                <AppTextField filter="registro"
                  label="Registro Profissional (CRN, CREF, CRM...)"
                  value={registro}
                  onChangeText={setRegistro}
                  icon={<Feather name="award" size={20} color={colors.mutedForeground} />}
                />
                <AppTextField filter="descricao"
                  label="Descrição (opcional)"
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                  numberOfLines={4}
                  placeholder="Conte um pouco sobre sua experiência e áreas de atuação"
                />
                {tentouEnviar && !dadosProfissionaisOk && (
                  <Text style={styles.erroText}>Informe a especialidade e o registro profissional.</Text>
                )}
              </View>
            )}

            <AppButton title="Cadastrar" onPress={handleCadastro} />
            <AppButton title="Já tem uma conta? Entrar" variant="text" color={colors.secondary} onPress={() => router.back()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
