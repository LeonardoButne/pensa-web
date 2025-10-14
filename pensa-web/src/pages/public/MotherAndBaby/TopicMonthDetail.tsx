// =========================================================
// ARQUIVO: TopicMonthDetail.tsx
// =========================================================

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
  Loader,
  Center,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconStethoscope,
  IconVaccine,
  IconHeartbeat,
  IconMilk, // Novo ícone para Amamentação
  IconCalendarEvent,
  IconBabyBottle, // Novo ícone para Calendário
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - REUTILIZADOS
// ===========================================

// 1.1 Mapeamento dos Tópicos para ID de Submenu e Título
const TOPIC_MAPPING: {
  [key: number]: { title: string; mch_submenu_id: number; icon: React.FC<any> };
} = {
  1: { title: "Fase da Gravidez", mch_submenu_id: 1, icon: IconStethoscope },
  2: {
    title: "Desenvolvimento do Bebê",
    mch_submenu_id: 2,
    icon: IconBabyBottle,
  },
  3: { title: "Calendário de Vacinação", mch_submenu_id: 3, icon: IconVaccine },
  4: { title: "Vacinas Essenciais", mch_submenu_id: 3, icon: IconVaccine }, // Mapeia para o mesmo ID 3
  5: {
    title: "Amamentação e Banco de Leite",
    mch_submenu_id: 4,
    icon: IconMilk,
  }, // Novo ID de submenu para o novo tópico
};

// 1.2 RAW_DATA e Função mapRawDataToMonthDetail - SIMPLIFICADOS
// Nota: Você deve manter este RAW_DATA e a função mapRawDataToMonthDetail
// no seu MonthDetail.tsx (antigo) e copiá-los para cá. Para simplificar,
// vou mostrar apenas a função de busca simplificada.

interface MonthData {
  month_id: number;
  mch_submenu_id: number;
  info: string;
  long_info: string;
}

const RAW_DATA: MonthData[] = [
  // ... (Seu array RAW_DATA com 12 meses e 3 submenus deve ser inserido aqui) ...
  // Exemplo:
  {
    month_id: 1,
    mch_submenu_id: 1,
    info: "1º mês da gravidez: ...",
    long_info: "1º Mês da Gravidez: o Início das Mudanças...",
  },
  {
    month_id: 1,
    mch_submenu_id: 2,
    info: "1º mês de vida: Reage ao som...",
    long_info: "1º Mês de Vida: Descobrindo o Mundo...",
  },
  {
    month_id: 1,
    mch_submenu_id: 3,
    info: "Parabens pelo nascimento...",
    long_info: "No primeiro mês, seu bebê deve receber duas vacinas...",
  },
  // ... (restante do seu RAW_DATA) ...
  {
    month_id: 5,
    mch_submenu_id: 4,
    info: "Dica de Amamentação 5º Mês: ...",
    long_info: "5º Mês: Dicas de Amamentação...",
  }, // Exemplo de dado extra
  // ...
];

const mockTopicDetailService = {
  getTopicContent: (
    topicId: number,
    monthId: number
  ): Promise<{ data: MonthData | undefined }> => {
    const topic = TOPIC_MAPPING[topicId];

    // Se o tópico não for por mês (como o 5), busca o primeiro dado (ou um dado específico)
    if (topicId === 5) {
      // Para "Banco de Leite", buscamos o conteúdo geral
      const generalContent = RAW_DATA.find((d) => d.mch_submenu_id === 4);
      return new Promise((resolve) =>
        setTimeout(() => resolve({ data: generalContent }), 500)
      );
    }

    // Para tópicos por mês (1, 2, 3, 4)
    const content = RAW_DATA.find(
      (d) => d.month_id === monthId && d.mch_submenu_id === topic.mch_submenu_id
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: content });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE TopicMonthDetail
// ===========================================

export function TopicMonthDetail() {
  const { topicId, monthId } = useParams<{
    topicId: string;
    monthId: string;
  }>();

  const numericTopicId = Number(topicId);
  const numericMonthId = Number(monthId);
  const currentTopic = TOPIC_MAPPING[numericTopicId];

  // Buscamos o conteúdo estritamente pelo topicId e monthId
  const { data, isLoading } = useQuery(
    ["topicMonthDetail", topicId, monthId],
    () =>
      mockTopicDetailService.getTopicContent(numericTopicId, numericMonthId),
    {
      enabled: !!topicId && !!monthId && !!currentTopic,
    }
  );

  const content = (data as { data: MonthData })?.data;

  // Bloco de Loading
  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Bloco de Não Encontrado
  if (!currentTopic || !content) {
    return (
      <Container size="md" py={60}>
        <Center>
          <Box ta="center">
            <IconAlertCircle size={38} color="red" />
            <Title order={4} mt="md">
              Conteúdo não encontrado para este mês ou tópico.
            </Title>
            <Button
              component={Link}
              to={`/mae-bebe/${topicId}/meses`}
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para a Lista de Meses
            </Button>
          </Box>
        </Center>
      </Container>
    );
  }

  const TopicIcon = currentTopic.icon;
  const isGeneralTopic = numericTopicId === 5; // Tópicos gerais não têm um mês específico

  return (
    <Box py={60} bg="gray.0">
      <Container size="lg">
        {/* Botão de voltar para a lista de meses */}
        <Button
          component={Link}
          to={`/mae-bebe/${topicId}/meses`}
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          mb="xl"
          size="sm"
        >
          Voltar para a Lista de {currentTopic.title}
        </Button>

        <Paper shadow="lg" radius="lg" p="xl" withBorder>
          <Group mb="md" justify="center" align="center">
            <TopicIcon size={40} color="var(--mantine-color-teal-6)" />

            <Box ta="center">
              <Text c="dimmed" size="lg" fw={500}>
                {isGeneralTopic
                  ? "Guia Principal"
                  : `Conteúdo do ${numericMonthId}º Mês`}
              </Text>
              <Title order={1} fw={700} size={40} c="dark.7">
                {currentTopic.title}
              </Title>
            </Box>
          </Group>

          <Center my="lg">
            <Badge color="blue" variant="light" size="lg">
              Foco no Conteúdo
            </Badge>
          </Center>

          {/* Conteúdo Principal (TEXTO LONG_INFO) */}
          <Paper
            mt="xl"
            p="xl"
            bg="white"
            radius="md"
            style={{ border: "1px solid var(--mantine-color-gray-2)" }}
          >
            <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
              {content.long_info}
            </Text>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}

