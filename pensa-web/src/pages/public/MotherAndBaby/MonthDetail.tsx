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
  IconStethoscope, // Gravidez
  IconVaccine, // Vacinação
  IconHeartbeat,
  IconBabyBottle,
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. INTERFACE E DADOS (MOCK) - ADAPTADO PARA MÃE E BEBÊ
// ===========================================

interface MonthDetailData {
  id: number; // month_id (1 a 12)
  name: string; // Título principal (ex: "Guia Detalhado do 1º Mês")
  shortDescription: string; // Resumo do mês
  imageUrl: string; // Imagem do Hero (mantida como mock)
  category: string; // Categoria (ex: "Saúde Materno-Infantil")

  // CAMPOS ADAPTADOS DO LAYOUT ANTERIOR
  quickAction: string; // -> Informação da Gravidez (mch_submenu_id: 1)
  contraindication: string; // -> Desenvolvimento do Bebê (mch_submenu_id: 2)
  precaution?: string; // -> Vacinação (mch_submenu_id: 3)
}

// SEUS DADOS BRUTOS COMPLETOS
const RAW_DATA = [
  {
    month_id: 1,
    mch_submenu_id: 1,
    info: "1º mês da gravidez: Sente o que geralmente sente durante a menstruação...",
    long_info:
      "1º Mês da Gravidez: o Início das Mudanças\nNo primeiro mês de gravidez, muitas mulheres experimentam sintomas semelhantes aos do período menstrual. É comum sentir desconforto abdominal, sensibilidade nos seios, mudanças de humor e dores no corpo. Essas sensações ocorrem devido às alterações hormonais que preparam o corpo para o desenvolvimento do bebê.",
  },
  {
    month_id: 1,
    mch_submenu_id: 2,
    info: "1º mês de vida: Reage ao som de bater palma ou sino...",
    long_info:
      "1º Mês de Vida: \nNo primeiro mês de vida, o bebê começa a demonstrar reacções básicas ao ambiente ao seu redor. Sons como o bater de palmas ou o toque de um sino a cerca de 30 cm da sua orelha chamam sua atenção e podem provocar pequenos sobressaltos ou piscadas reflexivas.\n\nO contato visual também se torna mais evidente. O bebê passa a observar atentamente os rostos que se aproximam, especialmente aqueles que interagem com ele com frequência, como os dos pais e cuidadores. Esse reconhecimento inicial é fundamental para o vínculo afetivo.",
  },
  {
    month_id: 1,
    mch_submenu_id: 3,
    info: "Parabens pelo nascimento do seu bebê! Durante o 1º mês deve fazer vacina de Polio 0 e de BCG...",
    long_info:
      "Parabéns pelo nascimento do seu bebê!\nA chegada do seu bebê é um momento especial e cheio de novas descobertas. Para garantir a proteção da saúde do recém-nascido, é essencial seguir o calendário de vacinação desde os primeiros dias de vida.\n\nNo primeiro mês, seu bebê deve receber duas vacinas fundamentais: a Poliomielite Zero (Polio 0), que ajuda a prevenir a paralisia infantil, e a BCG, que protege contra formas graves de tuberculose. Ambas as vacinas são gratuitas e estão disponíveis nos centros de saúde.",
  },

  {
    month_id: 2,
    mch_submenu_id: 1,
    info: "2º mês da gravidez: As mamas ficam dolorosas e inchadas...",
    long_info:
      "2º Mês da Gravidez: transformações visíveis e novos sintomas\nNo segundo mês de gestação, as mudanças no corpo começam a se tornar mais perceptíveis. As mamas ficam mais sensíveis, doloridas e inchadas devido ao aumento dos hormônios que preparam o organismo para a amamentação.\n\nAlém disso, muitas mulheres começam a sentir náuseas, enjoos e até mesmo episódios de vômito, especialmente pela manhã. O cansaço também se intensifica, já que o corpo está trabalhando para sustentar o desenvolvimento do bebê.",
  },
  {
    month_id: 2,
    mch_submenu_id: 2,
    info: "2º mês de vida: Sorri socialmente em resposta à estímulos visuais...",
    long_info:
      "2º Mês de Vida: Descobrindo o Mundo ao Redor\nNo segundo mês de vida, o bebê começa a interagir mais com o ambiente e a demonstrar suas primeiras respostas sociais. Um dos marcos mais emocionantes dessa fase é o sorriso social, que surge em resposta a estímulos visuais ou sonoros, como rostos familiares e vozes carinhosas.\n\nAlém disso, o bebê passa a explorar o próprio corpo e os objetos ao seu redor. Ele pode tocar ou bater em objetos próximos, ainda de forma descoordenada, mas já demonstrando curiosidade.",
  },
  {
    month_id: 2,
    mch_submenu_id: 3,
    info: "2º mês do bebê deve fazer a 1a dose das vacinas contra: Pólio oral (VAP), Pentavalente...",
    long_info:
      "2º Mês do Bebê: Proteção Começa com a Vacinação\nNo segundo mês de vida, o bebê deve receber a primeira dose de vacinas essenciais para protegê-lo contra diversas doenças. As vacinas aplicadas nesse período incluem:\n- Poliomielite Oral (VAP)\n- Pentavalente (DPT+HepB+Hib)\n- Pneumocócica (PCV)\n- Rotavírus (RV)",
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
      "3º Mês do Bebê: proteção reforçada com a 2ª dose das vacinas\nNo terceiro mês de vida, o bebê deve receber a segunda dose de vacinas essenciais. Essa etapa inclui:\n- Vacina contra a Poliomielite Oral (VAP)\n- Pentavalente (DPT+HepB+Hib)\n- Vacina Pneumocócica Conjugada (PCV)\n- Vacina contra o Rotavírus (RV)",
  },

  {
    month_id: 4,
    mch_submenu_id: 1,
    info: "4º mês da gravidez: Podem aparecer manchas no rosto...",
    long_info:
      "4º Mês da Gravidez: novas sensações e mudanças visíveis\nNo quarto mês de gravidez, podem aparecer manchas escuras no rosto (melasma). Os enjoos e vômitos costumam diminuir. A mulher pode começar a sentir os primeiros movimentos do bebê.",
  },
  {
    month_id: 4,
    mch_submenu_id: 2,
    info: "4º mês de vida: Uma das mãos brinca com a outra...",
    long_info:
      "4º Mês de Vida: descobertas e primeiras habilidades\nO bebê começa a desenvolver maior controle sobre os movimentos das mãos. Ele brinca com os próprios dedos e demonstra excitação e alegria ao ver alimentos ou objetos de que gosta. Ideal para estimular com brinquedos seguros.",
  },
  {
    month_id: 4,
    mch_submenu_id: 3,
    info: "4º mês do bebê deve fazer a 3a dose das vacinas contra: Pólio oral...",
    long_info:
      "4º Mês do Bebê: Proteção Essencial com as Vacinas\nNeste mês, o bebê deve receber a terceira dose de algumas vacinas:\n- Pólio Oral\n- Pentavalente (DPT+HepB+Hib)\n- Pneumocócica\n- Pólio Injetável (IPV)",
  },

  {
    month_id: 5,
    mch_submenu_id: 1,
    info: "5º mês da gravidez: A pele da mulher fica mais oleosa...",
    long_info:
      "5º Mês da Gravidez: conexão e transformações\nA pele da mulher fica mais oleosa. Sente melhor os movimentos do feto, que começa a chupar o polegar dentro do útero. É um período marcante para a conexão com o bebê.",
  },
  {
    month_id: 5,
    mch_submenu_id: 2,
    info: "5º mês de vida: Tenta alcançar objectos colocados à sua frente...",
    long_info:
      "5º Mês de Vida: descoberta e interação\nO bebê tenta alcançar objetos e os leva à boca para explorar. Começa a imitar sons de fala e já olha e vira-se quando chamado pelo nome. Demonstra maior coordenação motora.",
  },
  {
    month_id: 5,
    mch_submenu_id: 3,
    info: "5º mês: não está prevista nenhuma vacina",
    long_info:
      "No quinto mês de vida do bebê, não há nenhuma vacina programada no calendário nacional de imunização. Mantenha as consultas de rotina para monitorar o crescimento e bem-estar.",
  },

  {
    month_id: 6,
    mch_submenu_id: 1,
    info: "6º mês da gravidez: Aumenta o crescimento da barriga...",
    long_info:
      "6º Mês da Gravidez: A barriga cresce significativamente. Pode haver aumento das varizes. O feto já consegue ouvir os sons internos do corpo da mãe (batimentos cardíacos) e ruídos externos. Interaja com o bebê por meio de conversas e música.",
  },
  {
    month_id: 6,
    mch_submenu_id: 2,
    info: "6º mês de vida: De barriga para cima, consegue virar de barriga para baixo...",
    long_info:
      "6º Mês de Vida: O bebê começa a desenvolver maior controle sobre seus movimentos. Consegue virar de barriga para cima para baixo e, às vezes, retornar. Pode levar os pés à boca e já consegue sentar-se com apoio.",
  },
  {
    month_id: 6,
    mch_submenu_id: 3,
    info: "6º mês: O bebe deve receber a 1a dose da vacina contra a malária...",
    long_info:
      "6º Mês: O bebê deve receber a 1ª dose da vacina contra a malária. A vacina é gratuita nos centros de saúde.",
  },

  {
    month_id: 7,
    mch_submenu_id: 1,
    info: "7º mês da gravidez: O feto se movimenta e cresce muito...",
    long_info:
      "7º Mês de Gravidez: O feto se movimenta e cresce muito. É comum que a mulher comece a apresentar inchaços nas pernas e pés devido à retenção de líquidos.",
  },
  {
    month_id: 7,
    mch_submenu_id: 2,
    info: "7º mês de vida: Fala sílabas repetidas: mamã, dadá...",
    long_info:
      '7º Mês de Vida: O bebê começa a pronunciar sílabas repetidas, como "mamã" e "dadá". Ele brinca de esconde-achou e aprimora a coordenação motora pegando objetos pequenos com o movimento de pinça (polegar e indicador).',
  },
  {
    month_id: 7,
    mch_submenu_id: 3,
    info: "7º mês: O bebe deve receber a 2a dose da vacina contra a malária...",
    long_info:
      "7º Mês: O bebê deve receber a 2ª dose da vacina contra a malária. A vacina é gratuita nos centros de saúde. (Nota: Embora a informação de vacinação esteja listada, consulte o calendário oficial.)",
  },

  {
    month_id: 8,
    mch_submenu_id: 1,
    info: "8º mês da gravidez: A mulher pode sentir dores na coluna...",
    long_info:
      "8º Mês de Gravidez: A mulher pode sentir dores na coluna, pernas e pés. Pode ter contrações preparatórias. É crucial fazer o rastreio da Tensão Alta e da Diabetes Gestacional.",
  },
  {
    month_id: 8,
    mch_submenu_id: 2,
    info: "8º mês de vida: Senta sem apoio. Começa a gatinhar...",
    long_info:
      "8º Mês de Vida: O bebê já consegue sentar-se sem apoio e inicia os primeiros movimentos de engatinhar. Transfere objetos de uma mão para outra e imita sons ou gestos dos adultos.",
  },
  {
    month_id: 8,
    mch_submenu_id: 3,
    info: "8º mês: não está prevista nenhuma vacina",
    long_info:
      "8º Mês: Nenhuma vacina está prevista para este mês. Mantenha as consultas de rotina.",
  },

  {
    month_id: 9,
    mch_submenu_id: 1,
    info: "9º mês da gravidez: O corpo da mulher começa a adaptar-se...",
    long_info:
      "9º Mês de Gravidez: O corpo se prepara para o trabalho de parto. A barriga desce um pouco (encaixe do bebê) e as contrações (de Braxton Hicks ou reais) são mais frequentes. Preparação final para o nascimento.",
  },
  {
    month_id: 9,
    mch_submenu_id: 2,
    info: "9º mês de vida: Fala palavras com sílabas diferentes (gato, pato)...",
    long_info:
      "9º Mês de Vida: O bebê começa a falar palavras com sílabas diferentes (gato, pato). Consegue gatinhar e fica de pé com apoio. Demonstra mais determinação e vontade própria.",
  },
  {
    month_id: 9,
    mch_submenu_id: 3,
    info: "9º mês do bebê deve fazer a 1a dose da vacina anti-Sarampo...",
    long_info:
      "9º Mês: O bebê deve receber a 1ª dose da vacina anti-Sarampo (VAS) e a 3ª dose da vacina contra a malária. As vacinas são gratuitas nos centros de saúde.",
  },

  // Meses pós-gravidez (Apenas Bebê e Vacina têm dados relevantes)
  {
    month_id: 10,
    mch_submenu_id: 1,
    info: "N/A",
    long_info:
      "A gravidez já foi concluída. Foco no desenvolvimento do seu bebê.",
  },
  {
    month_id: 10,
    mch_submenu_id: 2,
    info: "10º mês de vida: Imita gestos, bate palminhas...",
    long_info:
      "10º Mês de Vida: O bebê imita gestos, bate palminhas e acena (tatá). Consegue levantar e sentar-se sozinho quando deitado. Fica de pé e anda com apoio.",
  },
  {
    month_id: 10,
    mch_submenu_id: 3,
    info: "10º mês: não está prevista nenhuma vacina",
    long_info: "10º Mês: Nenhuma vacina está prevista para este mês.",
  },

  {
    month_id: 11,
    mch_submenu_id: 1,
    info: "N/A",
    long_info:
      "A gravidez já foi concluída. Foco no desenvolvimento do seu bebê.",
  },
  {
    month_id: 11,
    mch_submenu_id: 2,
    info: "11º mês de vida: Imita sons de fala como se conversasse...",
    long_info:
      "11º Mês de Vida: A comunicação se desenvolve mais: o bebê imita sons de fala como se conversasse. Aprimora as habilidades motoras finas ao colocar e tirar objetos de dentro de caixas ou baldes.",
  },
  {
    month_id: 11,
    mch_submenu_id: 3,
    info: "11º mês: não está prevista nenhuma vacina",
    long_info: "11º Mês: Nenhuma vacina está prevista para este mês.",
  },

  {
    month_id: 12,
    mch_submenu_id: 1,
    info: "N/A",
    long_info:
      "A gravidez já foi concluída. Foco no desenvolvimento do seu bebê.",
  },
  {
    month_id: 12,
    mch_submenu_id: 2,
    info: "12º mês de vida: Imita sons. Anda apoiado nos nóveis...",
    long_info:
      "12º Mês de Vida: O bebê continua a imitar sons. Anda apoiado nos móveis ou seguro por uma das mãos. Usa um copo para beber líquidos sozinho, um marco de independência.",
  },
  {
    month_id: 12,
    mch_submenu_id: 3,
    info: "12º mês: 1 ano e 6 meses, o bebe deve receber a 4a dose da vacina contra a malária...",
    long_info:
      "12º Mês: Nenhuma vacina está prevista para este mês. (Nota: A 4ª dose da Malária está prevista para 1 ano e 6 meses.)",
  },
];

