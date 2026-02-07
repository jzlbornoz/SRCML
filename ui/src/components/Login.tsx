import { SignInButton } from '@clerk/clerk-react';
import {
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';

export function Login() {

  return (
    <Container size={420} my={40} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
      {/* Encabezado del Login */}
      <Title ta="center" order={1} style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        Sistema de Registro y Control Municipio Libertador
      </Title>
      <Text ta="center" c="dimmed" mt="md">
        Labor Social, Carrera Ingenieria de Sistemas. 2026
      </Text>
      {/* Tarjeta Principal */}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text size="lg" c={'dimmed'} style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
          Sistema enfocado para el registro y control de archivos.
        </Text>
        <SignInButton mode="modal" signUpFallbackRedirectUrl={window.location.href}>
          <Button fullWidth mt="xl">
            Entrar al Sistema
          </Button>
        </SignInButton>
      </Paper>

      <Text c="dimmed" size="xs" ta="center" mt={20}>
        Instituto Universitario Politécnico "Santiago Mariño"
      </Text>
    </Container>
  );
}