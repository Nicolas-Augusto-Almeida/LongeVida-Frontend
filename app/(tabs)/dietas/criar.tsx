import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppButton, AppCard, AppSwitch, AppTextField, Screen, ScreenHeader } from '../../../src/components/ui';
import { colors } from '../../../src/theme/colors';
import { fontSize, spacing } from '../../../src/theme/typography';

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

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.foreground },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  switchText: { fontSize: fontSize.base, color: colors.foreground },
});
