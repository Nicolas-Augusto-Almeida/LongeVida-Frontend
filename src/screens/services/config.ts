import { Platform } from 'react-native';

const daVariavel = process.env.EXPO_PUBLIC_API_URL;

export const API_URL: string =
  (daVariavel && daVariavel.trim().replace(/\/+$/, '')) ||
  (Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080');

export const TIMEOUT_MS = 15000;
