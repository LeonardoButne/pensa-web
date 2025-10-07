import {
  Container,
  Title,
  Text,
  Box,
  Paper,
  SimpleGrid,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import {
  IconTarget,
  IconEye,
  IconHeart,
  IconUsers,
  IconTrophy,
  IconWorld,
} from "@tabler/icons-react";

const values = [
  {
    icon: IconHeart,
    title: "Cuidado",
    description:
      "Colocamos a saúde e o bem-estar das pessoas em primeiro lugar",
  },
  {
    icon: IconUsers,
    title: "Comunidade",
    description:
      "Trabalhamos juntos para fortalecer as comunidades de Moçambique",
  },
  {
    icon: IconTrophy,
    title: "Excelência",
    description: "Buscamos sempre a melhor qualidade em nossos serviços",
  },
  {
    icon: IconWorld,
    title: "Acessibilidade",
    description: "Informação de saúde acessível para todos, em qualquer lugar",
  },
];

export function About() {
  return (
    <Box py={60}>
      <Container size="lg">
        {/* Hero Section */}
        <Box ta="center" mb={60}>
          <Title order={1} mb="md">
            Sobre a PENSA
          </Title>
          <Text size="xl" c="dimmed">
            Sistema de Informação de Saúde para Moçambique
          </Text>
        </Box>

        {/* Missão */}
        <Paper shadow="sm" radius="lg" p="xl" mb={40}>
          <Stack gap="md">
            <ThemeIcon size={60} radius="md" color="cyan">
              <IconTarget size={32} />
            </ThemeIcon>
            <Title order={2}>Nossa Missão</Title>
            <Text size="lg" c="dimmed">
              Democratizar o acesso à informação de saúde em Moçambique através
              de tecnologia inovadora e acessível. Através do código *660#,
              conectamos pessoas a informações vitais sobre saúde, permitindo
              que tomem decisões informadas sobre seu bem-estar e o de suas
              famílias.
            </Text>
          </Stack>
        </Paper>

        {/* Visão */}
        <Paper shadow="sm" radius="lg" p="xl" mb={60}>
          <Stack gap="md">
            <ThemeIcon size={60} radius="md" color="teal">
              <IconEye size={32} />
            </ThemeIcon>
            <Title order={2}>Nossa Visão</Title>
            <Text size="lg" c="dimmed">
              Ser a principal plataforma de informação de saúde em Moçambique,
              reconhecida pela qualidade, confiabilidade e impacto positivo na
              vida das pessoas. Queremos um futuro onde cada moçambicano tenha
              acesso fácil e rápido a informações de saúde confiáveis.
            </Text>
          </Stack>
        </Paper>

        {/* Valores */}
        <Box mb={60}>
          <Title order={2} ta="center" mb="xl">
            Nossos Valores
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {values.map((value, index) => (
              <Paper key={index} shadow="sm" radius="lg" p="xl">
                <ThemeIcon
                  size={50}
                  radius="md"
                  color="cyan"
                  variant="light"
                  mb="md"
                >
                  <value.icon size={28} />
                </ThemeIcon>
                <Title order={3} mb="sm">
                  {value.title}
                </Title>
                <Text c="dimmed">{value.description}</Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>

        {/* O que fazemos */}
        <Paper shadow="sm" radius="lg" p="xl" bg="cyan.0">
          <Title order={2} mb="xl">
            O que fazemos
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack gap="sm">
              <Text fw={600} size="lg">
                📱 Serviço *660#
              </Text>
              <Text c="dimmed">
                Acesso rápido a informações de saúde via USSD, disponível em
                qualquer celular
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                💊 Informações sobre Doenças
              </Text>
              <Text c="dimmed">
                Base de dados completa sobre doenças, sintomas, tratamentos e
                prevenção
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                👨‍⚕️ Diretório de Médicos
              </Text>
              <Text c="dimmed">
                Conectamos pacientes com profissionais de saúde qualificados
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                🎓 Educação em Saúde
              </Text>
              <Text c="dimmed">
                Programas de formação e disseminação de informação para
                comunidades
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                🔔 Alertas de Saúde
              </Text>
              <Text c="dimmed">
                Notificações sobre campanhas de vacinação e alertas sanitários
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                👶 Saúde Materna e Infantil
              </Text>
              <Text c="dimmed">
                Informações especializadas para mães e cuidados com crianças
              </Text>
            </Stack>
          </SimpleGrid>
        </Paper>

        {/* Impacto */}
        <Box mt={60}>
          <Title order={2} ta="center" mb="xl">
            Nosso Impacto
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                1M+
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Usuários Ativos
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Pessoas conectadas ao sistema
              </Text>
            </Paper>
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                500+
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Doenças Catalogadas
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Informações completas e confiáveis
              </Text>
            </Paper>
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                24/7
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Disponibilidade
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Acesso a informações a qualquer hora
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

