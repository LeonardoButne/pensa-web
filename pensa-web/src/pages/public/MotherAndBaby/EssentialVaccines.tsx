// =========================================================
// ARQUIVO: EssentialVaccines.tsx
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
  Grid,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconVaccine,
  IconShieldLock,
  IconAlertCircle,
  IconPill,
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - VACINAS ESSENCIAIS
// ===========================================

interface VaccineDetail {
  name: string;
  target_diseases: string; // Doenças que previne
  schedule: string; // Quando é administrada (resumo)
  benefit_detail: string; // Detalhes do benefício
  key: string; // Chave para identificação
}

// MOCK dos detalhes das Vacinas
const MOCK_VACCINES: VaccineDetail[] = [
  {
    key: "polio_oral",
    name: "Poliomielite Oral (VAP)",
    target_diseases: "Poliomielite (Paralisia Infantil)",
    schedule: "Ao Nascer (dose 0) e em reforços posteriores.",
    benefit_detail:
      "Oferece proteção contra a poliomielite. Por ser oral, é fácil de administrar e ajuda na imunidade intestinal.",
  },
  {
    key: "polio_inj",
    name: "Poliomielite Injetável (VIP/IPV)",
    target_diseases: "Poliomielite (Paralisia Infantil)",
    schedule: "Doses aos 3, 5, 6 meses (variação do calendário).",
    benefit_detail:
      "Utiliza vírus inativados (mortos), garantindo uma forte resposta imune sistêmica sem risco de doença associada à vacina.",
  },
  {
    key: "hepatite_b",
    name: "Hepatite B",
    target_diseases: "Hepatite B",
    schedule: "Ao Nascer (dentro das primeiras 12 horas de vida).",
    benefit_detail:
      "Protege contra o vírus da Hepatite B, prevenindo infecções crónicas que podem levar à cirrose e cancro do fígado.",
  },
  {
    key: "pentavalente",
    name: "Pentavalente (DTP-Hib-HepB)",
    target_diseases:
      "Difteria, Tétano, Coqueluche, Haemophilus influenzae tipo b, Hepatite B.",
    schedule: "Aos 2, 4 e 6 meses de idade (doses primárias).",
    benefit_detail:
      "Vacina combinada que protege contra cinco doenças graves com uma única injeção, simplificando o calendário.",
  },
  {
    key: "rotavirus",
    name: "Rotavírus (VRH)",
    target_diseases: "Diarreia e gastroenterite grave por Rotavírus.",
    schedule: "Aos 2 e 4 meses (depende do esquema vacinal).",
    benefit_detail:
      "Vacina oral que previne as formas mais graves de diarreia em bebés, a principal causa de desidratação e hospitalização infantil.",
  },
  {
    key: "sarampo",
    name: "Sarampo (VAS/VTV)",
    target_diseases:
      "Sarampo, Caxumba e Rubéola (se for tríplice viral - VTV).",
    schedule: "Aos 9 meses (primeira dose de Sarampo) e reforços posteriores.",
    benefit_detail:
      "Protege contra o Sarampo, uma doença altamente contagiosa que pode causar pneumonia, encefalite e até morte.",
  },
  {
    key: "malaria",
    name: "Vacina contra Malária (RTS,S/AS01)",
    target_diseases: "Malária (Plasmodium falciparum).",
    schedule: "A partir dos 6 meses de idade (em áreas endémicas).",
    benefit_detail:
      "Reduz significativamente a incidência da Malária grave e fatal em crianças pequenas, oferecendo proteção essencial em regiões de alto risco.",
  },
];

// MOCK Service (simplesmente retorna os dados)
const mockService = {
  getVaccineDetails: (): Promise<{ data: VaccineDetail[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_VACCINES });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE EssentialVaccines
// ===========================================

export function EssentialVaccines() {
  const { data, isLoading } = useQuery(
    "essentialVaccines",
    mockService.getVaccineDetails
  );

  const contentList: VaccineDetail[] = data?.data || [];

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
      <Container size="lg">
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
                Vacinas Essenciais
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Conheça as vacinas fundamentais para a saúde do seu bebé e as
            doenças que elas previnem.
          </Text>

          <Divider mb="xl" labelPosition="center" />

          {/* Lista em Grid para os detalhes das vacinas */}
          <Grid gutter="xl">
            {contentList.map((vaccine) => (
              <Grid.Col span={{ base: 12, md: 6 }} key={vaccine.key}>
                <Paper
                  p="lg"
                  radius="md"
                  bg="white"
                  withBorder
                  style={{ height: "100%" }}
                >
                  <Group mb="md" justify="space-between">
                    <Title order={4} fw={700} c="#00918b">
                      {vaccine.name}
                    </Title>
                  </Group>

                  <Text size="sm" mb="xs">
                    <Text span fw={600}>
                      Doenças Alvo:
                    </Text>{" "}
                    {vaccine.target_diseases}
                  </Text>

                  <Text size="sm" mb="xs">
                    <Text span fw={600}>
                      Esquema Resumido:
                    </Text>{" "}
                    {vaccine.schedule}
                  </Text>

                  <Divider my="sm" />

                  <Text size="md" c="dimmed">
                    <Text span fw={600} c="dark.7">
                      Benefício Chave:
                    </Text>{" "}
                    {vaccine.benefit_detail}
                  </Text>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>

          {contentList.length === 0 && (
            <Center py={40}>
              <Text c="dimmed">
                Detalhes de vacinas essenciais não disponíveis.
              </Text>
            </Center>
          )}

          <Text size="xs" c="red" mt="xl" ta="center">
            *O esquema vacinal exato deve ser sempre confirmado com um
            profissional de saúde, pois pode variar de acordo com a região e o
            calendário em vigor.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

