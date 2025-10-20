import { useState, useEffect } from "react";
import {
  // ... imports do Mantine
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
// import { diseasesService } from "../../../services/diseases.service"; // Removido ou comentado temporariamente para usar MOCK
import { useDebouncedValue } from "@mantine/hooks";

// ✨ IMPORTAR OS DADOS DO NOVO ARQUIVO
import { MOCK_DISEASES, categories } from "./mockDiseases"; // Ajuste o caminho conforme necessário

export function Diseases() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  // ===============================================
  // ✨ NOVO: useEffect para rolar para o topo
  // ===============================================
  useEffect(() => {
    // Rola a janela para o topo quando o componente é montado
    // ou quando 'page' ou 'category' mudam.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, category]); // Dependências: executa quando page ou category mudam

  // Filtra as doenças pelo Mock antes de passar para a paginação/busca
  const filteredMock = MOCK_DISEASES.filter((disease) => {
    const categoryMatch = !category || disease.category === category;
    const searchMatch =
      !debouncedSearch ||
      disease.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const pageSize = 12;
  const start = (page - 1) * pageSize;
  const content = filteredMock.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredMock.length / pageSize);

  // Aqui substituímos o useQuery por uma simulação estática para que não precise da API
  const data = {
    data: {
      content: content,
      totalPages: totalPages,
    },
  };
  const isLoading = false; // Como os dados são estáticos, definimos isLoading como false

  return (
    <Box py={20}>
      <Container size="xl">
        <Title order={1} ta="center" mb={10}>
          Doenças
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Encontre informações confiáveis sobre diversas doenças
        </Text>

        {/* Filtros */}
        <Group mb={40} grow>
          <TextInput
            placeholder="Pesquisar doenças..."
            leftSection={<IconSearch size={16} />}
            size="lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Resetar a página ao pesquisar
            }}
          />
          <Select
            placeholder="Categoria"
            data={categories}
            size="lg"
            value={category}
            onChange={(value) => {
              setCategory(value || "");
              setPage(1); // Resetar a página ao mudar a categoria
            }}
            clearable
          />
        </Group>

        {/* Loading (Mantido para mostrar a estrutura, mas é sempre false) */}
        {isLoading && (
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        )}

        {/* Lista de doenças */}
        {!isLoading && data?.data.content && (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
              {data.data.content.map((disease) => (
                <Card
                  key={disease.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  component={Link}
                  to={`/doencas/${disease.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card.Section>
                    <Image
                      src={
                        disease.imageUrl || "/images/disease-placeholder.jpg"
                      }
                      height={180}
                      alt={disease.name}
                      fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='180'%3E%3Crect width='400' height='180' fill='%2300A0A0'/%3E%3C/svg%3E"
                    />
                  </Card.Section>

                  <Text fw={600} size="lg" mt="md" lineClamp={2}>
                    {disease.name}
                  </Text>

                  <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
                    {disease.description}
                  </Text>

                  <Button
                    variant="light"
                    color="cyan"
                    fullWidth
                    mt="md"
                    radius="md"
                  >
                    Ver detalhes
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
            <Text c="dimmed" size="lg">
              Nenhuma doença encontrada
            </Text>
          </Center>
        )}
      </Container>
    </Box>
  );
}
