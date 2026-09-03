import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
        <Stack.Screen name="profissional/[id]" />
        <Stack.Screen name="importar-dieta/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="importar-treino/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="editar-perfil-profissional" />
        <Stack.Screen name="wearables" />
        <Stack.Screen name="notificacoes" />
        <Stack.Screen name="configuracoes" />
      </Stack>
    </SafeAreaProvider>
  );
}
