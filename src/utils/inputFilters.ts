// Filtros de entrada do LongeVida: cada tipo de informação só aceita os
// caracteres que fazem sentido para ela (ex.: idade só aceita números).
// São aplicados pelo AppTextField através da prop `filter`.

export type InputFilter =
  | 'nome' // nomes de pessoas, especialidade, grupo muscular (só letras)
  | 'texto' // títulos livres (letras, números e pontuação básica)
  | 'descricao' // textos longos / multilinha
  | 'busca' // campo de pesquisa
  | 'email'
  | 'senha'
  | 'inteiro' // idade, altura, calorias, séries, repetições...
  | 'decimal' // peso, macronutrientes, quantidade...
  | 'horario' // HH:MM
  | 'registro'; // registro profissional (CRN, CREF, CRM...)

export interface FilterOptions {
  /** Valor atual do campo (usado para rejeitar a digitação que passar do limite). */
  anterior?: string;
  /** Valor numérico máximo aceito (filtros 'inteiro' e 'decimal'). */
  maxValue?: number;
  /** Casas decimais permitidas (filtro 'decimal'). Padrão: 1. */
  casasDecimais?: number;
}

const LETRAS = 'A-Za-zÀ-ÖØ-öø-ÿ';

const semEspacosNoInicio = (t: string) => t.replace(/^\s+/, '');
const compactarEspacos = (t: string) => semEspacosNoInicio(t).replace(/\s{2,}/g, ' ');

const somenteDigitos = (t: string) => t.replace(/\D/g, '');

function filtrarInteiro(texto: string, { anterior = '', maxValue }: FilterOptions) {
  let valor = somenteDigitos(texto).replace(/^0+(?=\d)/, '');
  if (maxValue !== undefined && valor !== '' && Number(valor) > maxValue) return anterior;
  return valor;
}

function filtrarDecimal(texto: string, { anterior = '', maxValue, casasDecimais = 1 }: FilterOptions) {
  // Aceita vírgula (teclado pt-BR) e guarda com ponto, para o Number() funcionar.
  let valor = texto.replace(',', '.').replace(/[^\d.]/g, '');

  const primeiroPonto = valor.indexOf('.');
  if (primeiroPonto !== -1) {
    const inteira = valor.slice(0, primeiroPonto);
    const decimais = valor.slice(primeiroPonto + 1).replace(/\./g, '').slice(0, casasDecimais);
    valor = casasDecimais > 0 ? `${inteira === '' ? '0' : inteira}.${decimais}` : inteira;
  }

  valor = valor.replace(/^0+(?=\d)/, '');
  if (maxValue !== undefined && valor !== '' && Number(valor) > maxValue) return anterior;
  return valor;
}

function filtrarHorario(texto: string, anterior = '') {
  let digitos = somenteDigitos(texto).slice(0, 4);

  // "9" vira "09" (não existe hora 90).
  if (digitos.length >= 1 && Number(digitos[0]) > 2) digitos = `0${digitos}`.slice(0, 4);
  if (digitos.length >= 2 && Number(digitos.slice(0, 2)) > 23) return anterior;
  if (digitos.length >= 3 && Number(digitos[2]) > 5) return anterior;

  return digitos.length > 2 ? `${digitos.slice(0, 2)}:${digitos.slice(2)}` : digitos;
}

function filtrarEmail(texto: string) {
  let valor = texto.toLowerCase().replace(/[^a-z0-9@._+\-]/g, '');
  const arroba = valor.indexOf('@');
  if (arroba !== -1) valor = valor.slice(0, arroba + 1) + valor.slice(arroba + 1).replace(/@/g, '');
  return valor;
}

export function aplicarFiltro(filtro: InputFilter, texto: string, opcoes: FilterOptions = {}): string {
  switch (filtro) {
    case 'nome':
      return compactarEspacos(texto.replace(new RegExp(`[^${LETRAS} '.\\-]`, 'g'), ''));
    case 'texto':
      return compactarEspacos(texto.replace(new RegExp(`[^${LETRAS}0-9 .,;:!?()%/&+'"\\-]`, 'g'), ''));
    case 'descricao':
      return texto
        .replace(new RegExp(`[^${LETRAS}0-9 \\n.,;:!?()%/&+'"°ºª\\-]`, 'g'), '')
        .replace(/^\s+/, '')
        .replace(/ {2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n');
    case 'busca':
      return compactarEspacos(texto.replace(new RegExp(`[^${LETRAS}0-9 '.\\-]`, 'g'), ''));
    case 'email':
      return filtrarEmail(texto);
    case 'senha':
      return texto.replace(/\s/g, '');
    case 'inteiro':
      return filtrarInteiro(texto, opcoes);
    case 'decimal':
      return filtrarDecimal(texto, opcoes);
    case 'horario':
      return filtrarHorario(texto, opcoes.anterior);
    case 'registro':
      return texto.toUpperCase().replace(/[^A-Z0-9 /.\-]/g, '').replace(/ {2,}/g, ' ').replace(/^\s+/, '');
    default:
      return texto;
  }
}

// ---------- Validação do valor final (usada no blur e ao enviar formulários) ----------

export const emailValido = (texto: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texto);

export const horarioValido = (texto: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(texto);

const MENSAGENS: Partial<Record<InputFilter, { valido: (t: string) => boolean; mensagem: string }>> = {
  email: { valido: emailValido, mensagem: 'Digite um e-mail válido. Ex: nome@email.com' },
  horario: { valido: horarioValido, mensagem: 'Use o formato HH:MM. Ex: 12:30' },
};

/** Retorna a mensagem de erro do campo, ou null quando está vazio ou válido. */
export function validarFiltro(filtro: InputFilter, texto: string): string | null {
  const regra = MENSAGENS[filtro];
  if (!regra || texto === '') return null;
  return regra.valido(texto) ? null : regra.mensagem;
}
