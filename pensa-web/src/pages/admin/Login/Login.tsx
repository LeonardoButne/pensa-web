import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Image,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconLogin } from "@tabler/icons-react";
import { authService } from "../../../services/auth.service";
import { useAuthStore } from "../../../store/authStore";

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value.length < 3 ? "Username muito curto" : null),
      password: (value) => (value.length < 6 ? "Senha muito curta" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await authService.login(values);
      const { token, id, username, email, role } = response.data;

      login(token, { id, username, email, role });

      notifications.show({
        title: "Login realizado!",
        message: `Bem-vindo, ${username}!`,
        color: "green",
      });

      navigate("/admin/dashboard");
    } catch (error: any) {
      notifications.show({
        title: "Erro no login",
        message: error.response?.data?.message || "Credenciais inválidas",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #B8E5E5 0%, #C8E8E8 100%)",
      }}
    >
      <Container size="xs">
        <Paper shadow="xl" radius="lg" p="xl">
          <Stack gap="md" align="center" mb="xl">
            <Image src="/logo.svg" alt="PENSA" h={60} w="auto" />
            <Title order={2}>Área Administrativa</Title>
            <Text c="dimmed" size="sm" ta="center">
              Faça login para acessar o painel administrativo
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Username"
                placeholder="Seu username"
                size="lg"
                required
                {...form.getInputProps("username")}
              />

              <PasswordInput
                label="Senha"
                placeholder="Sua senha"
                size="lg"
                required
                {...form.getInputProps("password")}
              />

              <Button
                type="submit"
                size="lg"
                fullWidth
                leftSection={<IconLogin size={20} />}
                loading={loading}
                color="cyan"
              >
                Entrar
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed" ta="center" mt="xl">
            Credenciais padrão: admin / admin123
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

