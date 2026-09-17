import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppSwitch, AppTextField, Screen, ScreenHeader } from '../../../../components';
import { colors } from '../../../../theme/colors';
import { fontSize, spacing } from '../../../../theme/typography';

import { styles } from './CriarDieta.styles';

export default function CriarDieta() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [calorias, setCalorias] = useState('');
  const [proteinas, setProteinas] = useState('');
  const [carboidratos, setCarboidratos] = useState('');
  const [gorduras, setGorduras] = useState('');
  const [publicar, setPublicar] = useState(false);

  const handleSalvar = () => {
    if (nome && descricao && calorias) {
      router.back();
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Criar Nova Dieta" onBack={() => router.back()} />

      <View style={styles.content}>
        <AppCard>
          <View style={{ gap: spacing.md }}>
            <AppTextField label="Nome da Dieta" value={nome} onChangeText={setNome} />
            <AppTextField label="Descrição" value={descricao} onChangeText={setDescricao} multiline numberOfLines={3} />
            <AppTextField label="Meta Calórica (kcal)" value={calorias} onChangeText={setCalorias} keyboardType="numeric" />

            <Text style={styles.sectionTitle}>Macronutrientes (gramas)</Text>
            <AppTextField label="Proteínas" value={proteinas} onChangeText={setProteinas} keyboardType="numeric" />
            <AppTextField label="Carboidratos" value={carboidratos} onChangeText={setCarboidratos} keyboardType="numeric" />
            <AppTextField label="Gorduras" value={gorduras} onChangeText={setGorduras} keyboardType="numeric" />

            <View style={styles.switchRow}>
              <View style={styles.switchLabel}>
                <Feather name="globe" size={20} color={colors.foreground} />
                <Text style={styles.switchText}>Publicar Dieta (Perfil Profissional)</Text>
              </View>
              <AppSwitch value={publicar} onValueChange={setPublicar} />
            </View>
          </View>
        </AppCard>

        <AppButton title="Salvar Dieta" icon={<Feather name="save" size={20} color={colors.white} />} onPress={handleSalvar} />
      </View>
    </Screen>
  );
}
