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
  Pagination,
  Loader,
  Center,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import { diseasesService } from "../../../services/diseases.service"; // Removido ou comentado temporariamente para usar MOCK
import { useDebouncedValue } from "@mantine/hooks";

// ===========================================
// ✨ DADOS ESTÁTICOS (MOCK)
// ===========================================
const MOCK_DISEASES = [
  {
    id: 1,
    name: "Aftas",
    description:
      "É uma pequena úlcera não muito profunda que pode ser bem dolorosas e incomodar o paciente na hora de ingerir alimentos, surge em diversos pontos da boca.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images-diseases/aftas.jpg",
  },
  {
    id: 2,
    name: "Alcoolismo",
    description:
      "O alcoolismo é uma condição caracterizada pelo uso compulsivo de bebidas alcoólicas, a pesar das consequências negativas para saúde, vida social, familiar e profissional da pessoa.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images-diseases/Alcoolismo.jpg",
  },
  {
    id: 3,
    name: "AVC",
    description:
      "Acidente Vascular Cerebral (AVC ou Derrame) ocorre quando há entupimento ou rompimento dos vasos que levam sangue ao cérebro provocando a paralisia da área.",
    category: "CARDIOVASCULAR",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 4,
    name: "Cancro da Mama",
    description:
      "O cancro da mama é o aparecimento de 1 caroço na mama. É mais frequente na mulher, mas pode atingir também o homen.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 5,
    name: "Cancro da Próstata",
    description:
      "O cancro da próstata é o crescimento desorganizado, descontrolado e desnecessário da próstata (um órgão que se localiza logo abaixo da bexiga masculina).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 6,
    name: "Cancro do Colo do Útero",
    description:
      "O cancro do colo do útero é um doença silenciosa (não doi) que se desenvolve no colo do útero (a parte mais funda da vagina).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 7,
    name: "Cancro Oral",
    description:
      "É um conjunto de tumores malignos que afectam qualquer localização da cavidade oral, dos lábios à garganta, (incluindo as amígdalas e a faringe).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 8,
    name: "Cárie dentária",
    description:
      "Doença pós-eruptiva, caracterizada por amolecimento da superfície do dente, levando à formação de uma cavidade.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 9,
    name: "Cólera",
    description:
      "Cólera é uma doença infecto-contagiosa do intestino delgado transmitida por meio de alimento ou água contaminados.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 10,
    name: "Condiloma Acuminado",
    description:
      "Os condilomas aparecem como verrugas, que ocorrem de forma única ou múltipla, localizadas principalmente na região genital.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 11,
    name: "Conjuntivite",
    description:
      "É uma doença que se caracteriza pela inflamação da conjuntiva, ou seja, inflamação da membrana de globo ocular.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 12,
    name: "Coronavírus",
    description:
      "O coronavírus é um vírus que causa doenças respiratórias que são na maioria gripes comuns. Em algumas pessoas pode causar doenças mais graves como a pneumonia.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 13,
    name: "Corrimento Vaginal",
    description:
      "Corrimento vaginal é uma secreção natural que sai da vagina. Mudanças na cor, cheiro ou quantidade podem indicar um problema.",
    category: "MATERNAL_HEALTH", // Assumindo uma categoria relacionada
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 14,
    name: "Dependência de Drogas Ilícitas",
    description:
      "É quando a pessoa não consegue parar de usar drogas proibidas, como cocaína ou heroína. Continua a usar por se sentir presa ao vício, mesmo com problemas sérios.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
  },
  {
    id: 15,
    name: "Depressão",
    description:
      "A depressão é uma doença que afeta o modo como a pessoa se sente, pensa e vive o dia a dia. Vai além da tristeza comum.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
  },
];
// ===========================================
// FIM DOS DADOS ESTÁTICOS
// ===========================================

const categories = [
  { value: "", label: "Todas as categorias" },
  { value: "INFECTIOUS_DISEASES", label: "Doenças Infecciosas" },
  { value: "CHRONIC_DISEASES", label: "Doenças Crônicas" },
  { value: "CARDIOVASCULAR", label: "Cardiovascular" },
  { value: "RESPIRATORY", label: "Respiratório" },
  { value: "MATERNAL_HEALTH", label: "Saúde Materna" },
  { value: "CHILD_HEALTH", label: "Saúde Infantil" },
  { value: "MENTAL_HEALTH", label: "Saúde Mental" },
];

// Função de MOCK para simular a chamada da API
const mockDiseasesService = {
  // Simula a busca e a paginação da API
  getAll: (page: number, size: number) => {
    const start = page * size;
    const end = start + size;
    const content = MOCK_DISEASES.slice(start, end);
    const totalPages = Math.ceil(MOCK_DISEASES.length / size);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            content,
            totalPages,
          },
        });
      }, 500); // Simula um pequeno delay da rede
    });
  },

  // Simula a pesquisa e a paginação
  search: (searchTerm: string, page: number, size: number) => {
    const filtered = MOCK_DISEASES.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const start = page * size;
    const end = start + size;
    const content = filtered.slice(start, end);
    const totalPages = Math.ceil(filtered.length / size);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            content,
            totalPages,
          },
        });
      }, 500); // Simula um pequeno delay da rede
    });
  },
};

export function Diseases() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

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

  /* // ********* CÓDIGO ORIGINAL (Comentado para usar o MOCK) ********* const { data, isLoading } = useQuery(
    ["diseases", page, debouncedSearch, category],
    () => {
      // Nota: O seu useQuery original não considerava o filtro de categoria.
      // A implementação MOCK acima resolve isso estaticamente.
      if (debouncedSearch) {
        return diseasesService.search(debouncedSearch, page - 1, 12);
      }
      return diseasesService.getAll(page - 1, 12);
    }
  );
  // ***************************************************************
  */

  // Resetar a página para 1 sempre que a busca ou categoria mudar
  // Usamos um useEffect para monitorar as mudanças no debounce e categoria
  // import { useEffect } from "react";
  /*
  useEffect(() => {
      setPage(1);
  }, [debouncedSearch, category]);
  */

  // NOTA: Para uma implementação estática mais limpa, usaremos o filtro
  // e paginação direta no componente, como feito acima.

  return (
    <Box py={60}>
      <Container size="xl">
        <Title order={1} ta="center" mb="md">
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
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
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

