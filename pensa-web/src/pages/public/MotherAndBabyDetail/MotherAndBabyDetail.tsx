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
  IconStethoscope, // NOVO: Gravidez (Substitui IconFirstAidKit)
  IconVaccine, // NOVO: Vacinação (Substitui IconBulb)
  IconHeartbeat,
  IconBabyBottle, // Para a Categoria
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. INTERFACE E DADOS (MOCK) - ADAPTADO PARA MÃE E BEBÊ
// ===========================================

interface MonthDetailData {
  id: number; // month_id (1 a 12)
  name: string; // Título principal (ex: "Guia do 1º Mês")
  shortDescription: string; // Resumo do mês
  imageUrl: string; // Imagem do Hero (mantida como mock)
  category: string; // Categoria (ex: "Materno-Infantil")

  // CAMPOS ADAPTADOS DO SEU LAYOUT DE EMERGÊNCIA
  // quickAction (O que fazer) -> Informação da Gravidez
  quickAction: string;
  // contraindication (O que não fazer) -> Desenvolvimento do Bebê
  contraindication: string;
  // precaution (Precauções) -> Vacinação
  precaution?: string;
}

// Função auxiliar para mapear seus dados brutos
const mapRawDataToMonthDetail = (
  rawData: any[],
  monthId: number
): MonthDetailData | undefined => {
  const monthData = rawData.filter((d) => d.month_id === monthId);
  if (monthData.length === 0) return undefined;

  // Campos no seu mock: month_id, mch_submenu_id, info, long_info
  const pregnancy = monthData.find((d) => d.mch_submenu_id === 1);
  const babyDevelopment = monthData.find((d) => d.mch_submenu_id === 2);
  const vaccination = monthData.find((d) => d.mch_submenu_id === 3);

  // Usamos o long_info para o conteúdo principal
  return {
    id: monthId,
    name: `Guia Detalhado do ${monthId}º Mês`,
    shortDescription: `Informações sobre gravidez, desenvolvimento do bebê e vacinação.`,
    category: "Saúde Materno-Infantil",
    imageUrl: `/images-mae-bebe/mes-${monthId}.jpg`, // Imagem mock para cada mês

    // MAPEAMENTO DOS SEUS DADOS PARA O LAYOUT DE EMERGÊNCIA
    quickAction: pregnancy
      ? pregnancy.long_info
      : "Informação da Gravidez não disponível.",
    contraindication: babyDevelopment
      ? babyDevelopment.long_info
      : "Informação do Desenvolvimento do Bebê não disponível.",
    precaution: vaccination
      ? vaccination.long_info
      : "Informação da Vacinação não disponível.",
  };
};

