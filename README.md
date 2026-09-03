# LongeVida — App Mobile (React Native / Expo)

Conversão do protótipo web (React + Vite) do TCC **LongeVida** para **React Native**
com **Expo**, conforme os requisitos técnicos definidos no documento (seção de
tecnologias: front-end em React Native, back-end em Java/Spring Boot e banco de
dados PostgreSQL). **Este pacote cobre a camada de front-end** — as telas estão
funcionais com dados mockados em memória (`src/data/mockData.ts`), prontas para
serem conectadas a uma API REST Spring Boot no lugar dos mocks.

## Como rodar

Pré-requisitos: Node.js 18+ e o app **Expo Go** no celular (ou emulador
Android/iOS configurado).

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou a câmera do iPhone (iOS), ou
pressione `a` / `i` no terminal para abrir em um emulador.

## Estrutura do projeto

```
app/                      # Rotas (expo-router, file-based routing)
  _layout.tsx              # Stack raiz
  index.tsx                 # Splash screen
  login.tsx, cadastro.tsx, recuperacao-senha.tsx, primeiro-acesso.tsx
  (tabs)/                   # Navegação em abas
    home.tsx
    dietas/ (index, criar, [id])
    treinos/ (index, criar, [id])
    social.tsx
    perfil.tsx
  registrar-refeicao.tsx, registrar-atividade.tsx
  historico.tsx, progresso.tsx
  profissional/[id].tsx
  importar-dieta/[id].tsx, importar-treino/[id].tsx
  editar-perfil-profissional.tsx
  wearables.tsx, notificacoes.tsx, configuracoes.tsx

src/
  components/ui/            # Kit de componentes (Button, TextField, Card, Select...)
  theme/                     # Cores e tipografia (design tokens)
  data/mockData.ts           # Dados mockados (substituir pela API no futuro)
```

## Mapeamento de Requisitos Funcionais (RF) do TCC

| Requisito | Tela(s) |
|---|---|
| RF01 — Cadastro de usuário | `cadastro.tsx` |
| RF02 — Login | `login.tsx` |
| RF03 — Recuperação de senha | `recuperacao-senha.tsx` |
| RF04 — Criar/gerenciar dietas | `(tabs)/dietas/*` |
| RF05 — Criar/gerenciar treinos | `(tabs)/treinos/*` |
| RF06/RF07 — Registrar refeições e alimentos | `registrar-refeicao.tsx` |
| RF08 — Registrar atividade física | `registrar-atividade.tsx` |
| RF09 — Comunidade / seguir profissionais | `(tabs)/social.tsx`, `profissional/[id].tsx` |
| RF10/RF11 — Visualizar dietas/treinos | `(tabs)/dietas/[id].tsx`, `(tabs)/treinos/[id].tsx` |
| RF12 — Perfil profissional | `profissional/[id].tsx`, `editar-perfil-profissional.tsx` |
| RF13 — Publicar/importar dietas | `(tabs)/dietas/criar.tsx`, `importar-dieta/[id].tsx` |
| RF14 — Publicar/importar treinos | `(tabs)/treinos/criar.tsx`, `importar-treino/[id].tsx` |
| RF15 — Acompanhar progresso (gráficos) | `progresso.tsx` |
| RF16 — Integração com wearables | `wearables.tsx` |
| RF17 — Notificações | `notificacoes.tsx` |
| RF18 — Configurações / metas diárias | `configuracoes.tsx` |

## Requisitos Não Funcionais (RNF)

- **RNF01 (acessibilidade para idosos):** fonte base de 18px, alvos de toque
  de 56px de altura, alto contraste de cores, `accessibilityLabel`/`accessibilityRole`
  em botões, campos e controles interativos.
- **RNF05 (compatibilidade Android/iOS):** app construído com React Native +
  Expo, rodando nativamente nas duas plataformas a partir da mesma base de código.
- Demais RNFs (desempenho, segurança, LGPD etc.) dependem da camada de back-end
  (Java/Spring Boot + PostgreSQL), fora do escopo desta etapa.

## Próximos passos sugeridos

1. Implementar a API REST em Spring Boot + PostgreSQL espelhando as entidades
   de `src/data/mockData.ts` (Usuario, Dieta, Treino, Alimento, Profissional,
   Notificacao, Historico, Dispositivo).
2. Substituir os dados mockados por chamadas HTTP (ex.: com `fetch` ou
   `axios`), mantendo os componentes de tela como estão.
3. Adicionar persistência de sessão (token JWT) com `@react-native-async-storage/async-storage`
   (já incluso nas dependências).
