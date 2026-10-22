
const DIAS_ABREV = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function doisDigitos(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function dataLocal(iso: string): Date {
  const [a, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(a, m - 1, d);
}

export function hojeIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
}

export function diaDaSemanaAbrev(iso: string): string {
  return DIAS_ABREV[dataLocal(iso).getDay()];
}

export function rotuloDia(iso: string): string {
  const alvo = dataLocal(iso).getTime();
  const hoje = dataLocal(hojeIso()).getTime();
  const dias = Math.round((hoje - alvo) / 86400000);
  if (dias === 0) return 'Hoje';
  if (dias === 1) return 'Ontem';
  const d = dataLocal(iso);
  return `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}`;
}

export function horaCurta(horario: string): string {
  return horario.slice(0, 5);
}

export function instanteRelativo(iso: string): string {
  const d = new Date(iso);
  const dia = `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
  return `${rotuloDia(dia)} ${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
}

export function horarioAtual(): string {
  const d = new Date();
  return `${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
}

export function milhar(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function litros(ml: number): string {
  return `${(ml / 1000).toFixed(1).replace('.', ',')}L`;
}

export function decimal(n: number, casas = 1): string {
  return n.toFixed(casas).replace('.', ',');
}

export function lerNumero(texto: string): number {
  return Number(texto.replace(',', '.').trim());
}
