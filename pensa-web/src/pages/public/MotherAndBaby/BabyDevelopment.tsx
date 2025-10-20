// =========================================================
// ARQUIVO: BabyDevelopment.tsx
// =========================================================
import { Link } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Box,
  Paper,
  Group,
  Divider,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - FILTRADOS PARA DESENVOLVIMENTO DO BEBÊ
// ===========================================

interface BabyDevelopmentPhase {
  month_id: number;
  long_info: string;
}

// 1.1 SEU RAW DATA (Simplificado para o exemplo, você deve usar o seu RAW_DATA completo)
const RAW_DATA = [
  // mch_submenu_id 2 = Desenvolvimento do Bebê
  {
    month_id: 1,
    mch_submenu_id: 2,
    long_info:
      "Reage ao som de bater palma ou sino. O contacto visual torna-se mais evidente...",
  },
  {
    month_id: 2,
    mch_submenu_id: 2,
    long_info:
      "Sorri socialmente em resposta a estímulos visuais e sonoros. Começa a explorar o próprio corpo...",
  },
  {
    month_id: 3,
    mch_submenu_id: 2,
    long_info:
      "Acompanha objectos virando a cabeça e o tronco. Murmura sons diferentes...",
  },
  {
    month_id: 4,
    mch_submenu_id: 2,
    long_info:
      "Brinca com as mãos. Demonstra excitação e alegria ao ver alimentos ou objectos de que gosta...",
  },
  {
    month_id: 5,
    mch_submenu_id: 2,
    long_info:
      "Tenta alcançar objectos e os leva à boca para explorar. Imita sons de fala...",
  },
  {
    month_id: 6,
    mch_submenu_id: 2,
    long_info:
      "Consegue virar de barriga para cima para baixo. Senta-se com apoio...",
  },
  {
    month_id: 7,
    mch_submenu_id: 2,
    long_info: "Fala sílabas repetidas: mamã, dadá. Brinca de esconde-achou...",
  },
  {
    month_id: 8,
    mch_submenu_id: 2,
    long_info:
      "Senta sem apoio. Começa a gatinhar. Transfere objectos de uma mão para a outra...",
  },
  {
    month_id: 9,
    mch_submenu_id: 2,
    long_info:
      "Fala palavras com sílabas diferentes (gato, pato). Fica de pé com apoio...",
  },
  {
    month_id: 10,
    mch_submenu_id: 2,
    long_info: "Imita gestos, bate palminhas e acena (tatá). Anda com apoio...",
  },
  {
    month_id: 11,
    mch_submenu_id: 2,
    long_info:
      "Imita sons de fala como se conversasse. Aprimora as habilidades motoras finas...",
  },
  {
    month_id: 12,
    mch_submenu_id: 2,
    long_info:
      "Anda apoiado nos móveis ou seguro por uma das mãos. Usa um copo para beber líquidos sozinho...",
  },
];

// MOCK para simular a busca apenas do Desenvolvimento do Bebê (mch_submenu_id = 2)
const mockService = {
  getPhases: (): Promise<{ data: BabyDevelopmentPhase[] }> => {
    const phases = RAW_DATA.filter((d) => d.mch_submenu_id === 2).map((d) => ({
      month_id: d.month_id,
      long_info: d.long_info,
    }));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: phases });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE BabyDevelopment
// ===========================================

export function BabyDevelopment() {
  // Use useQuery para buscar os dados dos 12 meses
  const { data, isLoading } = useQuery(
    "babyDevelopmentPhases",
    mockService.getPhases
  );

  const contentList: BabyDevelopmentPhase[] = data?.data || [];

  // Bloco de Loading
  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Box py={60} bg="gray.0">
      <Container size="md">
        {/* Botão de voltar para a lista de tópicos */}
        <Button
          component={Link}
          to="/mae-e-bebe"
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          mb="xl"
          size="sm"
        >
          Voltar para o Menu de Guias
        </Button>

        <Paper shadow="lg" radius="lg" p="xl" withBorder>
          <Center mb="xl">
            <Group>
              <Title order={1} fw={700} size={40} c="dark.7">
                Desenvolvimento do Bebê
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Acompanhe os marcos de crescimento e as habilidades do seu bebê, do
            1º ao 12º mês de vida.
          </Text>

          <Divider mb="xl" labelPosition="center" />

          {/* Lista Simples de Fases */}
          {contentList.map((content) => (
            <Box key={content.month_id} mb="xl">
              <Group justify="space-between" align="center" mb="sm">
                <Title order={3} fw={700} c="dark.7">
                  {content.month_id}º Mês de Vida
                </Title>
              </Group>

              <Paper
                p="lg"
                radius="md"
                bg="white"
                style={{ borderLeft: `4px solid var(--mantine-color-blue-6)` }}
              >
                <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                  {content.long_info}
                </Text>
              </Paper>

              {/* Adiciona um espaçamento extra e linha de separação, exceto no último */}
              {content.month_id !== 12 && <Divider mt="xl" />}
            </Box>
          ))}

          {contentList.length === 0 && (
            <Center py={40}>
              <Text c="dimmed">
                Conteúdo de Desenvolvimento do Bebê não disponível.
              </Text>
            </Center>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

