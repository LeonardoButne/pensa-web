// =========================================================
// ARQUIVO: HealthCenters.tsx (NOVO)
// =========================================================
import { useState, useMemo, useEffect } from "react";
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
  TextInput,
  Select,
  SimpleGrid,
  Card,
  Badge,
  Pagination,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconSearch,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { CENTERS } from "./mockHealthCenters";

// ===========================================
// 1. ESTRUTURAS DE DADOS
// ===========================================

interface Province {
  id: number;
  name: string;
}

// interface District {
//   id: number;
//   province_id: number;
//   name: string;
// }

// MOCK: Lista de Províncias (Apenas as principais para o filtro)
const PROVINCES: Province[] = [
  { id: 1, name: "Maputo Cidade" },
  { id: 2, name: "Maputo Província" },
  { id: 3, name: "Gaza" },
  { id: 4, name: "Inhambane" },
  { id: 5, name: "Manica" },
  { id: 6, name: "Sofala" },
  // usamos os IDs presentes nos dados das unidades sanitárias
];

// MOCK: Lista de Distritos (Baseado na primeira tabela que você forneceu - id/province_id/name)
// ===========================================
// MOCK: Lista COMPLETA de Distritos
// ===========================================
// const DISTRICTS: District[] = [
//   // Province ID 1 (Maputo Cidade)
//   { id: 1, province_id: 1, name: "KaMpfumo" },
//   { id: 2, province_id: 1, name: "Nlhamankulu" },
//   { id: 3, province_id: 1, name: "KaMaxaquene" },
//   { id: 4, province_id: 1, name: "KaMavota" },
//   { id: 5, province_id: 1, name: "KaMubukwana" },
//   { id: 6, province_id: 1, name: "KaTembe" },
//   { id: 7, province_id: 1, name: "KaNyaka" },

//   // Province ID 2 (Maputo Província)
//   { id: 1, province_id: 2, name: "Boane" },
//   { id: 2, province_id: 2, name: "Magude" },
//   { id: 3, province_id: 2, name: "Manhiça" },
//   { id: 4, province_id: 2, name: "Marracuene" },
//   { id: 5, province_id: 2, name: "Matola" },
//   { id: 6, province_id: 2, name: "Matutuíne" },
//   { id: 7, province_id: 2, name: "Moamba" },
//   { id: 8, province_id: 2, name: "Namaacha" },

//   // Province ID 3 (Gaza)
//   { id: 1, province_id: 3, name: "Bilene Macia" },
//   { id: 2, province_id: 3, name: "Chibuto" },
//   { id: 3, province_id: 3, name: "Chicualacuala" },
//   { id: 4, province_id: 3, name: "Chigubo" },
//   { id: 5, province_id: 3, name: "Chókwè" },
//   { id: 6, province_id: 3, name: "Chongoene" },
//   { id: 7, province_id: 3, name: "Guijá" },
//   { id: 8, province_id: 3, name: "Limpopo" }, // Usando o Limpopo (8-2)
//   { id: 9, province_id: 3, name: "Mabalane" },
//   { id: 10, province_id: 3, name: "Manjacaze" },

//   // Province ID 4 (Inhambane)
//   { id: 1, province_id: 4, name: "Funhalouro" },
//   { id: 2, province_id: 4, name: "Govuro" },
//   { id: 3, province_id: 4, name: "Homoíne" },
//   { id: 4, province_id: 4, name: "Inhambane" },
//   { id: 5, province_id: 4, name: "Inharrime" },
//   { id: 6, province_id: 4, name: "Inhassoro" },
//   { id: 7, province_id: 4, name: "Jangamo" },
//   { id: 8, province_id: 4, name: "Mabote" },
//   { id: 9, province_id: 4, name: "Massinga" },
//   { id: 10, province_id: 4, name: "Maxixe" },

//   // Province ID 5 (Manica)
//   { id: 1, province_id: 5, name: "Bárue" },
//   { id: 2, province_id: 5, name: "Chimoio" },
//   { id: 3, province_id: 5, name: "Gondola" },
//   { id: 4, province_id: 5, name: "Guro" },
//   { id: 5, province_id: 5, name: "Macate" },
//   { id: 6, province_id: 5, name: "Machaze" },
//   { id: 7, province_id: 5, name: "Macossa" },
//   { id: 8, province_id: 5, name: "Manica" },
//   { id: 9, province_id: 5, name: "Mossurize" },
//   { id: 10, province_id: 5, name: "Sussundenga" },

//   // Province ID 6 (Sofala)
//   { id: 1, province_id: 6, name: "Beira" },
//   { id: 2, province_id: 6, name: "Búzi" },
//   { id: 3, province_id: 6, name: "Caia" },
//   { id: 4, province_id: 6, name: "Chemba" },
//   { id: 5, province_id: 6, name: "Cheringoma" },
//   { id: 6, province_id: 6, name: "Chibabava" },
//   { id: 7, province_id: 6, name: "Dôa" },
//   { id: 8, province_id: 6, name: "Gorongosa" },
//   { id: 9, province_id: 6, name: "Machanga" },
//   { id: 10, province_id: 6, name: "Maringué" },
// ];

// VARIÁVEL DE CONFIGURAÇÃO DA PAGINAÇÃO
const ITEMS_PER_PAGE = 12;

