import { Link } from "react-router-dom";
import { useEffect } from "react";
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
  List,
  Accordion,
  ThemeIcon,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconPhone,
  IconAlertCircle,
  IconHelp,
  IconDroplet,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - GUIA DE AMAMENTAÇÃO E BANCO DE LEITE
// ===========================================

interface GuideSection {
  title: string;
  icon: React.FC<any>;
  content: string | string[]; // Pode ser texto ou lista de pontos
}

// MOCK do Guia com as SUAS INFORMAÇÕES ESPECÍFICAS
const MOCK_GUIDE: GuideSection[] = [
  {
    title: "O que é um Banco de Leite Humano (BLH)?",
    icon: IconInfoCircle,
    content:
      "É um serviço especializado e obrigatório em hospitais de alto risco neonatal. Ele atua na promoção, proteção e apoio à amamentação, e realiza a coleta, processamento e controle de qualidade do leite materno doado para ser distribuído aos bebés internados.",
  },
  {
    title: "Função Primordial do Banco de Leite",
    icon: IconHelp,
    content:
      "A principal função é fornecer leite humano pasteurizado para recém-nascidos prematuros ou de baixo peso que estão internados e cujas mães não podem amamentar, garantindo-lhes todos os benefícios nutricionais e imunológicos do leite materno.",
  },
  {
    title: "Quem Pode Doar Leite?",
    icon: IconDroplet,
    content: [
      "Mães que estão a amamentar e têm excesso de leite (volume extra para além do que o seu próprio bebé consome).",
      "Mães saudáveis, que não fumam ou usam drogas ilícitas e que não consomem grandes quantidades de álcool.",
      "Mães que realizaram exames pré-natais compatíveis (o rastreio é feito no próprio banco de leite).",
    ],
  },
  {
    title: "Sinais de Excesso de Leite Materno (Hiperlactação)",
    icon: IconAlertCircle,
    content: [
      "Saturação/engurgitamento mamário frequente e persistente, mesmo após o bebé mamar.",
      "O bebé engasga ou tosse frequentemente durante a mamada devido ao fluxo muito forte.",
      "A mãe sente dor ou desconforto pela pressão do leite nas mamas.",
    ],
  },
  {
    title: "Contactos e Localização do Banco de Leite",
    icon: IconPhone,
    content: `Hospital Central de Maputo (HCM)\n\nLocalização: Ao lado do Serviço de Urgência de Pediatria (Pergunte por 'Banco de Leite Humano HCM').\n\nContacto Telefónico: 84 309 1937\n\nNota: Ligue antes para confirmar os horários de doação ou obter mais informações sobre o processo.`,
  },
  // Removi os tópicos gerais (Benefícios, Técnicas, Armazenamento) para focar apenas no BLH,
  // mas você pode reintroduzi-los se a página for para AMAMENTAÇÃO E Banco de Leite.
];

// MOCK Service (simplesmente retorna os dados)
const mockService = {
  getGuide: (): Promise<{ data: GuideSection[] }> => {
    // Simula a busca de dados
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_GUIDE });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE BreastfeedingGuide
// ===========================================

export function BreastfeedingGuide() {
  const { data, isLoading } = useQuery(
    "breastfeedingGuide",
    mockService.getGuide
  );

  // ===============================================
  // ✨ NOVO: useEffect para rolar para o topo
  // ===============================================
  useEffect(() => {
    // Rola a janela para o topo apenas na montagem inicial do componente.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // Array de dependências vazio garante que ele execute apenas uma vez

  const contentList: GuideSection[] = data?.data || [];

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
                Banco de Leite Humano (BLH)
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Informações essenciais sobre a doação de leite, a função do BLH e
            como entrar em contacto.
          </Text>

          <Divider mb="xl" labelPosition="center" />

          <Accordion
            defaultValue={contentList[0]?.title}
            variant="contained"
            radius="md"
          >
            {contentList.map((section, index) => {
              const SectionIcon = section.icon;

              // Formatação do conteúdo: lista ou texto/prosa
              const contentDisplay = Array.isArray(section.content) ? (
                <List
                  size="sm"
                  spacing="xs"
                  icon={
                    <ThemeIcon color="grape" size={20} radius="xl">
                      <IconAlertCircle size={14} />
                    </ThemeIcon>
                  }
                >
                  {section.content.map((item, i) => (
                    <List.Item key={i}>{item}</List.Item>
                  ))}
                </List>
              ) : (
                // Usa pre-line para respeitar quebras de linha no conteúdo (útil para os contatos)
                <Text size="md" lh="lg" style={{ whiteSpace: "pre-line" }}>
                  {section.content}
                </Text>
              );

              return (
                <Accordion.Item value={section.title} key={index}>
                  <Accordion.Control
                    icon={
                      <SectionIcon
                        size={20}
                        color="var(--mantine-color-grape-6)"
                      />
                    }
                  >
                    <Text fw={600}>{section.title}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Box p="sm">{contentDisplay}</Box>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>

          <Text size="xs" c="grape" mt="xl" ta="center">
            *A doação de leite é um ato de amor que salva vidas de
            recém-nascidos prematuros. Ajude a salvar vidas.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
