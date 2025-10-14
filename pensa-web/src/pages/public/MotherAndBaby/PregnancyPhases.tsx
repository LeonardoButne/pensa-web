// =========================================================
// ARQUIVO: PregnancyPhases.tsx
// (Substitui o FullTopicView para o Tópico de Gravidez)
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
  Badge,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconStethoscope,
  IconCheckupList,
} from "@tabler/icons-react";
// Assumindo que você usa react-query para carregar dados reais
// Vou usar um MOCK para a função de busca
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - FILTRADOS PARA GRAVIDEZ
// ===========================================

interface PregnancyPhase {
  month_id: number;
  long_info: string;
}

// 1.1 SEU RAW DATA (Simplificado para o exemplo, você deve usar o seu RAW_DATA completo)
const RAW_DATA = [
  // mch_submenu_id 1 = Fases da Gravidez
  {
    month_id: 1,
    mch_submenu_id: 1,
    long_info:
      "O início das mudanças. No primeiro mês de gravidez, muitas mulheres experimentam sintomas semelhantes aos do período menstrual...",
  },
  {
    month_id: 2,
    mch_submenu_id: 1,
    long_info:
      "Transformações visíveis e novos sintomas. Mamas sensíveis, enjoos e cansaço se intensificam...",
  },
  {
    month_id: 3,
    mch_submenu_id: 1,
    long_info:
      "Os principais órgãos estão em formação. O risco de aborto diminui. É importante iniciar o pré-natal...",
  },
  {
    month_id: 4,
    mch_submenu_id: 1,
    long_info:
      "As náuseas costumam diminuir. A mulher pode começar a sentir os primeiros movimentos do bebê...",
  },
  {
    month_id: 5,
    mch_submenu_id: 1,
    long_info:
      "Sentir os movimentos do feto se torna mais frequente. A pele pode ficar mais oleosa...",
  },
  {
    month_id: 6,
    mch_submenu_id: 1,
    long_info:
      "O bebê consegue ouvir sons externos e internos. A barriga cresce significativamente, e o centro de gravidade muda...",
  },
  {
    month_id: 7,
    mch_submenu_id: 1,
    long_info:
      "Inchaço nas pernas e pés é comum. O feto cresce muito e tem padrões de sono definidos...",
  },
  {
    month_id: 8,
    mch_submenu_id: 1,
    long_info:
      "Fazer o rastreio de Tensão Alta e Diabetes Gestacional. O bebê se posiciona para o parto...",
  },
  {
    month_id: 9,
    mch_submenu_id: 1,
    long_info:
      "Preparação final para o nascimento. Contrações de treinamento são mais frequentes. É importante ter a mala da maternidade pronta...",
  },
];

// MOCK para simular a busca apenas das Fases da Gravidez (mch_submenu_id = 1)
const mockService = {
  getPhases: (): Promise<{ data: PregnancyPhase[] }> => {
    const phases = RAW_DATA.filter((d) => d.mch_submenu_id === 1).map((d) => ({
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
// 2. COMPONENTE PregnancyPhases
// ===========================================

export function PregnancyPhases() {
  // Use useQuery para buscar os dados das 9 fases
  const { data, isLoading } = useQuery(
    "pregnancyPhases",
    mockService.getPhases
  );

  const contentList: PregnancyPhase[] = data?.data || [];

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
        {" "}
        {/* Container menor para foco no conteúdo */}
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
                Fases da Gravidez
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Acompanhe o desenvolvimento da gestação mês a mês, do 1º ao 9º mês.
          </Text>

          <Divider mb="xl" labelPosition="center" />

          {/* Lista Simples de Fases */}
          {contentList.map((content) => (
            <Box key={content.month_id} mb="xl">
              <Group justify="space-between" align="center" mb="sm">
                <Title order={3} fw={700} c="dark.7">
                  {content.month_id}º Mês de Gestação
                </Title>
                <Badge color="#00918b" variant="filled">
                  Trimestre {Math.ceil(content.month_id / 3)}
                </Badge>
              </Group>

              <Paper
                p="lg"
                radius="md"
                bg="white"
                style={{ borderLeft: `4px solid #00918b` }}
              >
                <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                  {content.long_info}
                </Text>
              </Paper>

              {/* Adiciona um espaçamento extra e linha de separação, exceto no último */}
              {content.month_id !== 9 && <Divider mt="xl" />}
            </Box>
          ))}

          {contentList.length === 0 && (
            <Center py={40}>
              <Text c="dimmed">Conteúdo de Gravidez não disponível.</Text>
            </Center>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

