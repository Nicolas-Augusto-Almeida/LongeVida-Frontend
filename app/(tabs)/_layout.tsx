import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="dietas"
        options={{ title: 'Dietas', tabBarIcon: ({ color, size }) => <Feather name="clipboard" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="treinos"
        options={{ title: 'Treinos', tabBarIcon: ({ color, size }) => <Feather name="zap" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="social"
        options={{ title: 'Social', tabBarIcon: ({ color, size }) => <Feather name="users" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
