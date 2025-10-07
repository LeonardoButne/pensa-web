import { Button, TextInput, Title, Stack, Container } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { newsletterService } from "../../../services/newsletter.service";

// O componente agora deve ser usado dentro de um Container ou com padding externo se necessário.
export function Newsletter() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await newsletterService.subscribe(values);
      notifications.show({
        title: "Sucesso! 🎉",
        message: "Você foi inscrito na nossa newsletter.",
        color: "green",
      });
      form.reset();
    } catch (error) {
      notifications.show({
        title: "Erro",
        message:
          "Não foi possível completar a inscrição. Tente novamente ou o email já pode estar cadastrado.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // O Container controla o padding lateral e a largura máxima do formulário.
    <Container size="xs" px="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={2}
          size="h3"
          style={{ fontFamily: "Outfit, var(--mantine-font-family)" }}
          fw={700}
          ta="center"
          mb="xl" // Adiciona margem abaixo do título
        >
          Fique por dentro das alertas de saúde em Moçambique, junte-se à
          newsletter.
        </Title>

        {/* O Stack organiza os elementos em uma única coluna verticalmente */}
        <Stack gap="md">
          <TextInput
            label="Nome"
            placeholder="Seu nome (opcional)"
            name="name"
            variant="filled"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Seu email"
            name="email"
            variant="filled"
            required
            {...form.getInputProps("email")}
          />
        </Stack>

        <Stack align="center" mt="xl">
          <Button type="submit" size="md" loading={loading}>
            Subscrever
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

