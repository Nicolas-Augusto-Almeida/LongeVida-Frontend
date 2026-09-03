// Dados mockados em memória, usados no lugar do back-end (Java/Spring Boot +
// PostgreSQL) enquanto esta etapa cobre apenas o front-end (React Native).

export interface Usuario {
  nome: string;
  idade: number;
  peso: number;
  altura: number;
  nivelAtividade: string;
  isProfissional: boolean;
}

export const usuarioAtual: Usuario = {
  nome: 'Maria Silva',
  idade: 65,
  peso: 73.8,
  altura: 165,
  nivelAtividade: 'Moderado',
  isProfissional: true,
};

export interface Dieta {
  id: number;
  nome: string;
  descricao: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  status: 'privada' | 'publica';
}

export const dietas: Dieta[] = [
  {
    id: 1,
    nome: 'Dieta Balanceada',
    descricao:
      'Uma dieta equilibrada com todos os macronutrientes necessários para uma vida saudável.',
    calorias: 2000,
    proteinas: 150,
    carboidratos: 200,
    gorduras: 60,
    status: 'privada',
  },
  {
    id: 2,
    nome: 'Dieta Low Carb',
    descricao: 'Redução de carboidratos para controle de peso e glicemia.',
    calorias: 1800,
    proteinas: 120,
    carboidratos: 100,
    gorduras: 80,
    status: 'publica',
  },
];

export interface Exercicio {
  nome: string;
  series: number;
  repeticoes: number;
  grupoMuscular: string;
}

export interface Treino {
  id: number;
  nome: string;
  objetivo: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  exercicios: Exercicio[];
}

export const treinos: Treino[] = [
  {
    id: 1,
    nome: 'Treino de Força',
    objetivo: 'Ganho de massa muscular',
    nivel: 'Intermediário',
    exercicios: [
      { nome: 'Supino Reto', series: 4, repeticoes: 12, grupoMuscular: 'Peito' },
      { nome: 'Agachamento', series: 4, repeticoes: 15, grupoMuscular: 'Pernas' },
      { nome: 'Remada Curvada', series: 3, repeticoes: 12, grupoMuscular: 'Costas' },
    ],
  },
  {
    id: 2,
    nome: 'Caminhada Matinal',
    objetivo: 'Condicionamento cardiovascular',
    nivel: 'Iniciante',
    exercicios: [
      { nome: 'Caminhada Leve', series: 1, repeticoes: 30, grupoMuscular: 'Cardio' },
      { nome: 'Alongamento', series: 1, repeticoes: 10, grupoMuscular: 'Corpo todo' },
    ],
  },
];

export interface Alimento {
  id: number;
  nome: string;
  porcao: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

// Valores por porção de referência (banco de dados simulado de alimentos).
export const bancoDadosAlimentos: Alimento[] = [
  { id: 1, nome: 'Arroz Branco', porcao: '100g', calorias: 130, proteinas: 2.7, carboidratos: 28, gorduras: 0.3 },
  { id: 2, nome: 'Feijão Preto', porcao: '100g', calorias: 77, proteinas: 4.5, carboidratos: 14, gorduras: 0.5 },
  { id: 3, nome: 'Frango Grelhado', porcao: '100g', calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6 },
  { id: 4, nome: 'Carne Bovina', porcao: '100g', calorias: 250, proteinas: 26, carboidratos: 0, gorduras: 15 },
  { id: 5, nome: 'Peixe Grelhado', porcao: '100g', calorias: 96, proteinas: 20, carboidratos: 0, gorduras: 1.2 },
  { id: 6, nome: 'Batata Cozida', porcao: '100g', calorias: 87, proteinas: 1.9, carboidratos: 20, gorduras: 0.1 },
  { id: 7, nome: 'Macarrão', porcao: '100g', calorias: 131, proteinas: 5, carboidratos: 25, gorduras: 1.1 },
  { id: 8, nome: 'Salada Verde', porcao: '100g', calorias: 15, proteinas: 1.2, carboidratos: 2.9, gorduras: 0.2 },
  { id: 9, nome: 'Tomate', porcao: '100g', calorias: 18, proteinas: 0.9, carboidratos: 3.9, gorduras: 0.2 },
  { id: 10, nome: 'Ovo Cozido', porcao: '1 unidade', calorias: 78, proteinas: 6.3, carboidratos: 0.6, gorduras: 5.3 },
  { id: 11, nome: 'Pão Integral', porcao: '50g', calorias: 127, proteinas: 5, carboidratos: 21, gorduras: 2.5 },
  { id: 12, nome: 'Queijo Minas', porcao: '30g', calorias: 80, proteinas: 5.4, carboidratos: 1.2, gorduras: 6 },
  { id: 13, nome: 'Banana', porcao: '100g', calorias: 89, proteinas: 1.1, carboidratos: 23, gorduras: 0.3 },
  { id: 14, nome: 'Maçã', porcao: '100g', calorias: 52, proteinas: 0.3, carboidratos: 14, gorduras: 0.2 },
  { id: 15, nome: 'Leite Integral', porcao: '200ml', calorias: 122, proteinas: 6.4, carboidratos: 9, gorduras: 6.6 },
  { id: 16, nome: 'Iogurte Natural', porcao: '100g', calorias: 61, proteinas: 3.5, carboidratos: 4.7, gorduras: 3.3 },
  { id: 17, nome: 'Azeite', porcao: '10ml', calorias: 88, proteinas: 0, carboidratos: 0, gorduras: 10 },
];

export interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  descricao: string;
  seguidores: number;
  foto: string;
  dietas: { id: number; nome: string; calorias: number }[];
  treinos: { id: number; nome: string; nivel: string }[];
}

