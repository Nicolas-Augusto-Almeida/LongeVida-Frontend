import type {
  NivelAtividade,
  NivelTreino,
  Restricao,
} from "../screens/services/types";

export const NIVEL_ATIVIDADE_LABEL: Record<NivelAtividade, string> = {
  SEDENTARIO: "Sedentário",
  LEVE: "Leve",
  MODERADO: "Moderado",
  INTENSO: "Intenso",
};

export const NIVEL_TREINO_LABEL: Record<NivelTreino, string> = {
  INICIANTE: "Iniciante",
  INTERMEDIARIO: "Intermediário",
  AVANCADO: "Avançado",
};

export const RESTRICAO_LABEL: Record<Restricao, string> = {
  DIABETES: "Diabetes",
  HIPERTENSAO: "Hipertensão",
  LACTOSE: "Intolerância à lactose",
  GLUTEN: "Intolerância ao glúten",
  OUTRAS: "Outras",
};

export const NIVEIS_ATIVIDADE_OPCOES = (
  Object.keys(NIVEL_ATIVIDADE_LABEL) as NivelAtividade[]
).map((value) => ({
  value,
  label: NIVEL_ATIVIDADE_LABEL[value],
}));

export const NIVEIS_TREINO_OPCOES = (
  Object.keys(NIVEL_TREINO_LABEL) as NivelTreino[]
).map((value) => ({
  value,
  label: NIVEL_TREINO_LABEL[value],
}));
