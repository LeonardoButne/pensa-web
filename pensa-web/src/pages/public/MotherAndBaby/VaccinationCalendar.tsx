// =========================================================
// ARQUIVO: VaccinationCalendar.tsx
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
  List,
} from "@mantine/core";
import { IconArrowLeft, IconCalendarEvent } from "@tabler/icons-react";
import { useQuery } from "react-query";

// ===========================================
// 1. DADOS (MOCK) - CALENDÁRIO DE VACINAÇÃO
// ===========================================

interface VaccineSchedule {
  age_group: string; // Ex: "Ao Nascer", "2 Meses", "9 Meses"
  vacinas: string[]; // Lista de vacinas para aquela idade
  notes: string; // Observações ou recomendações
}

// MOCK do Calendário Nacional de Vacinação (Simplificado)
const MOCK_CALENDAR: VaccineSchedule[] = [
  {
    age_group: "Ao Nascer",
    vacinas: ["BCG (tuberculose)", "Hepatite B (1ª Dose)"],
    notes:
      "A BCG e a Hepatite B devem ser administradas o mais rápido possível após o nascimento, preferencialmente nas primeiras 12 horas.",
  },
  {
    age_group: "1 Mês de Vida",
    vacinas: ["Poliomielite 0 (VAP)"],
    notes:
      "A VAP (Vacina Antiparalisia Oral) deve ser dada apenas uma vez no primeiro mês de vida.",
  },
  {
    age_group: "2 Meses",
    vacinas: [
      "Pentavalente (DPT+HepB+Hib)",
      "Pneumocócica (PCV)",
      "Rotavírus (RV)",
    ],
    notes:
      "Essas são as primeiras doses. É crucial seguir o intervalo de 4 a 8 semanas para a próxima dose.",
  },
  {
    age_group: "3 Meses",
    vacinas: [
      "Poliomielite Injetável (IPV - 1ª Dose)",
      "Pentavalente (DPT+HepB+Hib - 2ª Dose)",
    ],
    notes:
      "A introdução da IPV é importante. O esquema deve ser seguido rigorosamente.",
  },
  {
    age_group: "4 Meses",
    vacinas: [
      "Pentavalente (DPT+HepB+Hib)",
      "Pneumocócica (PCV)",
      "Rotavírus (RV)",
    ],
    notes: "Segundas doses para reforçar a imunidade.",
  },
  {
    age_group: "6 Meses",
    vacinas: [
      "Poliomielite Injetável (IPV - 2ª Dose)",
      "Pentavalente (DPT+HepB+Hib)",
      "Malária (RTS,S - 1ª Dose)",
    ],
    notes:
      "Fase crítica com a 3ª dose da Pentavalente. É o início da vacina contra a Malária (se aplicável na região).",
  },
  {
    age_group: "9 Meses",
    vacinas: ["Sarampo (VAS - 1ª Dose)", "Malária (RTS,S - 2ª Dose)"],
    notes: "Vacina importante para proteção contra Sarampo.",
  },
  {
    age_group: "1 Ano (12 Meses)",
    vacinas: ["Pneumocócica (Reforço)", "Pólio Oral (VAP - Reforço)"],
    notes: "Início dos reforços anuais.",
  },
  {
    age_group: "1 Ano e 6 Meses (18 Meses)",
    vacinas: [
      "DPT (Difteria, Coqueluche, Tétano - Reforço)",
      "Malária (RTS,S - 3ª Dose)",
    ],
    notes:
      "A vacina Malária deve ser administrada a esta idade, sendo a 3ª dose do ciclo.",
  },
];

// MOCK Service (simplesmente retorna os dados)
const mockService = {
  getCalendar: (): Promise<{ data: VaccineSchedule[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_CALENDAR });
      }, 500);
    });
  },
};

// ===========================================
// 2. COMPONENTE VaccinationCalendar
// ===========================================

export function VaccinationCalendar() {
  const { data, isLoading } = useQuery(
    "vaccinationCalendar",
    mockService.getCalendar
  );

  const contentList: VaccineSchedule[] = data?.data || [];

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
                Calendário de Vacinação
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Confira o esquema vacinal essencial recomendado para crianças até
            aos 18 meses de idade.
          </Text>

          <Divider
            mb="xl"
            label={<IconCalendarEvent size={20} />}
            labelPosition="center"
          />

          {/* Lista Simples do Calendário */}
          {contentList.map((schedule, index) => (
            <Box key={index} mb="xl">
              <Group justify="space-between" align="center" mb="sm">
                <Title
                  order={3}
                  fw={700}
                  c="dark.7"
                  style={{ textTransform: "uppercase" }}
                >
                  {schedule.age_group}
                </Title>
              </Group>

              <Paper
                p="lg"
                radius="md"
                bg="white"
                style={{ borderLeft: `4px solid #00918b` }}
              >
                <Text fw={600} mb="xs">
                  Vacinas a serem administradas:
                </Text>
                <List size="sm" spacing="xs" withPadding>
                  {schedule.vacinas.map((v, i) => (
                    <List.Item key={i}>{v}</List.Item>
                  ))}
                </List>

                <Divider my="md" />

                <Text size="sm" c="dimmed" style={{ whiteSpace: "pre-line" }}>
                  Observações: {schedule.notes}
                </Text>
              </Paper>

              {/* Adiciona um espaçamento extra e linha de separação, exceto no último */}
              {index < contentList.length - 1 && <Divider mt="xl" />}
            </Box>
          ))}

          {contentList.length === 0 && (
            <Center py={40}>
              <Text c="dimmed">
                Conteúdo do Calendário de Vacinação não disponível.
              </Text>
            </Center>
          )}

          <Text size="xs" c="red" mt="xl" ta="center">
            *Esta informação é um guia e deve ser sempre confirmada no Centro de
            Saúde Local, seguindo as diretrizes oficiais do Ministério da Saúde.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

