import {
  SimpleGrid,
  Paper,
  Text,
  Group,
  ThemeIcon,
  Box,
  Title,
} from "@mantine/core";
import {
  IconVirus,
  IconUsers,
  IconMail,
  IconMessageCircle,
} from "@tabler/icons-react";

const data = [
  {
    title: "Doenças Cadastradas",
    value: "156",
    icon: IconVirus,
    color: "cyan",
  },
  {
    title: "Inscritos Newsletter",
    value: "2,345",
    icon: IconMail,
    color: "teal",
  },
  {
    title: "Médicos Cadastrados",
    value: "89",
    icon: IconUsers,
    color: "blue",
  },
  {
    title: "Mensagens Não Lidas",
    value: "12",
    icon: IconMessageCircle,
    color: "orange",
  },
];

export function Dashboard() {
  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} size="xs">
              {stat.title}
            </Text>
            <Text fw={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon color={stat.color} variant="light" size={60} radius="md">
            <stat.icon size={32} stroke={1.5} />
          </ThemeIcon>
        </Group>
      </Paper>
    );
  });

  return (
    <Box>
      <Title order={2} mb="xl">
        Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>{stats}</SimpleGrid>

      <Paper withBorder p="xl" radius="md" mt="xl">
        <Title order={3} mb="md">
          Bem-vindo ao Painel Administrativo
        </Title>
        <Text c="dimmed">
          Aqui você pode gerenciar todo o conteúdo do website PENSA. Use o menu
          lateral para navegar entre as diferentes seções.
        </Text>
      </Paper>
    </Box>
  );
}
