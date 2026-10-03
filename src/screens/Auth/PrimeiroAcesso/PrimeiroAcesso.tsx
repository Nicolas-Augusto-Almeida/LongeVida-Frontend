import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCheckbox, AppSelect, AppTextField, IconCircle, Screen } from '../../../components';
import { colors } from '../../../theme/colors';
import { fontSize, spacing } from '../../../theme/typography';

import { styles } from './PrimeiroAcesso.styles';

const NIVEIS = [
  { label: 'Sedentário', value: 'sedentario' },
  { label: 'Leve', value: 'leve' },
  { label: 'Moderado', value: 'moderado' },
  { label: 'Intenso', value: 'intenso' },
];

export default function PrimeiroAcesso() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [nivelAtividade, setNivelAtividade] = useState('');
  const [restricoes, setRestricoes] = useState({
    diabetes: false,
    hipertensao: false,
    lactose: false,
    gluten: false,
    outras: false,
  });

  const toggle = (chave: keyof typeof restricoes) =>
    setRestricoes((prev) => ({ ...prev, [chave]: !prev[chave] }));

  const handleSalvar = () => {
    if (peso && altura && nivelAtividade) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <Screen contentStyle={styles.scrollContent}>
      <View style={styles.card}>
        <View style={styles.headerGroup}>
          <IconCircle color={colors.primary} size={96}>
            <Feather name="activity" size={48} color={colors.white} />
          </IconCircle>
          <Text style={styles.title}>Informações de Saúde</Text>
          <Text style={styles.subtitle}>Vamos personalizar sua experiência</Text>
        </View>

        <View style={styles.form}>
          <AppTextField filter="decimal" maxValue={500} label="Peso (kg)" value={peso} onChangeText={setPeso} icon={<Feather name="anchor" size={20} color={colors.mutedForeground} />} />
          <AppTextField filter="inteiro" maxValue={250} label="Altura (cm)" value={altura} onChangeText={setAltura} icon={<Feather name="bar-chart-2" size={20} color={colors.mutedForeground} />} />

          <AppSelect
            label="Nível de Atividade Física"
            value={nivelAtividade}
            onChange={setNivelAtividade}
            options={NIVEIS}
            icon={<Feather name="activity" size={20} color={colors.mutedForeground} />}
          />

          <View>
            <Text style={styles.sectionTitle}>Restrições Alimentares</Text>
            <AppCheckbox label="Diabetes" checked={restricoes.diabetes} onToggle={() => toggle('diabetes')} />
            <AppCheckbox label="Hipertensão" checked={restricoes.hipertensao} onToggle={() => toggle('hipertensao')} />
            <AppCheckbox label="Intolerância à Lactose" checked={restricoes.lactose} onToggle={() => toggle('lactose')} />
            <AppCheckbox label="Glúten" checked={restricoes.gluten} onToggle={() => toggle('gluten')} />
            <AppCheckbox label="Outras" checked={restricoes.outras} onToggle={() => toggle('outras')} />
          </View>

          <AppButton title="Salvar" onPress={handleSalvar} />
        </View>
      </View>
    </Screen>
  );
}