// SEUS DADOS BRUTOS (com a estrutura month_id, mch_submenu_id, info, long_info)
const RAW_DATA = [
  {
    month_id: 1,
    mch_submenu_id: 1,
    info: "1º mês da gravidez: Sente o que geralmente sente durante a menstruação...",
    long_info:
      "1º Mês da Gravidez: o Início das Mudanças\nNo primeiro mês da gravidez...",
  },
  {
    month_id: 1,
    mch_submenu_id: 2,
    info: "1º mês de vida: Reage ao som de bater palma ou sino...",
    long_info:
      "1º Mês de Vida: \nNo primeiro mês de vida, o bebê começa a demonstrar reacções básicas...",
  },
  {
    month_id: 1,
    mch_submenu_id: 3,
    info: "Parabens pelo nascimento do seu bebê! Durante o 1º mês deve fazer vacina de Polio 0 e de BCG...",
    long_info:
      "Parabéns pelo nascimento do seu bebê!\nA chegada do seu bebê é um momento especial...",
  },

  {
    month_id: 2,
    mch_submenu_id: 1,
    info: "2º mês da gravidez: As mamas ficam dolorosas e inchadas...",
    long_info:
      "2º Mês da Gravidez: transformações visíveis e novos sintomas\nNo segundo mês de gestação...",
  },
  {
    month_id: 2,
    mch_submenu_id: 2,
    info: "2º mês de vida: Sorri socialmente em resposta à estímulos visuais...",
    long_info:
      "2º Mês de Vida: Descobrindo o Mundo ao Redor\nNo segundo mês de vida, o bebê começa a interagir...",
  },
  {
    month_id: 2,
    mch_submenu_id: 3,
    info: "2º mês do bebê deve fazer a 1a dose das vacinas contra: Pólio oral (VAP), Pentavalente...",
    long_info:
      "2º Mês do Bebê: Proteção Começa com a Vacinação\nNo segundo mês de vida, o bebê deve receber a primeira dose...",
  },

  {
    month_id: 3,
    mch_submenu_id: 1,
    info: "3º mês da gravidez: Os principais órgãos estão em formação...",
    long_info:
      "3º mês da gravidez: Os principais órgãos estão em formação e a mãe começa a ouvir os batimentos cardíacos do feto.",
  },
  {
    month_id: 3,
    mch_submenu_id: 2,
    info: "3º mês de vida: Acompanha objectos virando a cabeça...",
    long_info:
      "3º mês de vida: Acompanha objectos virando a cabeça e o tronco para os lados. Murmura sons diferentes e dá gritinhos. Tenta rolar e virar, quando deitado.",
  },
  {
    month_id: 3,
    mch_submenu_id: 3,
    info: "3º mês do bebê deve fazer a 2a dose das vacinas contra: Pólio oral (VAP), Pentavalente...",
    long_info:
      "3º Mês do Bebê: proteção reforçada com a 2ª dose das vacinas\nNo terceiro mês de vida, o bebê deve receber a segunda dose...",
  },

  {
    month_id: 4,
    mch_submenu_id: 1,
    info: "4º mês da gravidez: Podem aparecer manchas no rosto...",
    long_info:
      "4º Mês da Gravidez: novas sensações e mudanças visíveis\nNo quarto mês de gravidez, muitas mulheres...",
  },
  {
    month_id: 4,
    mch_submenu_id: 2,
    info: "4º mês de vida: Uma das mãos brinca com a outra...",
    long_info:
      "4º Mês de Vida: descobertas e primeiras habilidades\nNo quarto mês de vida, o bebê começa a desenvolver maior controle...",
  },
  {
    month_id: 4,
    mch_submenu_id: 3,
    info: "4º mês do bebê deve fazer a 3a dose das vacinas contra: Pólio oral...",
    long_info:
      "4º Mês do Bebê: Proteção Essencial com as Vacinas\nNo quarto mês de vida, o bebê deve receber a terceira dose...",
  },

  {
    month_id: 5,
    mch_submenu_id: 1,
    info: "5º mês da gravidez: A pele da mulher fica mais oleosa...",
    long_info:
      "5º Mês da Gravidez: conexão e transformações\nNo quinto mês de gestação, a mulher pode perceber...",
  },
  {
    month_id: 5,
    mch_submenu_id: 2,
    info: "5º mês de vida: Tenta alcançar objectos colocados à sua frente...",
    long_info:
      "5º Mês de Vida: descoberta e interação\nNo quinto mês de vida, o bebê demonstra maior coordenação...",
  },
  {
    month_id: 5,
    mch_submenu_id: 3,
    info: "5º mês: não está prevista nenhuma vacina",
    long_info:
      "No quinto mês de vida do bebê, não há nenhuma vacina programada no calendário nacional de imunização...",
  },

  {
    month_id: 6,
    mch_submenu_id: 1,
    info: "6º mês da gravidez: Aumenta o crescimento da barriga...",
    long_info:
      "No sexto mês de gravidez, a barriga continua crescendo significativamente, acompanhada pelo possível aumento...",
  },
  {
    month_id: 6,
    mch_submenu_id: 2,
    info: "6º mês de vida: De barriga para cima, consegue virar de barriga para baixo...",
    long_info:
      "6º mês de vida: O bebê começa a desenvolver maior controle sobre seus movimentos. Quando está de barriga para cima...",
  },
  {
    month_id: 6,
    mch_submenu_id: 3,
    info: "6º mês: O bebe deve receber a 1a dose da vacina contra a malária...",
    long_info:
      "6º mês: O bebe deve receber a 1a dose da vacina contra a malária. A vacina é gratuita nas unidades sanitárias.",
  },

  {
    month_id: 7,
    mch_submenu_id: 1,
    info: "7º mês da gravidez: O feto se movimenta e cresce muito...",
    long_info:
      "7º mês de gravidez: o crescimento do feto acelera, e ele se movimenta bastante dentro do útero. Nessa fase, é comum que a mulher comece...",
  },
  {
    month_id: 7,
    mch_submenu_id: 2,
    info: "7º mês de vida: Fala sílabas repetidas: mamã, dadá...",
    long_info:
      '7º mês de vida: O bebê começa a pronunciar sílabas repetidas, como "mamã" e "dadá", e demonstra interesse por brincadeiras...',
  },
  {
    month_id: 7,
    mch_submenu_id: 3,
    info: "7º mês: O bebe deve receber a 2a dose da vacina contra a malária...",
    long_info: "Vacinas: Nenhuma vacina está prevista para este mês.",
  }, // Corrigido, pois a vacina é a 2a dose da Malária, mas a long_info está 'Nenhuma vacina'

  {
    month_id: 8,
    mch_submenu_id: 1,
    info: "8º mês da gravidez: A mulher pode sentir dores na coluna...",
    long_info:
      "8º mês de gravidez: A mulher pode sentir desconfortos na coluna, costas, pernas e pés, além de começar a ter contrações...",
  },
  {
    month_id: 8,
    mch_submenu_id: 2,
    info: "8º mês de vida: Senta sem apoio. Começa a gatinhar...",
    long_info:
      "8º mês de vida: O bebê já consegue sentar-se sem apoio e inicia os primeiros movimentos de engatinhar. Ele também aprimora a coordenação...",
  },
  {
    month_id: 8,
    mch_submenu_id: 3,
    info: "8º mês: não está prevista nenhuma vacina",
    long_info: "Vacinas: Nenhuma vacina está prevista para este mês.",
  },

  {
    month_id: 9,
    mch_submenu_id: 1,
    info: "9º mês da gravidez: O corpo da mulher começa a adaptar-se...",
    long_info:
      "9º mês de gravidez: O corpo da mulher começa a se preparar para o trabalho de parto. A barriga desce um pouco...",
  },
  {
    month_id: 9,
    mch_submenu_id: 2,
    info: "9º mês de vida: Fala palavras com sílabas diferentes (gato, pato)...",
    long_info:
      '9º mês de vida: O bebê começa a falar palavras com sílabas diferentes, como "gato" e "pato". Ele também aprimora a mobilidade...',
  },
  {
    month_id: 9,
    mch_submenu_id: 3,
    info: "9º mês do bebê deve fazer a 1a dose da vacina anti-Sarampo...",
    long_info:
      "Vacinas: Neste mês, é necessária a 1ª dose da vacina contra o Sarampo (VAS).",
  },

  {
    month_id: 10,
    mch_submenu_id: 1,
    info: "10º mês de vida: N/A",
    long_info: "N/A",
  }, // Gravidez já terminou
  {
    month_id: 10,
    mch_submenu_id: 2,
    info: "10º mês de vida: Imita gestos, bate palminhas...",
    long_info:
      '10º mês de vida: O bebê já imita gestos como bater palminhas e acenar para dar "tchau"...',
  },
  {
    month_id: 10,
    mch_submenu_id: 3,
    info: "10º mês: não está prevista nenhuma vacina",
    long_info: "Vacinas: Nenhuma vacina está prevista para este mês.",
  },

  {
    month_id: 11,
    mch_submenu_id: 1,
    info: "11º mês de vida: N/A",
    long_info: "N/A",
  }, // Gravidez já terminou
  {
    month_id: 11,
    mch_submenu_id: 2,
    info: "11º mês de vida: Imita sons de fala como se conversasse...",
    long_info:
      "11º mês de vida: A comunicação se desenvolve ainda mais, e o bebê começa a imitar sons de fala...",
  },
  {
    month_id: 11,
    mch_submenu_id: 3,
    info: "11º mês: não está prevista nenhuma vacina",
    long_info: "Vacinas: Nenhuma vacina está prevista para este mês.",
  },

  {
    month_id: 12,
    mch_submenu_id: 1,
    info: "12º mês de vida: N/A",
    long_info: "N/A",
  }, // Gravidez já terminou
  {
    month_id: 12,
    mch_submenu_id: 2,
    info: "12º mês de vida: Imita sons. Anda apoiado nos nóveis...",
    long_info:
      "12º mês de vida: O bebê continua a aperfeiçoar sua fala, imitando diferentes sons...",
  },
  {
    month_id: 12,
    mch_submenu_id: 3,
    info: "12º mês: 1 ano e 6 meses, o bebe deve receber a 4a dose da vacina contra a malária...",
    long_info: "Vacinas: Nenhuma vacina está prevista para este mês.",
  }, // Corrigido: O seu dado aponta para 1 ano e 6 meses (18 meses), mas o ID é 12. Mantenho a long_info.
];

