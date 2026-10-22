import { API_URL, TIMEOUT_MS } from './config';
import { apagarToken, lerToken } from './tokenStorage';

export class ApiError extends Error {
  status: number;
  campos?: Record<string, string>;

  constructor(status: number, message: string, campos?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.campos = campos;
  }
}

type Metodo = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Opcoes {
  autenticado?: boolean;
}

let aoExpirarSessao: (() => void) | null = null;

export function definirAoExpirarSessao(fn: (() => void) | null) {
  aoExpirarSessao = fn;
}

async function requisitar<T>(metodo: Metodo, caminho: string, corpo?: unknown, opcoes: Opcoes = {}): Promise<T> {
  const autenticado = opcoes.autenticado !== false;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (corpo !== undefined) headers['Content-Type'] = 'application/json';
  if (autenticado) {
    const token = await lerToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), TIMEOUT_MS);

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    });
  } catch {
    throw new ApiError(
      0,
      'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.',
    );
  } finally {
    clearTimeout(timer);
  }

  if (resposta.status === 204) return undefined as T;

  let dados: any = null;
  const texto = await resposta.text();
  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = null;
    }
  }

  if (!resposta.ok) {
    if (resposta.status === 401 && autenticado) {
      await apagarToken();
      aoExpirarSessao?.();
    }
    const mensagem =
      resposta.status >= 500
        ? 'O servidor teve um problema. Tente novamente em instantes.'
        : dados?.mensagem || 'Não foi possível concluir a operação.';
    throw new ApiError(resposta.status, mensagem, dados?.campos ?? undefined);
  }
  return dados as T;
}

export const api = {
  get: <T>(caminho: string, opcoes?: Opcoes) => requisitar<T>('GET', caminho, undefined, opcoes),
  post: <T>(caminho: string, corpo?: unknown, opcoes?: Opcoes) => requisitar<T>('POST', caminho, corpo ?? {}, opcoes),
  postSemCorpo: <T>(caminho: string) => requisitar<T>('POST', caminho),
  put: <T>(caminho: string, corpo: unknown, opcoes?: Opcoes) => requisitar<T>('PUT', caminho, corpo, opcoes),
  patch: <T>(caminho: string, corpo: unknown) => requisitar<T>('PATCH', caminho, corpo),
  delete: <T = void>(caminho: string) => requisitar<T>('DELETE', caminho),
};

export function mensagemDeErro(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  return 'Ocorreu um erro inesperado. Tente novamente.';
}
