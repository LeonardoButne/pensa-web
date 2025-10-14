import { useParams, Link } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Image,
  Box,
  Paper,
  Grid,
  Badge,
  Button,
  Group,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconFirstAidKit,
  IconShieldCheck,
  IconForbid, // Ícone para "O que não fazer"
  IconAmbulance, // Ícone para "Ação Rápida"
  IconBulb, // Ícone para "Precauções"
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. INTERFACE E DADOS (MOCK) - REVISADOS PARA URGÊNCIAS
// ===========================================

interface EmergencyDetailData {
  id: number;
  name: string;
  shortDescription: string; // Nova descrição curta, se necessário
  category: string;
  imageUrl: string;
  // Campos específicos de urgência
  quickAction: string; // O que fazer
  contraindication: string; // O que não fazer
  precaution?: string; // Precauções/Dicas adicionais
}

const MOCK_EMERGENCIES_DETAILS: EmergencyDetailData[] = [
  {
    id: 1,
    name: "Queimaduras",
    shortDescription:
      "Informações de primeiros socorros para lesões por calor.",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/queimaduras-detail.jpg",
    quickAction:
      "Lave o local com água corrente limpa por 10 min e cubra as lesões. Logo após o incidente, dirija-se à Unidade Sanitária mais próxima de si.",
    contraindication:
      "Não arrebente as bolhas provocadas pela queimadura, não retire os pedaços de roupa colados na pele e não use nenhum produto ou receita caseira no local atingido.",
    precaution:
      "Cozinha: A cozinha é o lugar de maior perigo. Mantenha as crianças longe do ambiente durante o preparo dos alimentos e sempre deixe o cabo da frigideira para dentro do fogão. **Cuidado de Bebê/Criança:** Ao dar banho, adicione primeiro a água fria, depois a quente. Verifique a temperatura com a mão. Não tente tirar a roupa da criança se a queimadura for grave.",
  },
  {
    id: 2,
    name: "Hemorragia / Sangramento",
    shortDescription: "Guia para estancar sangramento e procurar ajuda.",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/sangramento.jpg",
    quickAction:
      "Pare o sangramento aplicando pressão direta na área e mantenha a área afetada elevada para minimizar o inchaço. Se o sangramento não parar, procure ajuda médica imediatamente.",
    contraindication:
      "Não remova objetos grandes ou empalados da área afetada e não use substâncias não esterilizadas para tentar estancar o sangue.",
    precaution: undefined,
  },
  {
    id: 3,
    name: "Fratura / Osso Quebrado",
    shortDescription: "Primeiros socorros para suspeita de fratura.",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/osso-quebrado.jpg",
    quickAction:
      "Mantenha a área afetada imobilizada usando talas. Aplique gelo para minimizar o inchaço e a dor. Dirija-se imediatamente à Unidade Sanitária mais próxima de si.",
    contraindication:
      "Não mova a pessoa a menos que seja absolutamente necessário e não tente realinhar o osso ou colocá-lo no lugar.",
    precaution: undefined,
  },
  {
    id: 4,
    name: "Perigo de Chuvas Fortes",
    shortDescription: "Ações de segurança em caso de inundações.",
    category: "AMBIENTAL",
    imageUrl: "/images-urgencias/chuvas.jpg",
    quickAction:
      "Retire-se imediatamente das zonas de risco. Preste atenção aos idosos, crianças e pessoas com deficiência. Conserve alimentos e documentos em local seguro.",
    contraindication:
      "Não consuma água de poços, rios ou lagos sem tratamento, devido ao risco de diarreia e cólera. Não passe por áreas alagadas.",
    precaution:
      "Cólera: Quando chove, aumenta o risco de diarreias e cólera devido à mistura da água (poços, rios e lagos) com água de esgotos e drenos. Beba água tratada (com CERTEZA) ou fervida.",
  },
];

