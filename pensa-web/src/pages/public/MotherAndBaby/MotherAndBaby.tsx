import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  SimpleGrid,
  Card,
  Image,
  Text,
  Button,
  Box,
  Group,
  Select,
  Center,
  Badge,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";

// ===========================================
// ✨ DADOS ESTÁTICOS (MOCK) - LISTA DE TÓPICOS PRINCIPAIS
// ===========================================
const MOCK_TOPICS = [
  {
    id: 1,
    name: "Fases da Gravidez (Pré-natal)",
    category: "GRAVIDEZ",
    imageUrl: "/images-mom-and-baby/fases-gravidez.jpg",
    description: "Informações mês a mês, do 1º ao 9º mês de gestação.",
    // Rota para a lista de meses: /mae-bebe/1/meses
  },
  {
    id: 2,
    name: "Desenvolvimento do Bebê",
    category: "BEBÊ",
    imageUrl: "/images-mom-and-baby/dev-babe.jpg",
    description:
      "Marcos do crescimento e habilidades do bebê, do 1º ao 12º mês.",
    // Rota para a lista de meses: /mae-bebe/2/meses
  },
  {
    id: 3,
    name: "Calendário de Vacinação",
    category: "CUIDADOS_GERAIS",
    imageUrl: "/images-mom-and-baby/calendario.jpeg",
    description: "Esquema vacinal recomendado do nascimento ao 1 ano de vida.",
    // Rota para a lista de meses: /mae-bebe/3/meses
  },
  {
    id: 4,
    name: "Vacinas Essenciais",
    category: "CUIDADOS_GERAIS",
    imageUrl: "/images-mom-and-baby/vacinacao.jpg",
    description: "Detalhes sobre as principais vacinas e suas proteções.",
    // Rota para a lista de meses: /mae-bebe/4/meses
  },
  {
    id: 5,
    name: "Amamentação e Banco de Leite",
    category: "AMAMENTAÇÃO",
    imageUrl: "/images-mom-and-baby/leite.jpg",
    description: "Técnicas, benefícios e como armazenar o leite materno.",
    // Rota para a lista de meses: /mae-bebe/5/meses
  },
];

const categories = [
  { value: "", label: "Todas as áreas" },
  { value: "GRAVIDEZ", label: "Gravidez e Pré-Natal" },
  { value: "BEBÊ", label: "Desenvolvimento do Bebê" },
  { value: "AMAMENTAÇÃO", label: "Amamentação e Nutrição" },
  { value: "CUIDADOS_GERAIS", label: "Cuidados e Vacinação" },
];

export function MotherAndBaby() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // Lógica de filtragem no lado do cliente
  const filteredTopics = MOCK_TOPICS.filter((topic) => {
    const categoryMatch = !category || topic.category === category;
    const searchMatch =
      !debouncedSearch ||
      topic.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      topic.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Neste nível, não há paginação real, apenas a exibição dos tópicos.
  const content = filteredTopics;
  const isLoading = false; // Mock

  return (
    <Box py={40}>
      <Container size="xl">
        <Title order={2} ta="center" mb={10}>
          Guia de Saúde Materno-Infantil
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Selecione o tópico que deseja explorar para ver o conteúdo mês a mês.
        </Text>
        {/* Filtros */}
        <Group mb={40} grow>
          <TextInput
            placeholder="Pesquisar guias e tópicos..."
            leftSection={<IconSearch size={16} />}
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Área de Foco"
            data={categories}
            size="lg"
            value={category}
            onChange={(value) => setCategory(value || "")}
            clearable
          />
        </Group>
        {/* Lista de tópicos */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
          {content.map((item) => {
            let destinationRoute;

            // Se for FASES DA GRAVIDEZ (ID 1), vai para a nova rota simples.
            if (item.id === 1) {
              destinationRoute = `/mae-bebe/fases-gravidez`; // ROTA SIMPLES!
            }
            // Se for Desenvolvimento do Bebê (ID 2), pode ir para a visualização completa
            else if (item.id === 2) {
              destinationRoute = `/mae-bebe/desenvolvimento-bebe`; // ROTA SIMPLES!
            } else if (item.id === 3) {
              destinationRoute = `/mae-bebe/calendario-vacinacao`; // ROTA SIMPLES!
            } else if (item.id === 4) {
              destinationRoute = `/mae-bebe/vacinas-essenciais`; // ROTA SIMPLES!
            } else if (item.id === 5) {
              destinationRoute = `/mae-bebe/amamentacao-banco-leite`; // ROTA SIMPLES!
            } else {
              // Usamos a rota TopicMonthDetail para conteúdo único
              destinationRoute = `/mae-bebe/${item.id}/mes/1`;
            }

            return (
              <Card
                key={item.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                component={Link}
                to={destinationRoute} // ROTA DINÂMICA (que você já definiu)
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Card.Section>
                  <Image
                    src={item.imageUrl || "/images/placeholder-mae-bebe.jpg"}
                    height={180}
                    alt={item.name}
                    fit="cover"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={700} size="lg" lineClamp={2}>
                    {item.name}
                  </Text>
                  <Badge color="teal" variant="light">
                    {categories.find((c) => c.value === item.category)?.label ||
                      item.category}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" lineClamp={2}>
                  {item.description}
                </Text>

                <Button
                  variant="light"
                  color="teal"
                  fullWidth
                  mt="md"
                  radius="md"
                  size="sm"
                >
                  Explorar Guia
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
        {/* Sem resultados */}
        {content.length === 0 && (
          <Center py={60}>
            <Text c="dimmed" size="ml">
              Nenhum tópico encontrado com esses critérios.
            </Text>
          </Center>
        )}
      </Container>
    </Box>
  );
}

