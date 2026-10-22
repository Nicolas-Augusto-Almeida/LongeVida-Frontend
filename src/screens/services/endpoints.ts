import { api } from './api';
import type {
  Alimento, AtividadeRequest, Atividade, AtualizarUsuarioRequest, AuthResponse, CadastroRequest, Configuracao,
  Dieta, DietaPublica, DietaRequest, Dispositivo, ItemHistorico, Lembrete, MedicaoWearable, MeuPerfilProfissional,
  Notificacao, Profissional, Progresso, Refeicao, RefeicaoRequest, ResumoDiario, Treino, TreinoPublico, TreinoRequest,
  Usuario,
} from './types';

export const authApi = {
  cadastrar: (dados: CadastroRequest) => api.post<AuthResponse>('/api/auth/cadastro', dados, { autenticado: false }),
  login: (email: string, senha: string) =>
    api.post<AuthResponse>('/api/auth/login', { email, senha }, { autenticado: false }),
  esqueciSenha: (email: string) => api.post<{ mensagem: string }>('/api/auth/esqueci-senha', { email }, { autenticado: false }),
  redefinirSenha: (email: string, codigo: string, novaSenha: string) =>
    api.post<{ mensagem: string }>('/api/auth/redefinir-senha', { email, codigo, novaSenha }, { autenticado: false }),
};

export const usuarioApi = {
  obter: () => api.get<Usuario>('/api/usuarios/me'),
  atualizar: (dados: AtualizarUsuarioRequest) => api.put<Usuario>('/api/usuarios/me', dados),
  obterConfiguracao: () => api.get<Configuracao>('/api/usuarios/me/configuracoes'),
  atualizarConfiguracao: (dados: Configuracao) => api.put<Configuracao>('/api/usuarios/me/configuracoes', dados),
  meuPerfilProfissional: () => api.get<MeuPerfilProfissional>('/api/profissionais/me'),
  atualizarPerfilProfissional: (dados: { especialidade: string; descricao: string }) =>
    api.put<MeuPerfilProfissional>('/api/profissionais/me', dados),
};

export const dietasApi = {
  listar: () => api.get<Dieta[]>('/api/dietas'),
  obter: (id: number) => api.get<Dieta>(`/api/dietas/${id}`),
  criar: (dados: DietaRequest) => api.post<Dieta>('/api/dietas', dados),
  atualizar: (id: number, dados: DietaRequest) => api.put<Dieta>(`/api/dietas/${id}`, dados),
  excluir: (id: number) => api.delete(`/api/dietas/${id}`),
  publicar: (id: number) => api.postSemCorpo<Dieta>(`/api/dietas/${id}/publicar`),
  despublicar: (id: number) => api.postSemCorpo<Dieta>(`/api/dietas/${id}/despublicar`),
};

export const treinosApi = {
  listar: () => api.get<Treino[]>('/api/treinos'),
  obter: (id: number) => api.get<Treino>(`/api/treinos/${id}`),
  criar: (dados: TreinoRequest) => api.post<Treino>('/api/treinos', dados),
  atualizar: (id: number, dados: TreinoRequest) => api.put<Treino>(`/api/treinos/${id}`, dados),
  excluir: (id: number) => api.delete(`/api/treinos/${id}`),
  publicar: (id: number) => api.postSemCorpo<Treino>(`/api/treinos/${id}/publicar`),
  despublicar: (id: number) => api.postSemCorpo<Treino>(`/api/treinos/${id}/despublicar`),
};

export const alimentosApi = {
  listar: (busca?: string) => api.get<Alimento[]>(`/api/alimentos${busca ? `?busca=${encodeURIComponent(busca)}` : ''}`),
};

export const refeicoesApi = {
  registrar: (dados: RefeicaoRequest) => api.post<Refeicao>('/api/refeicoes', dados),
};

export const atividadesApi = {
  registrar: (dados: AtividadeRequest) => api.post<Atividade>('/api/atividades', dados),
};

export const progressoApi = {
  resumoDiario: () => api.get<ResumoDiario>('/api/resumo-diario'),
  historico: (tipo?: 'REFEICAO' | 'ATIVIDADE') => api.get<ItemHistorico[]>(`/api/historico${tipo ? `?tipo=${tipo}` : ''}`),
  progresso: (dias = 7) => api.get<Progresso>(`/api/progresso?dias=${dias}`),
  registrarAgua: (quantidadeMl: number) =>
    api.post<{ totalHojeMl: number; metaMl: number }>('/api/agua', { quantidadeMl }),
};

export const comunidadeApi = {
  profissionais: () => api.get<Profissional[]>('/api/comunidade/profissionais'),
  profissional: (id: number) => api.get<Profissional>(`/api/comunidade/profissionais/${id}`),
  seguir: (id: number) => api.postSemCorpo<Profissional>(`/api/comunidade/profissionais/${id}/seguir`),
  deixarDeSeguir: (id: number) => api.delete<Profissional>(`/api/comunidade/profissionais/${id}/seguir`),
  dietaPublica: (id: number) => api.get<DietaPublica>(`/api/comunidade/dietas/${id}`),
  importarDieta: (id: number) => api.postSemCorpo<Dieta>(`/api/comunidade/dietas/${id}/importar`),
  treinoPublico: (id: number) => api.get<TreinoPublico>(`/api/comunidade/treinos/${id}`),
  importarTreino: (id: number) => api.postSemCorpo<Treino>(`/api/comunidade/treinos/${id}/importar`),
};

export const notificacoesApi = {
  listar: () => api.get<Notificacao[]>('/api/notificacoes'),
  marcarTodasLidas: () => api.postSemCorpo<void>('/api/notificacoes/marcar-todas-lidas'),
  lembretes: () => api.get<Lembrete[]>('/api/lembretes'),
  atualizarLembrete: (id: number, l: Omit<Lembrete, 'id'>) => api.put<Lembrete>(`/api/lembretes/${id}`, l),
};

export const dispositivosApi = {
  listar: () => api.get<Dispositivo[]>('/api/dispositivos'),
  cadastrar: (dados: { nome: string; marca: string }) => api.post<Dispositivo>('/api/dispositivos', dados),
  alterarConexao: (id: number, conectado: boolean) =>
    api.patch<Dispositivo>(`/api/dispositivos/${id}/conexao`, { conectado }),
  remover: (id: number) => api.delete(`/api/dispositivos/${id}`),
  ultimasMedicoes: () => api.get<MedicaoWearable[]>('/api/dispositivos/medicoes/ultimas'),
};
