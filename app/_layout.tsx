import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/contexts/AuthContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="cadastro" />
          <Stack.Screen name="recuperacao-senha" />
          <Stack.Screen name="primeiro-acesso" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="registrar-refeicao" options={{ presentation: 'modal' }} />
          <Stack.Screen name="registrar-atividade" options={{ presentation: 'modal' }} />
          <Stack.Screen name="historico" />
          <Stack.Screen name="progresso" />
          <Stack.Screen name="profissional/[profissionalId]" />
          <Stack.Screen name="importar-dieta/[dietaId]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="importar-treino/[treinoId]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="editar-perfil" />
          <Stack.Screen name="editar-perfil-profissional" />
          <Stack.Screen name="wearables" />
          <Stack.Screen name="notificacoes" />
          <Stack.Screen name="configuracoes" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
