import { Text, Paper, SimpleGrid, Box, Title, Container } from "@mantine/core"; // 👈 Importei Container

// 1. Definição dos Dados do Impacto (Mantida)
interface ImpactItem {
  value: string;
  label: string;
  description: string;
  color: string;
}

const IMPACT_DATA: ImpactItem[] = [
  {
    value: "+5.33M",
    label: "Utilizadores",
    description: "Pessoas que utilizam o sistema",
    color: "cyan.6",
  },
  {
    value: "+77.6M",
    label: "Total de acessos",
    description: "Pessoas que acederam ao sistema",
    color: "cyan.6",
  },
  {
    value: "+40",
    label: "Doenças catalogadas",
    description: "Informações completas e confiáveis",
    color: "cyan.6",
  },
  {
    value: "24/7",
    label: "Disponibilidade",
    description: "Acesso a informações a qualquer hora",
    color: "cyan.6",
  },
];

export function ImpactSection() {
  return (
    <Box mt={10} py={40}>
      {/* Use size="lg" ou "xl" para limitar a largura máxima e adicionar padding lateral */}
      <Container size="xl" mb={60}>
        <Title order={4} ta="center" mb={60} fw={600} c="dimmed">
          Impacto
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {IMPACT_DATA.map((item) => (
            <Paper
              key={item.label}
              shadow="lg"
              radius="md"
              p="lg"
              ta="center"
              withBorder
            >
              <Text style={{ fontSize: 36 }} fw={800} c={item.color} mb="sm">
                {item.value}
              </Text>

              <Title order={5} fw={600} mt="xs" mb={4}>
                {item.label}
              </Title>

              <Text size="sm" c="dimmed">
                {item.description}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

