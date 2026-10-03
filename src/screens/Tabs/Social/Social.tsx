import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppAvatar, AppButton, AppCard, AppChip, AppSelect, AppTextField, Screen } from '../../../components';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/typography';
import { profissionais } from '../../../data/mockData';

import { styles } from './Social.styles';

type Conteudo = 'todos' | 'dietas' | 'treinos';

const CONTEUDOS: { label: string; value: Conteudo }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Com dietas', value: 'dietas' },
  { label: 'Com treinos', value: 'treinos' },
];

const ORDENACOES = [
  { label: 'Mais seguidores', value: 'seguidores' },
  { label: 'Nome (A–Z)', value: 'nome' },
  { label: 'Mais conteúdos publicados', value: 'conteudos' },
];

// Remove acentos e ignora maiúsculas, para "joao" encontrar "João".
const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function Social() {
  const [busca, setBusca] = useState('');
  const [especialidade, setEspecialidade] = useState('todas');
  const [conteudo, setConteudo] = useState<Conteudo>('todos');
  const [ordenacao, setOrdenacao] = useState('seguidores');

  const especialidades = useMemo(
    () => Array.from(new Set(profissionais.map((p) => p.especialidade))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [],
  );

  const filtrosAtivos = busca !== '' || especialidade !== 'todas' || conteudo !== 'todos' || ordenacao !== 'seguidores';

  const limparFiltros = () => {
    setBusca('');
    setEspecialidade('todas');
    setConteudo('todos');
    setOrdenacao('seguidores');
  };

  const resultados = useMemo(() => {
    // A busca encontra por nome, especialidade, descrição e também pelo nome das dietas/treinos publicados.
    const termos = normalizar(busca).split(/\s+/).filter(Boolean);

    const lista = profissionais.filter((p) => {
      const textoBusca = normalizar(
        [p.nome, p.especialidade, p.descricao, ...p.dietas.map((d) => d.nome), ...p.treinos.map((t) => t.nome)].join(' '),
      );
      if (!termos.every((t) => textoBusca.includes(t))) return false;
      if (especialidade !== 'todas' && p.especialidade !== especialidade) return false;
      if (conteudo === 'dietas' && p.dietas.length === 0) return false;
      if (conteudo === 'treinos' && p.treinos.length === 0) return false;
      return true;
    });

    return [...lista].sort((a, b) => {
      if (ordenacao === 'nome') return a.nome.localeCompare(b.nome, 'pt-BR');
      if (ordenacao === 'conteudos') return b.dietas.length + b.treinos.length - (a.dietas.length + a.treinos.length);
      return b.seguidores - a.seguidores;
    });
  }, [busca, especialidade, conteudo, ordenacao]);

  return (
    <Screen contentStyle={{ paddingBottom: 100 }}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Feather name="users" size={28} color={colors.white} />
          <Text style={styles.headerTitle}>Comunidade</Text>
        </View>
        <Text style={styles.headerSubtitle}>Conecte-se com profissionais de saúde</Text>
      </View>

      <View style={styles.content}>
        <AppCard>
          <View style={styles.filtrosBox}>
            <AppTextField
              label="Pesquisar profissional"
              value={busca}
              onChangeText={setBusca}
              placeholder="Nome, especialidade ou assunto"
              autoCapitalize="none"
              returnKeyType="search"
              icon={<Feather name="search" size={20} color={colors.mutedForeground} />}
            />

            <View>
              <Text style={styles.filtroLabel}>Especialidade</Text>
              <View style={styles.chipsRow}>
                <FiltroChip label="Todas" ativo={especialidade === 'todas'} onPress={() => setEspecialidade('todas')} />
                {especialidades.map((esp) => (
                  <FiltroChip key={esp} label={esp} ativo={especialidade === esp} onPress={() => setEspecialidade(esp)} />
                ))}
              </View>
            </View>

            <View>
              <Text style={styles.filtroLabel}>Conteúdo publicado</Text>
              <View style={styles.chipsRow}>
                {CONTEUDOS.map((c) => (
                  <FiltroChip key={c.value} label={c.label} ativo={conteudo === c.value} onPress={() => setConteudo(c.value)} />
                ))}
              </View>
            </View>

            <AppSelect label="Ordenar por" value={ordenacao} onChange={setOrdenacao} options={ORDENACOES} />

            <View style={styles.resultadoRow}>
              <Text style={styles.resultadoText}>
                {resultados.length === 1 ? '1 profissional encontrado' : `${resultados.length} profissionais encontrados`}
              </Text>
              {filtrosAtivos && (
                <AppButton
                  title="Limpar"
                  variant="text"
                  fullWidth={false}
                  color={colors.secondaryDark}
                  icon={<Feather name="x" size={18} color={colors.secondaryDark} />}
                  onPress={limparFiltros}
                />
              )}
            </View>
          </View>
        </AppCard>

        {resultados.map((profissional) => (
          <AppCard key={profissional.id}>
            <View style={styles.profRow}>
              <AppAvatar uri={profissional.foto} label={profissional.nome} size={72} bgColor={colors.secondary} />
              <View style={{ flex: 1, gap: 8 }}>
                <Text style={styles.itemTitle}>{profissional.nome}</Text>
                <AppChip label={profissional.especialidade} color={colors.secondary} />
              </View>
            </View>

            <View style={styles.followRow}>
              <Feather name="user-check" size={18} color={colors.mutedForeground} />
              <Text style={styles.mutedText}>{profissional.seguidores.toLocaleString('pt-BR')} seguidores</Text>
            </View>

            <View style={styles.actions}>
              <View style={{ flex: 1 }}>
                <AppButton
                  title="Ver Perfil"
                  onPress={() => router.push(`/profissional/${profissional.id}`)}
                  style={{ height: 48 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <AppButton title="Seguir" variant="outlined" color={colors.secondary} style={{ height: 48 }} />
              </View>
            </View>
          </AppCard>
        ))}

        {resultados.length === 0 && (
          <View style={styles.empty}>
            <Feather name="search" size={40} color={colors.mutedForeground} />
            <Text style={styles.emptyTitle}>Nenhum profissional encontrado</Text>
            <Text style={styles.emptySubtitle}>Tente buscar por outro nome ou remova alguns filtros.</Text>
            <View style={{ marginTop: spacing.sm }}>
              <AppButton title="Limpar filtros" variant="outlined" color={colors.secondary} fullWidth={false} onPress={limparFiltros} />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

function FiltroChip({ label, ativo, onPress }: { label: string; ativo: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.filtroChip, ativo && styles.filtroChipAtivo]}
      accessibilityRole="button"
      accessibilityLabel={`Filtrar por ${label}`}
      accessibilityState={{ selected: ativo }}
    >
      {ativo && <Feather name="check" size={16} color={colors.white} />}
      <Text style={[styles.filtroChipText, ativo && styles.filtroChipTextAtivo]}>{label}</Text>
    </TouchableOpacity>
  );
}