// MOCK para simular diseasesService.getById (renomeado internamente)
const mockEmergenciesService = {
  getById: (id: number) => {
    const emergency = MOCK_EMERGENCIES_DETAILS.find((d) => d.id === id);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (emergency) {
          resolve({ data: emergency });
        } else {
          resolve({ data: undefined });
        }
      }, 500); // Simula delay de rede
    });
  },
};

// ===========================================
// 2. COMPONENTE COM NOVO LAYOUT
// ===========================================

export function EmergencyDetail() {
  const { id } = useParams<{ id: string }>();

  // ... (useQuery, Loading, Não Encontrado blocks are unchanged) ...
  const { data, isLoading } = useQuery(
    ["emergency", id],
    () => mockEmergenciesService.getById(Number(id)),
    {
      enabled: !!id,
    }
  );

  const emergencyData: EmergencyDetailData | undefined = (
    data as { data: EmergencyDetailData }
  )?.data;

  // Bloco de Loading
  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Bloco de Não Encontrado
  if (!emergencyData) {
    return (
      <Container size="md" py={60}>
        <Center>
          <Box ta="center">
            <IconAlertCircle size={38} color="red" />
            <Title order={4} mt="md">
              Urgência não encontrada
            </Title>
            <Button
              component={Link}
              to="/urgencias"
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para Urgências
            </Button>
          </Box>
        </Center>
      </Container>
    );
  }

  const emergency = emergencyData;

  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box py={60} bg="gray.0">
      <Container size="lg" pos="relative">
        {/* Botão flutuante de voltar */}
        <Button
          component={Link}
          to="/urgencias"
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          pos="absolute"
          top={10}
          left={0}
          radius="xl"
          size="sm"
        >
          Voltar
        </Button>

        {/* Hero visual */}
        <Paper
          shadow="lg"
          radius="lg"
          mb="xl"
          p={0} // Remover padding do Paper
          style={{
            position: "relative",
            overflow: "hidden",
            height: 300, // Definir altura do Paper
          }}
        >
          {" "}
          <Image
            src={emergency.imageUrl}
            alt={emergency.name}
            fit="cover" // Manter cover, mas o overflow:hidden e height fixam
            radius="lg"
            style={{ height: 300, filter: "brightness(0.6)" }} // Manter altura fixa aqui também
          />
          <Box
            ta="center"
            pos="absolute"
            top="50%"
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Title order={2} c="white" fw={800}>
              {emergency.name}
            </Title>
            <Badge color="teal" variant="filled" mt="sm" size="lg">
              {formatCategory(emergency.category)}
            </Badge>
            <Text c="gray.1" mt="sm" fw={500}>
              {emergency.shortDescription}
            </Text>
          </Box>
        </Paper>

        {/* Conteúdo principal */}
        <Grid gutter="xl">
          {/* Coluna esquerda: informações rápidas */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" radius="lg" p="xl" withBorder>
              <Group mb="md">
                <IconFirstAidKit
                  size={26}
                  color="var(--mantine-color-green-6)"
                />
                <Title order={3} fw={700}>
                  O que fazer
                </Title>
              </Group>
              <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                {emergency.quickAction}
              </Text>
            </Paper>
          </Grid.Col>

          {/* Coluna direita: contraindicações */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" radius="lg" p="xl" withBorder>
              <Group mb="md">
                <IconForbid size={26} color="var(--mantine-color-red-6)" />
                <Title order={3} fw={700}>
                  O que não fazer
                </Title>
              </Group>
              <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                {emergency.contraindication}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Precauções */}
        {emergency.precaution && (
          <Paper shadow="sm" radius="lg" p="xl" mt="xl" withBorder>
            <Group mb="md">
              <IconBulb size={26} color="var(--mantine-color-yellow-6)" />
              <Title order={3} fw={700}>
                Precauções e dicas
              </Title>
            </Group>
            <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
              {emergency.precaution}
            </Text>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

