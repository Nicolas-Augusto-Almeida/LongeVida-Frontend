import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppSwitch, AppTextField, Screen, ScreenHeader } from '../../../../components';
import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/typography';
import { dietas } from '../../../../data/mockData';

import { styles } from './EditarDieta.styles';

export default function EditarDieta() {
  const { dietaId } = useLocalSearchParams<{ dietaId: string }>();
  const dieta = dietas.find((d) => d.id === Number(dietaId)) ?? dietas[0];

  // Os campos já iniciam preenchidos com os dados atuais da dieta.
  const [nome, setNome] = useState(dieta.nome);
  const [descricao, setDescricao] = useState(dieta.descricao);
  const [calorias, setCalorias] = useState(String(dieta.calorias));
  const [proteinas, setProteinas] = useState(String(dieta.proteinas));
  const [carboidratos, setCarboidratos] = useState(String(dieta.carboidratos));
  const [gorduras, setGorduras] = useState(String(dieta.gorduras));
  const [publicar, setPublicar] = useState(dieta.status === 'publica');

  const handleSalvar = () => {
    if (nome && descricao && calorias) {
      // Atualiza o item mockado em memória (substituir por PUT /dietas/{id} na API).
      dieta.nome = nome;
      dieta.descricao = descricao;
      dieta.calorias = Number(calorias) || 0;
      dieta.proteinas = Number(proteinas) || 0;
      dieta.carboidratos = Number(carboidratos) || 0;
      dieta.gorduras = Number(gorduras) || 0;
      dieta.status = publicar ? 'publica' : 'privada';
      router.back();
    }
  };

  return (
    <Screen contentStyle={{ paddingBottom: spacing.xl }}>
      <ScreenHeader title="Editar Dieta" onBack={() => router.back()} />

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

        <View style={styles.actions}>
          <AppButton title="Salvar Alterações" icon={<Feather name="save" size={20} color={colors.white} />} onPress={handleSalvar} />
          <AppButton title="Cancelar" variant="outlined" color={colors.mutedForeground} onPress={() => router.back()} />
        </View>
      </View>
    </Screen>
  );
}
