import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { router } from "expo-router";
import { definirAoExpirarSessao } from "../screens/services/api";
import { authApi, usuarioApi } from "../screens/services/endpoints";
import {
  apagarToken,
  lerToken,
  salvarToken,
} from "../screens/services/tokenStorage";
import type {
  AuthResponse,
  CadastroRequest,
  Usuario,
} from "../screens/services/types";

interface AuthContextValue {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<Usuario>;
  cadastrar: (dados: CadastroRequest) => Promise<Usuario>;
  logout: () => Promise<void>;
  atualizarUsuario: (u: Usuario) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const token = await lerToken();
        if (token) {
          const u = await usuarioApi.obter();
          if (ativo) setUsuario(u);
        }
      } catch {
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    definirAoExpirarSessao(() => {
      setUsuario(null);
      router.replace("/login");
    });
    return () => definirAoExpirarSessao(null);
  }, []);

  const iniciarSessao = useCallback(async (resposta: AuthResponse) => {
    await salvarToken(resposta.token);
    setUsuario(resposta.usuario);
    return resposta.usuario;
  }, []);

  const login = useCallback(
    async (email: string, senha: string) =>
      iniciarSessao(await authApi.login(email.trim(), senha)),
    [iniciarSessao],
  );

  const cadastrar = useCallback(
    async (dados: CadastroRequest) =>
      iniciarSessao(await authApi.cadastrar(dados)),
    [iniciarSessao],
  );

  const logout = useCallback(async () => {
    await apagarToken();
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({
      usuario,
      carregando,
      login,
      cadastrar,
      logout,
      atualizarUsuario: setUsuario,
    }),
    [usuario, carregando, login, cadastrar, logout],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