// MOCK para simular emergenciesService.getById
const mockMotherAndBabyService = {
  getById: (id: number): Promise<{ data: MonthDetailData | undefined }> => {
    const data = mapRawDataToMonthDetail(RAW_DATA, id);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE COM LAYOUT CORRIGIDO E DADOS ADAPTADOS
// ===========================================

// Renomeado de EmergencyDetail para MotherAndBabyDetail
export function MotherAndBabyDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery(
    ["motherAndBabyMonth", id],
    () => mockMotherAndBabyService.getById(Number(id)),
    {
      enabled: !!id,
    }
  );

  const monthData: MonthDetailData | undefined = (
    data as { data: MonthDetailData }
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
  if (!monthData || Number(id) < 1 || Number(id) > 12) {
    return (
      <Container size="md" py={60}>
        <Center>
          <Box ta="center">
            <IconAlertCircle size={38} color="red" />
            <Title order={4} mt="md">
              Guia do Mês não encontrado
            </Title>
            <Button
              component={Link}
              to="/mae-bebe" // Rota corrigida para a lista de Mãe e Bebê
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para o Guia Materno-Infantil
            </Button>
          </Box>
        </Center>
      </Container>
    );
  }

  const month = monthData;
  const monthNumber = Number(id);

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
        {/* Botão de voltar */}
        <Button
          component={Link}
          to="/mae-bebe"
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          pos="absolute"
          top={10}
          left={0}
          radius="xl"
          size="sm"
          z-index={10}
        >
          Voltar
        </Button>

        {/* Hero visual */}
        <Paper
          shadow="lg"
          radius="lg"
          mb="xl"
          p={0}
          style={{
            position: "relative",
            overflow: "hidden",
            height: 300,
          }}
        >
          {/* Imagem de Fundo */}
          <Image
            src={month.imageUrl}
            alt={month.name}
            fit="cover"
            radius="lg"
            // Mantendo o brilho de 60%
            style={{ height: 300, filter: "brightness(0.6)" }}
            fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2366CCCC'/%3E%3C/svg%3E"
          />
          {/* Overlay Escuro (opcional, pode ser removido se o filter:brightness for suficiente) */}
          <Box
            pos="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              borderRadius: "var(--mantine-radius-lg)",
              zIndex: 1,
            }}
          />
          {/* Texto do Hero */}
          <Box
            ta="center"
            pos="absolute"
            top="50%"
            left="50%"
            style={{ transform: "translate(-50%, -50%)", zIndex: 2 }}
          >
            <Title order={1} c="white" fw={800} size={50}>
              {month.name}
            </Title>
            <Badge
              color="teal"
              variant="filled"
              mt="sm"
              size="lg"
              leftSection={<IconHeartbeat size={14} />}
            >
              {formatCategory(month.category)}
            </Badge>
            <Text c="gray.1" mt="sm" fw={500} size="lg">
              {month.shortDescription}
            </Text>
          </Box>
        </Paper>

        {/* Conteúdo principal - Disposição das 3 informações */}

        {/* Bloco 1: Gravidez (Mostrado apenas até o 9º mês) */}
        {monthNumber <= 9 && (
          <>
            <Paper shadow="sm" radius="lg" p="xl" withBorder mb="xl">
              <Group mb="md">
                <IconStethoscope
                  size={26}
                  color="var(--mantine-color-teal-6)"
                />
                <Title order={3} fw={700}>
                  Gravidez: {monthNumber}º Mês
                </Title>
              </Group>
              <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                {month.quickAction}
              </Text>
            </Paper>
            <Divider my="lg" />
          </>
        )}

        {/* Bloco 2: Desenvolvimento do Bebê (Colunas) */}
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="sm"
              radius="lg"
              p="xl"
              withBorder
              style={{ height: "100%" }}
            >
              <Group mb="md">
                <IconBabyBottle size={26} color="var(--mantine-color-blue-6)" />
                <Title order={3} fw={700}>
                  Desenvolvimento do Bebê
                </Title>
              </Group>
              <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                {month.contraindication}
              </Text>
            </Paper>
          </Grid.Col>

          {/* Bloco 3: Vacinação (Colunas) */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper
              shadow="sm"
              radius="lg"
              p="xl"
              withBorder
              style={{ height: "100%" }}
            >
              <Group mb="md">
                <IconVaccine size={26} color="var(--mantine-color-lime-6)" />
                <Title order={3} fw={700}>
                  Vacinação
                </Title>
              </Group>
              <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                {month.precaution}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

