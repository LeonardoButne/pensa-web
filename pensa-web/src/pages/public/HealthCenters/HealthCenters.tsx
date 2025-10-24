// =========================================================
// ARQUIVO: HealthCenters.tsx (AJUSTADO com base no mock `id_of_type`)
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
import { CENTERS } from "./mockHealthCenters"; // Presume-se que o mock está aqui

// ===========================================
// 1. ESTRUTURAS DE DADOS
// ===========================================

// ... (Outras interfaces e Mocks: Province, Type, District, PROVINCES, TYPES, DISTRICTS) ...

interface Province {
  id: number;
  name: string;
}

interface Type {
  id: number;
  name: string;
}

interface District {
  id: number;
  province_id: number;
  name: string;
}

const PROVINCES: Province[] = [
  { id: 1, name: "Maputo Cidade" },
  { id: 2, name: "Maputo Província" },
  { id: 3, name: "Gaza" },
  { id: 4, name: "Inhambane" },
  { id: 5, name: "Manica" },
  { id: 6, name: "Sofala" },
];

const TYPES: Type[] = [
  { id: 1, name: "Unidades sanitárias" },
  { id: 2, name: "Servico SAAJ" },
  { id: 3, name: "Auto-Teste HIV" },
  { id: 4, name: "Postos de Testagem" },
  { id: 5, name: "Farmácias" },
  { id: 6, name: "Postos de Vacinação" },
];

const DISTRICTS: District[] = [
  // ... (Lista completa de distritos) ...
];

const ITEMS_PER_PAGE = 12;

export function HealthCenters() {
  const [search, setSearch] = useState("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  // 🟢 NOVO ESTADO: Para o filtro de Tipo
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  const [debouncedSearch] = useDebouncedValue(search, 300);

  // 1. ESTADO DA PAGINAÇÃO
  const [activePage, setPage] = useState(1);

  // Mapeamento para os Selects
  const provinceOptions = PROVINCES.map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  const typeOptions = TYPES.map((t) => ({
    value: String(t.id),
    label: t.name,
  }));

  // 2. Lógica de Filtragem e Paginação
  const { paginatedCenters, totalPages } = useMemo(() => {
    let list = CENTERS;

    // 2.1. FILTRO DE PROVÍNCIA
    if (selectedProvinceId) {
      list = list.filter((c) => String(c.province_id) === selectedProvinceId);
    }

    // 🟢 AJUSTADO: 2.2. FILTRO DE TIPO - USANDO c.id_of_type
    if (selectedTypeId) {
      list = list.filter((c) => String(c.id_of_type) === selectedTypeId); // 👈 CORREÇÃO PRINCIPAL
    }

    // 2.3. FILTRO DE PESQUISA
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.address.toLowerCase().includes(lowerSearch)
      );
    }

    // 2.4. CÁLCULO DA PAGINAÇÃO
    const totalCount = list.length;
    const calculatedTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    // 2.5. APLICAR PAGINAÇÃO
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedCenters = list.slice(start, end);

    return {
      paginatedCenters,
      totalPages: calculatedTotalPages,
      totalCount,
      filteredListLength: totalCount,
    };
  }, [selectedProvinceId, selectedTypeId, debouncedSearch, activePage]); // 🚨 selectedTypeId adicionado

  // 3. EFEITO PARA RESETAR A PÁGINA QUANDO OS FILTROS MUDAM
  useEffect(() => {
    if (activePage !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, selectedTypeId, debouncedSearch]); // 🚨 selectedTypeId adicionado

  return (
    <Box py={40} bg="gray.0">
      <Container size="xl">
        {/* Botão de voltar (Inalterado) */}
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
          {/* Título e Descrição (Inalterado) */}
          <Center mb="xl">
            <Group>
              <Title order={2} fw={700} size={40} c="dark.7">
                Unidades sanitárias
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Encontre hospitais, unidades sanitárias e postos médicos em
            Moçambique por província, tipo ou nome.
          </Text>

          <Divider mb="xl" />

          {/* Filtros */}
          <Group mb="xl" grow>
            {/* Filtro de Província (Inalterado) */}
            <Select
              placeholder="Filtrar por Província"
              data={provinceOptions}
              size="md"
              value={selectedProvinceId}
              onChange={setSelectedProvinceId}
              clearable
            />
            {/* Filtro de Pesquisa (Inalterado) */}
            <TextInput
              placeholder="Pesquisar por nome ou endereço do centro..."
              leftSection={<IconSearch size={16} />}
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* 🟢 CORRIGIDO: Filtro de Tipo */}
            <Select
              placeholder="Filtrar por tipo"
              data={typeOptions}
              size="md"
              value={selectedTypeId} // 👈 Usa o novo estado
              onChange={setSelectedTypeId} // 👈 Atualiza o novo estado
              clearable
            />
          </Group>

          {/* Resultados */}
          {paginatedCenters.length > 0 ? (
            <>
              {/* Grid de Cards */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb="xl">
                {paginatedCenters.map((center) => {
                  const provinceName =
                    PROVINCES.find((p) => p.id === center.province_id)?.name ||
                    "Desconhecida";
                  // 🟢 AJUSTADO: Pega o nome do tipo diretamente do mock (center.type)
                  const typeName = center.type;

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
                        {/* Exibir o tipo no Badge, usando o campo 'type' do mock */}
                        <Badge color="blue" variant="light" size="md">
                          {typeName}
                        </Badge>
                      </Group>
                      <Badge color="cyan" variant="filled" size="sm" mb="xs">
                        {provinceName}
                      </Badge>
                      {/* ... (Restante do Card Inalterado) ... */}
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
                      {center.telephone && String(center.telephone).trim() && (
                        <Group gap="xs" mb="xs">
                          <IconPhone
                            size={16}
                            color="var(--mantine-color-gray-6)"
                          />
                          <Text size="sm" fw={500}>
                            Telefone: {center.telephone}
                          </Text>
                        </Group>
                      )}
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

              {/* Componente de Paginação (Inalterado) */}
              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={totalPages}
                    size="md"
                    siblings={1}
                    onClick={() =>
                      window.scrollTo({
                        top: 200,
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