export const profissionais: Profissional[] = [
  {
    id: 1,
    nome: 'Dr. João Silva',
    especialidade: 'Nutricionista',
    descricao:
      'Especialista em nutrição para terceira idade com 15 anos de experiência. Foco em qualidade de vida e longevidade.',
    seguidores: 1250,
    foto: 'https://i.pravatar.cc/150?img=12',
    dietas: [
      { id: 1, nome: 'Dieta Mediterrânea', calorias: 2000 },
      { id: 2, nome: 'Dieta Anti-inflamatória', calorias: 1800 },
    ],
    treinos: [
      { id: 1, nome: 'Alongamento Diário', nivel: 'Iniciante' },
      { id: 2, nome: 'Fortalecimento Muscular', nivel: 'Intermediário' },
    ],
  },
  {
    id: 2,
    nome: 'Dra. Maria Santos',
    especialidade: 'Personal Trainer',
    descricao:
      'Personal trainer especializada em treinos funcionais e de mobilidade para adultos 50+.',
    seguidores: 890,
    foto: 'https://i.pravatar.cc/150?img=5',
    dietas: [],
    treinos: [{ id: 3, nome: 'Mobilidade Articular', nivel: 'Iniciante' }],
  },
  {
    id: 3,
    nome: 'Dr. Carlos Oliveira',
    especialidade: 'Geriatra',
    descricao: 'Geriatra dedicado à promoção de hábitos saudáveis e prevenção de doenças crônicas.',
    seguidores: 2100,
    foto: 'https://i.pravatar.cc/150?img=33',
    dietas: [{ id: 4, nome: 'Dieta Cardioprotetora', calorias: 1900 }],
    treinos: [],
  },
];

export interface Notificacao {
  id: number;
  tipo: 'lembrete' | 'treino' | 'social';
  titulo: string;
  mensagem: string;
  horario: string;
  lida: boolean;
}

export const notificacoes: Notificacao[] = [
  { id: 1, tipo: 'lembrete', titulo: 'Lembrete: Almoço', mensagem: 'Está na hora do seu almoço!', horario: '12:00', lida: false },
  { id: 2, tipo: 'treino', titulo: 'Treino programado', mensagem: 'Treino de força às 16:00', horario: 'Hoje', lida: false },
  { id: 3, tipo: 'social', titulo: 'Nova dieta publicada', mensagem: 'Dr. João Silva publicou uma nova dieta', horario: 'Ontem', lida: true },
  { id: 4, tipo: 'lembrete', titulo: 'Meta de água', mensagem: 'Você ainda não atingiu sua meta diária de água', horario: '15:30', lida: true },
];

export interface ItemHistorico {
  tipo: 'refeicao' | 'atividade';
  nome: string;
  horario: string;
  calorias?: number;
  duracao?: number;
}

export const historico: ItemHistorico[] = [
  { tipo: 'refeicao', nome: 'Café da Manhã', horario: '08:00', calorias: 450 },
  { tipo: 'atividade', nome: 'Caminhada', horario: '07:00', duracao: 30 },
  { tipo: 'refeicao', nome: 'Almoço', horario: '12:30', calorias: 650 },
  { tipo: 'atividade', nome: 'Musculação', horario: '16:00', duracao: 60 },
];

export interface Dispositivo {
  id: number;
  nome: string;
  marca: string;
  conectado: boolean;
  ultimaSync: string;
}

export const dispositivos: Dispositivo[] = [
  { id: 1, nome: 'Apple Watch Series 9', marca: 'Apple', conectado: true, ultimaSync: '2 horas atrás' },
  { id: 2, nome: 'Mi Band 7', marca: 'Xiaomi', conectado: false, ultimaSync: 'Nunca' },
];

export const dadosPeso = [
  { dia: 'Seg', peso: 75 },
  { dia: 'Ter', peso: 74.8 },
  { dia: 'Qua', peso: 74.5 },
  { dia: 'Qui', peso: 74.3 },
  { dia: 'Sex', peso: 74.2 },
  { dia: 'Sáb', peso: 74 },
  { dia: 'Dom', peso: 73.8 },
];

export const dadosCalorias = [
  { dia: 'Seg', consumidas: 1850, gastas: 400 },
  { dia: 'Ter', consumidas: 2000, gastas: 450 },
  { dia: 'Qua', consumidas: 1900, gastas: 380 },
  { dia: 'Qui', consumidas: 2100, gastas: 500 },
  { dia: 'Sex', consumidas: 1950, gastas: 420 },
  { dia: 'Sáb', consumidas: 2200, gastas: 600 },
  { dia: 'Dom', consumidas: 1800, gastas: 350 },
];
