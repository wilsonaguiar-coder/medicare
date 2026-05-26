import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="nova-consulta" options={{ title: 'Nova Consulta' }} />
      <Stack.Screen name="auth/login" options={{ title: 'Entrar' }} />
      <Stack.Screen name="auth/register" options={{ title: 'Cadastro' }} />
    </Stack>
  )
}
