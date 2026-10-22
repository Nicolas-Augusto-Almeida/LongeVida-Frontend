
export type NivelAtividade = 'SEDENTARIO' | 'LEVE' | 'MODERADO' | 'INTENSO';
export type Restricao = 'DIABETES' | 'HIPERTENSAO' | 'LACTOSE' | 'GLUTEN' | 'OUTRAS';
export type NivelTreino = 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO';
export type Visibilidade = 'PRIVADA' | 'PUBLICA';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  idade: number;
  peso: number | null;
  altura: number | null;
  nivelAtividade: NivelAtividade | null;
  restricoes: Restricao[];
  isProfissional: boolean;
  profissionalId: number | null;
  perfilSaudeCompleto: boolean;
  fotoUrl: string | null;
}

export interface AuthResponse {
  token: string;
  tipo: string;
  expiraEm: string;
  usuario: Usuario;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  idade: number;
  perfilProfissional?: { especialidade: string; registro: string; descricao?: string };
}

export interface AtualizarUsuarioRequest {
  nome: string;
  idade: number;
  peso: number;
  altura: number;
  nivelAtividade: NivelAtividade;
  restricoes: Restricao[];
}

export interface Configuracao {
  notificacoesAtivas: boolean;
  metaAguaMl: number;
  metaCalorias: number;
  metaExercicioMin: number;
  metaCaloriasGastas: number;
}

export interface Dieta {
  id: number;
  nome: string;
  descricao: string | null;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  status: Visibilidade;
  creditoNome: string | null;
  criadoEm: string;
}

export interface DietaRequest {
  nome: string;
  descricao: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  publicar?: boolean;
}

export interface Autor {
  profissionalId: number | null;
  nome: string;
  especialidade: string | null;
}

export interface DietaPublica {
  id: number;
  nome: string;
  descricao: string | null;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  autor: Autor;
}

export interface Exercicio {
  id: number;
  nome: string;
  series: number;
  repeticoes: number;
  grupoMuscular: string;
}

export interface Treino {
  id: number;
  nome: string;
  objetivo: string;
  nivel: NivelTreino;
  status: Visibilidade;
  creditoNome: string | null;
  exercicios: Exercicio[];
  criadoEm: string;
}

export interface TreinoRequest {
  nome: string;
  objetivo: string;
  nivel: NivelTreino;
  publicar?: boolean;
  exercicios: { nome: string; series: number; repeticoes: number; grupoMuscular: string }[];
}

export interface TreinoPublico {
  id: number;
  nome: string;
  objetivo: string;
  nivel: NivelTreino;
  exercicios: Exercicio[];
  autor: Autor;
}

export interface Alimento {
  id: number;
  nome: string;
  porcao: string;
  porcaoQuantidade: number;
  porcaoUnidade: 'g' | 'ml' | 'unidade';
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

export interface RefeicaoRequest {
  nome: string;
  horario: string;
  itens: { alimentoId: number; quantidade: number }[];
}

export interface Refeicao {
  id: number;
  nome: string;
  data: string;
  horario: string;
  itens: {
    id: number;
    alimentoId: number | null;
    nome: string;
    quantidade: number;
    unidade: string;
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
  }[];
  totais: { calorias: number; proteinas: number; carboidratos: number; gorduras: number };
}

export interface AtividadeRequest {
  treinoId: number;
  exerciciosConcluidosIds: number[];
  duracaoMin: number;
}

export interface Atividade {
  id: number;
  treinoId: number | null;
  nome: string;
  data: string;
  horario: string;
  duracaoMin: number;
  caloriasGastas: number;
  exerciciosConcluidos: number;
  exerciciosTotal: number;
}

export interface Metas {
  calorias: number;
  aguaMl: number;
  exercicioMin: number;
  caloriasGastas: number;
}

export interface ResumoDiario {
  data: string;
  caloriasConsumidas: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  caloriasGastas: number;
  minutosExercicio: number;
  aguaMl: number;
  metas: Metas;
}

export interface ItemHistorico {
  tipo: 'REFEICAO' | 'ATIVIDADE';
  id: number;
  nome: string;
  data: string;
  horario: string;
  calorias: number | null;
  duracaoMin: number | null;
}

export interface Progresso {
  dias: number;
  pesoAtual: number | null;
  variacaoPeso: number | null;
  pesos: { data: string; peso: number }[];
  calorias: { data: string; consumidas: number; gastas: number }[];
  resumoCorporal: {
    altura: number | null;
    peso: number | null;
    imc: number | null;
    nivelAtividade: NivelAtividade | null;
  };
}

export interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  descricao: string | null;
  seguidores: number;
  foto: string | null;
  seguindo: boolean;
  ehVoce: boolean;
  dietas: { id: number; nome: string; calorias: number }[];
  treinos: { id: number; nome: string; nivel: NivelTreino }[];
}

export interface MeuPerfilProfissional {
  id: number;
  especialidade: string;
  registro: string;
  descricao: string | null;
  seguidores: number;
}

export interface Notificacao {
  id: number;
  tipo: 'LEMBRETE' | 'TREINO' | 'SOCIAL';
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadaEm: string;
}

export interface Lembrete {
  id: number;
  tipo: 'REFEICAO' | 'TREINO' | 'AGUA';
  titulo: string;
  horario: string;
  ativo: boolean;
}

export interface Dispositivo {
  id: number;
  nome: string;
  marca: string;
  conectado: boolean;
  ultimaSincronizacao: string | null;
}

export interface MedicaoWearable {
  tipo: 'PASSOS' | 'FREQUENCIA_CARDIACA' | 'CALORIAS_GASTAS' | 'SONO_MINUTOS';
  valor: number;
  unidade: string;
  medidoEm: string;
}
