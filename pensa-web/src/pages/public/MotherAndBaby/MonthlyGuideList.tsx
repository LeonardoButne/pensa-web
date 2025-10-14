import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Button,
  Box,
  Group,
  Pagination,
  Center,
  Badge,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

// ===========================================
// ✨ DADOS ESTÁTICOS (MOCK) - LISTA DOS 12 MESES
// ===========================================
const MOCK_MONTHS = [
  {
    id: 1,
    name: "1º Mês",
    category: "PRIMEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-1.jpg",
  },
  {
    id: 2,
    name: "2º Mês",
    category: "PRIMEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-2.jpg",
  },
  {
    id: 3,
    name: "3º Mês",
    category: "PRIMEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-3.jpg",
  },
  {
    id: 4,
    name: "4º Mês",
    category: "SEGUNDO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-4.jpg",
  },
  {
    id: 5,
    name: "5º Mês",
    category: "SEGUNDO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-5.jpg",
  },
  {
    id: 6,
    name: "6º Mês",
    category: "SEGUNDO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-6.jpg",
  },
  {
    id: 7,
    name: "7º Mês",
    category: "TERCEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-7.jpg",
  },
  {
    id: 8,
    name: "8º Mês",
    category: "TERCEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-8.jpg",
  },
  {
    id: 9,
    name: "9º Mês",
    category: "TERCEIRO_TRIMESTRE",
    imageUrl: "/images-mom-and-baby/mes-9.jpg",
  },
  {
    id: 10,
    name: "10º Mês",
    category: "CUIDADOS_BEBE",
    imageUrl: "/images-mom-and-baby/mes-10.jpg",
  },
  {
    id: 11,
    name: "11º Mês",
    category: "CUIDADOS_BEBE",
    imageUrl: "/images-mom-and-baby/mes-11.jpg",
  },
  {
    id: 12,
    name: "12º Mês",
    category: "CUIDADOS_BEBE",
    imageUrl: "/images-mom-and-baby/mes-12.jpg",
  },
];

const TOPIC_MAPPING: {
  [key: number]: {
    title: string;
    filterFn: (month: (typeof MOCK_MONTHS)[0]) => boolean;
  };
} = {
  1: {
    // Fases da Gravidez (1 a 9 meses)
    title: "Fases da Gravidez - Guia Mês a Mês",
    filterFn: (month) => month.id <= 9,
  },
  2: {
    // Desenvolvimento do Bebê (1 a 12 meses)
    title: "Desenvolvimento do Bebê - Guia Mês a Mês",
    filterFn: (month) => month.id <= 12,
  },
  3: {
    // Calendário de Vacinação (1 a 12 meses, mas pode ter meses específicos)
    title: "Calendário de Vacinação - Mês a Mês",
    filterFn: (month) => month.id <= 12,
  },
  // Para outros tópicos (4, 5), pode-se criar um componente de detalhe único,
  // mas aqui mostramos a lista de meses como exemplo.
  4: {
    title: "Vacinas Essenciais - Por Idade",
    filterFn: (month) => month.id <= 12,
  },
  5: {
    title: "Amamentação e Banco de Leite - Dicas",
    filterFn: (month) => month.id <= 12,
  },
};

// ===========================================
// 3. COMPONENTE MonthlyGuideList
// ===========================================

export function MonthlyGuideList() {
  const { topicId } = useParams<{ topicId: string }>();
  const [page, setPage] = useState(1);
  const pageSize = 6; // Itens por página

  const numericTopicId = Number(topicId);
  const currentTopic = TOPIC_MAPPING[numericTopicId];

  if (!currentTopic) {
    return (
      <Center py={100}>
        <Text c="red">Tópico principal não encontrado.</Text>
      </Center>
    );
  }

  // Aplica o filtro com base no tópico (ex: só meses 1-9 para gravidez)
  const filteredMonths = MOCK_MONTHS.filter(currentTopic.filterFn);

  const start = (page - 1) * pageSize;
  const content = filteredMonths.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredMonths.length / pageSize);

  return (
    <Box py={40}>
      <Container size="xl">
        {/* Botão de voltar para a lista principal */}
        <Button
          component={Link}
          to="/mae-bebe"
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          mb="xl"
          size="sm"
        >
          Voltar para Tópicos Principais
        </Button>

        <Title order={1} ta="center" mb={10}>
          {currentTopic.title}
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Selecione o mês para ver os detalhes completos.
        </Text>

        {/* Lista de Meses */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {content.map((month) => (
            <Card
              key={month.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              // AQUI: Link para a página de detalhe final (MonthDetail)
              // Usamos o ID do mês (month.id)
              component={Link}
              // to={`/mae-bebe/mes/${month.id}`}
              to={`/mae-bebe/${topicId}/mes/${month.id}`} // ROTA CORRIGIDA
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Card.Section>
                <Image
                  src={month.imageUrl || "/images/placeholder-mae-bebe.jpg"}
                  height={150}
                  alt={month.name}
                  fit="cover"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Title order={3} size="h4" lineClamp={1}>
                  {month.name}
                </Title>
                <Badge color="blue" variant="light">
                  {month.category.replace(/_/g, " ")}
                </Badge>
              </Group>

              <Button
                variant="light"
                color="teal"
                fullWidth
                mt="md"
                radius="md"
                size="sm"
              >
                Ver Detalhes Mês
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        {/* Paginação */}
        {totalPages > 1 && (
          <Center mt={40}>
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              color="teal"
            />
          </Center>
        )}
      </Container>
    </Box>
  );
}