export function HealthCenters() {
  const [search, setSearch] = useState("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [debouncedSearch] = useDebouncedValue(search, 300);

  // 1. ESTADO DA PAGINAÇÃO
  const [activePage, setPage] = useState(1);

  // Mapeamento para os Selects
  const provinceOptions = PROVINCES.map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  // 2. Lógica de Filtragem e Paginação
  // AQUI É ONDE ESTÁ A CORREÇÃO PRINCIPAL: activePage é uma dependência direta.
  const { paginatedCenters, totalPages } = useMemo(() => {
    let list = CENTERS;

    // 2.1. FILTRO DE PROVÍNCIA
    if (selectedProvinceId) {
      list = list.filter((c) => String(c.province_id) === selectedProvinceId);
    }

    // 2.2. FILTRO DE PESQUISA
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.address.toLowerCase().includes(lowerSearch)
      );
    }

    // 2.3. CÁLCULO DA PAGINAÇÃO
    const totalCount = list.length;
    const calculatedTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    // 2.4. APLICAR PAGINAÇÃO
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedCenters = list.slice(start, end);

    return {
      paginatedCenters,
      totalPages: calculatedTotalPages,
      totalCount,
      filteredListLength: totalCount, // Manter o nome para contagem
    };
  }, [selectedProvinceId, debouncedSearch, activePage]); // 🚨 activePage AQUI FAZ O RE-CALCULO

  // 3. EFEITO PARA RESETAR A PÁGINA QUANDO OS FILTROS MUDAM
  // Este useEffect garante que a página volta para 1 se os filtros (província ou pesquisa) mudarem.
  useEffect(() => {
    // Verificamos se a lista filtrada tem itens para evitar resetar se não houver nada
    if (activePage !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, debouncedSearch]); // Não incluir activePage aqui!

  return (
    <Box py={40} bg="gray.0">
      <Container size="xl">
        {/* Botão de voltar */}
        <Button
          component={Link}
          to="/"
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          mb="xl"
          size="sm"
        >
          Voltar para o Menu Principal
        </Button>

        <Paper shadow="lg" radius="lg" p="xl" withBorder>
          {/* Título e Descrição */}
          <Center mb="xl">
            <Group>
              <Title order={2} fw={700} size={40} c="dark.7">
                Unidades sanitárias
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Encontre hospitais, unidades sanitárias e postos médicos em
            Moçambique por província ou nome.
          </Text>

          <Divider mb="xl" />

          {/* Filtros */}
          <Group mb="xl" grow>
            <Select
              placeholder="Filtrar por Província"
              data={provinceOptions}
              size="md"
              value={selectedProvinceId}
              onChange={setSelectedProvinceId}
              clearable
            />
            <TextInput
              placeholder="Pesquisar por nome ou endereço do centro..."
              leftSection={<IconSearch size={16} />}
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Group>

          {/* Resultados */}
          {/* <Text size="lg" fw={500} mb="md">
            {totalCount} Centros encontrados:
          </Text> */}

          {paginatedCenters.length > 0 ? (
            <>
              {/* Grid de Cards */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb="xl">
                {paginatedCenters.map((center) => {
                  const provinceName =
                    PROVINCES.find((p) => p.id === center.province_id)?.name ||
                    "Desconhecida";

                  return (
                    <Card
                      key={center.id}
                      shadow="sm"
                      p="lg"
                      radius="md"
                      withBorder
                    >
                      <Group mb="xs" justify="space-between">
                        <Title order={4} fw={700} lineClamp={2} c="blue.7">
                          {center.name}
                        </Title>
                        <Badge color="cyan" variant="filled" size="md">
                          {provinceName}
                        </Badge>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2} mb="sm">
                        <IconMapPin
                          size={14}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "4px",
                          }}
                        />
                        {center.address || "Endereço não disponível"}
                      </Text>

                      <Divider my="sm" />

                      <Group gap="xs" mb="xs">
                        <IconPhone
                          size={16}
                          color="var(--mantine-color-gray-6)"
                        />
                        <Text size="sm" fw={500}>
                          Telefone: {center.telephone || "N/A"}
                        </Text>
                      </Group>

                      {center.email && (
                        <Group gap="xs">
                          <IconMail
                            size={16}
                            color="var(--mantine-color-gray-6)"
                          />
                          <Text size="sm" fw={500} lineClamp={1}>
                            Email: {center.email}
                          </Text>
                        </Group>
                      )}
                    </Card>
                  );
                })}
              </SimpleGrid>

              {/* Componente de Paginação */}
              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    value={activePage}
                    onChange={setPage} // 👈 A alteração da página atualiza o estado
                    total={totalPages}
                    size="md"
                    siblings={1}
                    // Role para o topo da Container para que o utilizador veja a nova lista
                    onClick={() =>
                      window.scrollTo({
                        top: 200, // Ajuste este valor conforme necessário para subir até aos cards
                        behavior: "smooth",
                      })
                    }
                  />
                </Center>
              )}
            </>
          ) : (
            <Center py={60}>
              <Text c="dimmed" size="lg">
                Nenhum centro de saúde encontrado para os filtros selecionados.
              </Text>
            </Center>
          )}

          <Text size="xs" c="red" mt="xl" ta="center">
            *Os dados e contactos podem sofrer alterações. Confirme sempre a
            informação por telefone antes de se deslocar.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

