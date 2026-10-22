import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'longevida.token';

let cache: string | null = null;

export async function lerToken(): Promise<string | null> {
  if (cache) return cache;
  cache = await AsyncStorage.getItem(CHAVE);
  return cache;
}

export async function salvarToken(token: string): Promise<void> {
  cache = token;
  await AsyncStorage.setItem(CHAVE, token);
}

export async function apagarToken(): Promise<void> {
  cache = null;
  await AsyncStorage.removeItem(CHAVE);
}
