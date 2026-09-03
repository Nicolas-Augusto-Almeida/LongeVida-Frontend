// Paleta de cores do LongeVida — mantém a identidade visual do protótipo
// original (verde/azul) e garante bom contraste para usuários idosos (RNF01).
export const colors = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: 'rgba(76, 175, 80, 0.12)',
  secondary: '#4FC3F7',
  secondaryDark: '#0288D1',
  secondaryLight: 'rgba(79, 195, 247, 0.12)',
  background: '#F5F5F5',
  card: '#FFFFFF',
  foreground: '#333333',
  mutedForeground: '#666666',
  border: '#E0E0E0',
  destructive: '#F44336',
  destructiveDark: '#D32F2F',
  warning: '#FF9800',
  white: '#FFFFFF',
  disabled: '#CCCCCC',
} as const;

export type ColorKey = keyof typeof colors;
