import type { TreinoRequest } from "../screens/services/types";

export interface ExercicioForm {
  id: number;
  nome: string;
  series: string;
  repeticoes: string;
  grupoMuscular: string;
}

type Resultado =
  | { ok: true; exercicios: TreinoRequest["exercicios"] }
  | { ok: false; erro: string };

export function montarExercicios(lista: ExercicioForm[]): Resultado {
  const exercicios: TreinoRequest["exercicios"] = [];
  for (let i = 0; i < lista.length; i++) {
    const e = lista[i];
    const series = Number(e.series);
    const repeticoes = Number(e.repeticoes);
    if (!e.nome.trim() || !(series >= 1) || !(repeticoes >= 1)) {
      return {
        ok: false,
        erro: `Exercício ${i + 1}: informe o nome, as séries e as repetições.`,
      };
    }
    exercicios.push({
      nome: e.nome.trim(),
      series,
      repeticoes,
      grupoMuscular: e.grupoMuscular.trim(),
    });
  }
  return { ok: true, exercicios };
}
