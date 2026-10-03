import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize, radius, touchTarget } from '../../theme/typography';
import { aplicarFiltro, InputFilter, validarFiltro } from '../../utils/inputFilters';

import { styles } from './AppTextField.styles';

interface Props extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  /** Tipo de informação do campo: limpa o que for digitado e ajusta o teclado. */
  filter?: InputFilter;
  /** Valor máximo aceito (filtros 'inteiro' e 'decimal'). */
  maxValue?: number;
  /** Casas decimais permitidas (filtro 'decimal'). Padrão: 1. */
  casasDecimais?: number;
  /** Mensagem de erro manual (sobrescreve a validação automática). */
  error?: string;
}

// Props padrão do TextInput para cada tipo de filtro (podem ser sobrescritas pela tela).
const FILTER_PROPS: Record<InputFilter, Partial<TextInputProps>> = {
  nome: { autoCapitalize: 'words', autoCorrect: false, maxLength: 60 },
  texto: { autoCapitalize: 'sentences', maxLength: 60 },
  descricao: { autoCapitalize: 'sentences', maxLength: 300 },
  busca: { autoCapitalize: 'none', autoCorrect: false, maxLength: 50 },
  email: { keyboardType: 'email-address', autoCapitalize: 'none', autoCorrect: false, autoComplete: 'email', maxLength: 100 },
  senha: { autoCapitalize: 'none', autoCorrect: false, maxLength: 32 },
  inteiro: { keyboardType: 'number-pad', maxLength: 9 },
  decimal: { keyboardType: 'decimal-pad', maxLength: 9 },
  horario: { keyboardType: 'number-pad', maxLength: 5 },
  registro: { autoCapitalize: 'characters', autoCorrect: false, maxLength: 20 },
};

export default function AppTextField({
  label,
  icon,
  multiline,
  numberOfLines,
  style,
  filter,
  maxValue,
  casasDecimais,
  error,
  value,
  onChangeText,
  onBlur,
  ...rest
}: Props) {
  const [tocou, setTocou] = useState(false);

  const handleChange = (texto: string) => {
    onChangeText?.(filter ? aplicarFiltro(filter, texto, { anterior: value, maxValue, casasDecimais }) : texto);
  };

  const mensagemErro = error ?? (filter && tocou ? validarFiltro(filter, value ?? '') : null);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          multiline && { height: undefined, minHeight: touchTarget, alignItems: 'flex-start', paddingVertical: 12 },
          !!mensagemErro && styles.inputRowError,
        ]}
      >
        {icon}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.mutedForeground}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={[styles.input, multiline && { textAlignVertical: 'top' }, style]}
          {...(filter ? FILTER_PROPS[filter] : {})}
          {...rest}
          value={value}
          onChangeText={handleChange}
          onBlur={(e) => {
            setTocou(true);
            onBlur?.(e);
          }}
        />
      </View>
      {!!mensagemErro && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {mensagemErro}
        </Text>
      )}
    </View>
  );
}
