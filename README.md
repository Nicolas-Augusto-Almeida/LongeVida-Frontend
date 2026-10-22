# LongeVida — App Mobile (React Native / Expo)

## Como rodar

Pré-requisitos: Node.js 20+, o **backend** em execução e o app
**Expo Go** no celular (ou emulador Android/iOS).

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou a câmera do iPhone (iOS), ou pressione `a` / `i` no terminal.

## Estrutura do projeto

```
app/                      # Rotas (expo-router): arquivos finos que só reexportam src/screens
  (tabs)/                 # Abas: home, dietas/, treinos/, social, perfil
  login, cadastro, recuperacao-senha, primeiro-acesso, editar-perfil, ...
  profissional/[profissionalId], importar-dieta/[dietaId], importar-treino/[treinoId]

src/
  screens/                # Telas (uma pasta por tela: .tsx + .styles.ts)
  components/             # Kit de componentes (AppButton, AppTextField, QueryBoundary, FormMessage...)
  services/               # api.ts (cliente HTTP + JWT), endpoints.ts (rotas), types.ts (contrato), tokenStorage.ts
  contexts/AuthContext    # sessão do usuário (login, cadastro, logout)
  hooks/useApiQuery       # carrega dados da API a cada foco da tela
  utils/                  # filtros de entrada, formatação pt-BR, rótulos
  theme/                  # Cores e tipografia (design tokens)
```

Verificações: `npx tsc --noEmit` e `npx expo export --platform web`.

## Mapeamento de Requisitos Funcionais (RF) do TCC

| Requisito                                   | Tela(s)                                                               |
| ------------------------------------------- | --------------------------------------------------------------------- |
| RF01 — Cadastro de usuário                  | `cadastro.tsx`                                                        |
| RF02 — Login                                | `login.tsx`                                                           |
| RF03 — Recuperação de senha                 | `recuperacao-senha.tsx`                                               |
| RF04 — Criar/gerenciar dietas               | `(tabs)/dietas/*`                                                     |
| RF05 — Criar/gerenciar treinos              | `(tabs)/treinos/*`                                                    |
| RF06/RF07 — Registrar refeições e alimentos | `registrar-refeicao.tsx`                                              |
| RF08 — Registrar atividade física           | `registrar-atividade.tsx`                                             |
| RF09 — Comunidade / seguir profissionais    | `(tabs)/social.tsx`, `profissional/[profissionalId].tsx`              |
| RF10/RF11 — Visualizar dietas/treinos       | `(tabs)/dietas/[dietaId].tsx`, `(tabs)/treinos/[treinoId].tsx`        |
| RF12 — Perfil profissional                  | `profissional/[profissionalId].tsx`, `editar-perfil-profissional.tsx` |
| RF13 — Publicar/importar dietas             | `(tabs)/dietas/criar.tsx`, `importar-dieta/[dietaId].tsx`             |
| RF14 — Publicar/importar treinos            | `(tabs)/treinos/criar.tsx`, `importar-treino/[treinoId].tsx`          |
| RF15 — Acompanhar progresso (gráficos)      | `progresso.tsx`                                                       |
| RF16 — Integração com wearables             | `wearables.tsx`                                                       |
| RF17 — Notificações                         | `notificacoes.tsx`                                                    |
| RF18 — Configurações / metas diárias        | `configuracoes.tsx`                                                   |

## Requisitos Não Funcionais (RNF)

- **RNF01 (acessibilidade para idosos):** fonte base de 18px, alvos de toque
  de 56px de altura, alto contraste de cores, `accessibilityLabel`/`accessibilityRole`
  em botões, campos e controles interativos.
- **RNF05 (compatibilidade Android/iOS):** app construído com React Native +
  Expo, rodando nativamente nas duas plataformas a partir da mesma base de código.
- Segurança e persistência: ver o README da raiz (JWT, Spring Security, PostgreSQL). LGPD (exclusão de conta)
  ainda não está implementada.