// Função auxiliar para mapear seus dados brutos
const mapRawDataToMonthDetail = (
  rawData: any[],
  monthId: number
): MonthDetailData | undefined => {
  const monthData = rawData.filter((d) => d.month_id === monthId);
  if (monthData.length === 0) return undefined;

  const pregnancy = monthData.find((d) => d.mch_submenu_id === 1);
  const babyDevelopment = monthData.find((d) => d.mch_submenu_id === 2);
  const vaccination = monthData.find((d) => d.mch_submenu_id === 3);

  // Define a categoria e descrição baseada no mês
  let category = "Saúde Materno-Infantil";
  let shortDescription =
    "Informações sobre desenvolvimento, saúde e vacinação.";
  if (monthId <= 9) {
    category = "Gravidez e Pós-Parto";
    shortDescription = `Foco na gestação e nos cuidados com o recém-nascido.`;
  } else {
    category = "1º Ano de Vida do Bebê";
    shortDescription = `Foco no desenvolvimento e rotina do bebê.`;
  }

  return {
    id: monthId,
    name: `Guia Detalhado do ${monthId}º Mês`,
    shortDescription: shortDescription,
    category: category,
    imageUrl: `/images-mae-bebe/mes-${monthId}.jpg`, // Imagem mock

    // MAPEAMENTO USADO NO LAYOUT
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

// MOCK para simular o serviço de busca por ID
const mockMotherAndBabyService = {
  getById: (id: number): Promise<{ data: MonthDetailData | undefined }> => {
    const data = mapRawDataToMonthDetail(RAW_DATA, id);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data });
      }, 500); // Simula delay de rede
    });
  },
};

