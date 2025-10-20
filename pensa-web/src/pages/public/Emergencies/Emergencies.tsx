import { useState, useEffect } from "react";
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
  Pagination,
  Loader,
  Center,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";

// ===========================================
// ✨ DADOS ESTÁTICOS (MOCK) - MANTIDOS AQUI
// ===========================================
const MOCK_EMERGENCIES = [
  {
    id: 1,
    name: "Queimaduras",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/queimaduras.jpg",
  },
  {
    id: 2,
    name: "Hemorragia / Sangramento",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/sangramento.jpg",
  },
  {
    id: 3,
    name: "Fratura / Osso Quebrado",
    category: "TRAUMA",
    imageUrl: "/images-urgencias/osso-quebrado.jpg",
  },
  {
    id: 4,
    name: "Chuvas fortes",
    category: "AMBIENTAL",
    imageUrl: "/images-urgencias/chuvas.jpg", // Imagem de exemplo
  },
];

const categories = [
  { value: "", label: "Todas as categorias" },
  { value: "TRAUMA", label: "Traumatismos e Lesões" },
  { value: "CLÍNICa", label: "Emergências Clínicas" },
  { value: "AMBIENTAL", label: "Acidentes Ambientais" },
  { value: "PEDIÁTRICA", label: "Emergências Pediátricas" },
];

export function Emergencies() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // ===============================================
  // ✨ NOVO: useEffect para rolar para o topo
  // ===============================================
  useEffect(() => {
    // Rola a janela para o topo com animação suave
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category, debouncedSearch]);
  // Rola quando a página, categoria ou o termo de busca (debounced) muda.

  // Filtra as urgências pelo Mock antes de passar para a paginação/busca
  const filteredMock = MOCK_EMERGENCIES.filter((emergency) => {
    const categoryMatch = !category || emergency.category === category;
    const searchMatch =
      !debouncedSearch ||
      emergency.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const pageSize = 12;
  const start = (page - 1) * pageSize;
  const content = filteredMock.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredMock.length / pageSize);

  // Aqui substituímos o useQuery por uma simulação estática
  const data = {
    data: {
      content: content,
      totalPages: totalPages,
    },
  };
  const isLoading = false;

  return (
    <Box py={20}>
      <Container size="xl">
        <Title order={1} ta="center" mb={10}>
          Emergências e Primeiros Socorros
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Guia rápido para agir em situações de urgência
        </Text>

        {/* Filtros */}
        <Group mb={40} grow>
          <TextInput
            placeholder="Pesquisar emergências..."
            leftSection={<IconSearch size={16} />}
            size="lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select
            placeholder="Tipo de Urgência"
            data={categories}
            size="lg"
            value={category}
            onChange={(value) => {
              setCategory(value || "");
              setPage(1);
            }}
            clearable
          />
        </Group>

        {/* Loading */}
        {isLoading && (
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        )}

        {/* Lista de emergências */}
        {!isLoading && data?.data.content && (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
              {data.data.content.map((emergency) => (
                <Card
                  key={emergency.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  component={Link}
                  to={`/urgencias/${emergency.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Section>
                    <Image
                      src={
                        emergency.imageUrl ||
                        "/images/emergency-placeholder.jpg"
                      }
                      height={180}
                      alt={emergency.name}
                      fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='180'%3E%3Crect width='400' height='180' fill='%2300A0A0'/%3E%3C/svg%3E"
                    />
                  </Card.Section>

                  {/* Título mais proeminente e centralizado */}
                  <Text fw={700} size="ml" mt="md" lineClamp={2} ta="center">
                    {emergency.name}
                  </Text>

                  <Button
                    variant="light"
                    color="cyan"
                    fullWidth
                    mt="md" // Mantemos uma margem acima para o botão
                    radius="md"
                    size="sm"
                  >
                    Guia de Ação Rápida
                  </Button>
                </Card>
              ))}
            </SimpleGrid>

            {/* Paginação */}
            {data.data.totalPages > 1 && (
              <Center mt={40}>
                <Pagination
                  total={data.data.totalPages}
                  value={page}
                  onChange={setPage}
                  color="cyan"
                />
              </Center>
            )}
          </>
        )}

        {/* Sem resultados */}
        {!isLoading && data?.data.content.length === 0 && (
          <Center py={60}>
            <Text c="dimmed" size="ml">
              Nenhuma urgência ou guia de primeiros socorros encontrado.
            </Text>
          </Center>
        )}
      </Container>
    </Box>
  );
}

