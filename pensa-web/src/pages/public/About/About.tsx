import {
  Container,
  Title,
  Text,
  Box,
  Paper,
  SimpleGrid,
  ThemeIcon,
  Stack,
  Image,
  Accordion,
  Group, // 👈 Importar o componente Image do Mantine
} from "@mantine/core";
import {
  IconHeart,
  IconUsers,
  IconTrophy,
  IconWorld,
} from "@tabler/icons-react";

// 🚨 ASSUMINDO QUE ESTE É O CAMINHO CORRETO PARA SUA IMAGEM
import detalhesImage from "/logo-pensa.png";

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

// 🚨 NOVO CONTEÚDO PARA O ACCORDION (resumo do texto fornecido)
const contextItems = [
  {
    title: "O Mandato do MISAU e o PESS",
    content:
      "O Ministério da Saúde (MISAU) visa garantir que todos os moçambicanos desfrutem da melhor saúde possível. Para tal, elaborou o Plano Estratégico do Sector da Saúde (PESS) 2014-2019, focado em contribuir para o bem-estar da população, especialmente os grupos mais vulneráveis.",
  },
  {
    title: "O Desafio da acessibilidade da informação",
    content:
      "Apesar da existência de informações vitais sobre saúde (prevenção, sintomas e tratamentos), o acesso é limitado. Campanhas tradicionais (e-mail/Internet, TV) não alcançam de forma eficaz as zonas recônditas, deixando a população mais necessitada privada de informações cruciais.",
  },
  {
    title: "A solução PENSA: USSD (*660#)",
    content:
      "A Plataforma Educativa de Informação sobre a Saúde (PENSA), desenvolvida pela Source Code, resolve este problema, facultando informação grátis sobre a saúde (gerida pelo MISAU) através do USSD (*660#), acessível em qualquer telemóvel e operadora.",
  },
  {
    title: "Funcionalidades chave e impacto na saúde pública",
    content:
      "A PENSA permite aos cidadãos registar problemas, consultar sintomas, precauções e informações para várias doenças (malária, HIV, TBC, etc.), e obter contactos de unidades sanitárias próximos. Toda a informação recolhida é visível num back-end website para uso dos funcionários da Saúde Pública.",
  },
];

export function About() {
  return (
    <Box py={30}>
      <Container size="lg">
        {/* Hero Section */}
        <Box ta="center" mb={30}>
          <Title order={2} mb="md">
            Sobre a PENSA
          </Title>
          {/* <Text size="xl" c="dimmed">
            Sistema de Informação de Saúde para Moçambique
          </Text> */}
        </Box>

        {/* 🚨 NOVA SEÇÃO: IMAGEM + MISSÃO & VISÃO */}
        <SimpleGrid
          cols={{ base: 1, md: 2 }} // 1 coluna em mobile, 2 em desktop
          spacing="xl"
          mb={60}
          // Usar align="center" ajuda a centralizar verticalmente o conteúdo
          style={{ alignItems: "center" }}
        >
          {/* Coluna 1: Imagem */}
          <Paper radius="lg">
            <Image
              src={detalhesImage}
              alt="Detalhes do serviço de saúde"
              radius="lg"
              // Usar fit="cover" ou garantir o tamanho
              style={{ height: "100%", objectFit: "cover" }}
            />
          </Paper>

          {/* Coluna 2: Missão e Visão (Empilhados) */}
          <Stack gap="xl">
            {/* Missão */}
            <Paper shadow="sm" radius="lg" p="xl" withBorder>
              <Stack gap="md" mb={50}>
                {/* <ThemeIcon size={60} radius="md" color="cyan">
                  <IconTarget size={32} />
                </ThemeIcon> */}
                <Title order={4}>Missão</Title>
                <Text size="lg" c="dimmed">
                  Democratizar o acesso à informação de saúde em Moçambique
                  através de tecnologia inovadora e acessível.
                </Text>
              </Stack>

              <Stack gap="md">
                {/* <ThemeIcon size={60} radius="md" color="teal">
                  <IconEye size={32} />
                </ThemeIcon> */}
                <Title order={4}>Visão</Title>
                <Text size="lg" c="dimmed">
                  Ser a principal plataforma de informação de saúde em
                  Moçambique, reconhecida pela qualidade, confiabilidade e
                  impacto positivo na vida das pessoas.
                </Text>
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>

        {/* Valores (Mantido como estava) */}
        <Box mb={60}>
          <Title order={3} ta="center" mb="xl">
            Valores
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
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

        {/* O que fazemos (Mantido como estava)
        <Paper shadow="sm" radius="lg" p="xl" bg="cyan.0" mb={60}>
          <Title order={2} mb="xl">
            O que fazemos
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            <Stack gap="sm">
              <Text fw={600} size="lg">
                Serviço *660#
              </Text>
              <Text c="dimmed">
                Acesso rápido a informações de saúde via USSD, disponível em
                qualquer celular
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                Informações sobre Doenças
              </Text>
              <Text c="dimmed">
                Base de dados completa sobre doenças, sintomas, tratamentos e
                prevenção
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                Educação em Saúde
              </Text>
              <Text c="dimmed">
                Disseminação de informação para comunidades
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                Alertas de Saúde
              </Text>
              <Text c="dimmed">
                Notificações sobre campanhas de vacinação e alertas sanitários
              </Text>
            </Stack>
            <Stack gap="sm">
              <Text fw={600} size="lg">
                Saúde Materna e Infantil
              </Text>
              <Text c="dimmed">
                Informações especializadas para mães e cuidados com crianças
              </Text>
            </Stack>
          </SimpleGrid>
        </Paper> */}

        {/* Impacto (Mantido como estava) */}
        <Box mt={60}>
          <Title order={3} ta="center" mb="xl">
            Impacto
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="xl">
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                +652K
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Usuários cadastrados
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Pessoas que se cadastraram no sistema
              </Text>
            </Paper>
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                +77.6M
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Total de acessos
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Pessoas que acederam ao sistema
              </Text>
            </Paper>
            <Paper shadow="sm" radius="lg" p="xl" ta="center">
              <Text size="48px" fw={700} c="cyan">
                +40
              </Text>
              <Text size="lg" fw={500} mt="xs">
                Doenças catalogadas
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
        {/* 🚨 NOVA SECÇÃO: CONTEXTO E NECESSIDADE (ACORDION) */}
        <Paper shadow="lg" mt={60} radius="lg" p="xl" withBorder>
          <Group mb="xl" gap="sm">
            {/* <ThemeIcon size={40} radius="md" color="blue">
              <IconSitemap size={24} />
            </ThemeIcon> */}
            <Title order={3}>Contexto e necessidade da PENSA</Title>
          </Group>

          <Accordion variant="separated" defaultValue="MISAU">
            {contextItems.map((item, index) => (
              <Accordion.Item key={index} value={String(index)}>
                <Accordion.Control>
                  <Title order={4} fw={600} c="dark.7">
                    {item.title}
                  </Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text c="dimmed" size="md">
                    {item.content}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Paper>
        {/* FIM DA NOVA SECÇÃO */}
      </Container>
    </Box>
  );
}