// ===========================================
// 2. COMPONENTE MonthDetail
// ===========================================

export function MonthDetail() {
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
            {/* Volta para a lista de tópicos principais */}
            <Button
              component={Link}
              to="/mae-bebe"
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para o Menu Principal
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
        {/* Botão de voltar para a lista de meses (Assumindo que a rota é /mae-bebe/:topicId/meses, mas voltaremos para o menu principal para simplificar) */}
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
          Voltar para o Menu
        </Button>

        {/* Hero visual */}
        <Paper
          shadow="lg"
          radius="lg"
          mb="xl"
          p={0}
          style={{ position: "relative", overflow: "hidden", height: 300 }}
        >
          <Image
            src={month.imageUrl}
            alt={month.name}
            fit="cover"
            radius="lg"
            style={{ height: 300, filter: "brightness(0.6)" }}
            fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2366CCCC'/%3E%3C/svg%3E"
          />
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

        {/* Conteúdo principal */}
        <Grid gutter="xl">
          {/* Coluna 1: Gravidez (Mostrada apenas até o 9º mês) */}
          {monthNumber <= 9 && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                shadow="sm"
                radius="lg"
                p="xl"
                withBorder
                style={{ height: "100%" }}
              >
                <Group mb="md">
                  <IconStethoscope
                    size={26}
                    color="var(--mantine-color-teal-6)"
                  />
                  <Title order={3} fw={700}>
                    {monthNumber}º Mês de Gravidez
                  </Title>
                </Group>
                <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                  {month.quickAction} {/* -> Gravidez */}
                </Text>
              </Paper>
            </Grid.Col>
          )}

          {/* Coluna 2: Desenvolvimento do Bebê */}
          <Grid.Col span={{ base: 12, md: monthNumber <= 9 ? 6 : 12 }}>
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
                {month.contraindication} {/* -> Desenvolvimento */}
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Seção de Vacinação (Sempre em baixo, como Precaução) */}
        {month.precaution && (
          <Paper shadow="sm" radius="lg" p="xl" mt="xl" withBorder>
            <Group mb="md">
              <IconVaccine size={26} color="var(--mantine-color-lime-6)" />
              <Title order={3} fw={700}>
                Vacinação e Cuidados de Saúde
              </Title>
            </Group>
            <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
              {month.precaution} {/* -> Vacinação */}
            </Text>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

