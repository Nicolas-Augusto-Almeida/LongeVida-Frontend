// Tamanhos de fonte generosos (base 18px, como no protótipo original) para
// atender ao RNF01 — interface acessível para o público idoso.
export const fontSize = {
  xs: 13,
  sm: 15,
  base: 18,
  md: 20,
  lg: 24,
  xl: 30,
  xxl: 36,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
} as const;

// Altura mínima de 56px para toques confortáveis (alvo acessível >= 44pt).
export const touchTarget = 56;
