// =========================================================
// ARQUIVO: HealthCenters.tsx (COMPLETO, incluindo o conteúdo do Card)
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
import { DISTRICTS } from "./mockDistricts";

// ... (Interfaces e Mocks PROVINCES, TYPES, DISTRICTS) ...
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
  { id: 6, name: "Servico SAAJ" },
  { id: 7, name: "Auto-Teste HIV" },
  { id: 3, name: "Postos de Testagem" },
  { id: 5, name: "Farmácias" },
  { id: 2, name: "Postos de Vacinação" },
];

// Supondo que DISTRICTS foi movido para mockDistricts.ts
// const DISTRICTS: District[] = [...];

const ITEMS_PER_PAGE = 12;

export function HealthCenters() {
  const [search, setSearch] = useState("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null
  );

  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [activePage, setPage] = useState(1);

  // Mapeamento de Opções
  const provinceOptions = PROVINCES.map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  const typeOptions = TYPES.map((t) => ({
    value: String(t.id),
    label: t.name,
  }));

  const districtOptions = useMemo(() => {
    if (!selectedProvinceId) {
      return [];
    }
    const provinceIdNum = parseInt(selectedProvinceId);
    return DISTRICTS.filter((d) => d.province_id === provinceIdNum).map(
      (d) => ({
        // AQUI: Usamos uma chave composta "province_id-district_id" como o valor
        value: `${d.province_id}-${d.id}`,
        label: d.name,
      })
    );
  }, [selectedProvinceId]); // Re-calcula quando a província muda

  useEffect(() => {
    setSelectedDistrictId(null);
  }, [selectedProvinceId]);

  // 2. Lógica de Filtragem e Paginação
  const { paginatedCenters, totalPages } = useMemo(() => {
    let list = CENTERS;

    if (selectedProvinceId) {
      list = list.filter((c) => String(c.province_id) === selectedProvinceId);
    }

    if (selectedProvinceId && selectedDistrictId) {
      // CORREÇÃO CRÍTICA: Desestrutura a chave composta "provinceId-districtId"
      const [filterProvinceId, filterDistrictId] =
        selectedDistrictId.split("-");

      // Garante que o centro corresponda tanto à Província quanto ao Distrito
      list = list.filter(
        (c) =>
          String(c.province_id) === filterProvinceId &&
          String(c.district_id) === filterDistrictId
      );
    }

    if (selectedTypeId) {
      list = list.filter((c) => String(c.id_of_type) === selectedTypeId);
    }

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.address.toLowerCase().includes(lowerSearch)
      );
    }

    const totalCount = list.length;
    const calculatedTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedCenters = list.slice(start, end);

    return {
      paginatedCenters,
      totalPages: calculatedTotalPages,
      totalCount,
      filteredListLength: totalCount,
    };
  }, [
    selectedProvinceId,
    selectedDistrictId,
    selectedTypeId,
    debouncedSearch,
    activePage,
  ]);

  useEffect(() => {
    if (activePage !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, selectedDistrictId, selectedTypeId, debouncedSearch]);

  return (
    <Box py={40} bg="gray.0">
      <Container size="xl">
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

          {/* Filtros: SimpleGrid para Responsividade */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="xl">
            {/* Filtro de Província */}
            <Select
              placeholder="Filtrar por Província"
              data={provinceOptions}
              size="md"
              value={selectedProvinceId}
              onChange={setSelectedProvinceId}
              clearable
            />

            {/* Filtro de Distrito */}
            <Select
              placeholder="Filtrar por Distrito"
              data={districtOptions}
              size="md"
              value={selectedDistrictId}
              onChange={setSelectedDistrictId}
              clearable
              disabled={!selectedProvinceId || districtOptions.length === 0}
              nothingFoundMessage={
                selectedProvinceId
                  ? "Nenhum distrito encontrado"
                  : "Selecione uma província primeiro"
              }
            />

            {/* Filtro de Tipo */}
            <Select
              placeholder="Filtrar por tipo"
              data={typeOptions}
              size="md"
              value={selectedTypeId}
              onChange={setSelectedTypeId}
              clearable
            />

            {/* Filtro de Pesquisa */}
            <TextInput
              placeholder="Pesquisar por nome ou endereço..."
              leftSection={<IconSearch size={16} />}
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SimpleGrid>

          {/* Resultados */}
          {paginatedCenters.length > 0 ? (
            <>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb="xl">
                {paginatedCenters.map((center) => {
                  const provinceName =
                    PROVINCES.find((p) => p.id === center.province_id)?.name ||
                    "Desconhecida";
                  const typeName = center.type;

                  // 💡 INÍCIO DO CONTEÚDO DO CARD OMITIDO 💡
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
                        <Badge color="blue" variant="light" size="md">
                          {typeName}
                        </Badge>
                      </Group>

                      {/* Badge da Província */}
                      <Badge color="cyan" variant="filled" size="sm" mb="xs">
                        {provinceName}
                      </Badge>

                      {/* Endereço */}
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

                      {/* 🟢 TELEFONE CONDICIONAL */}
                      {center.telephone &&
                        String(center.telephone).trim() !== "" && (
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

                      {/* 🟢 EMAIL CONDICIONAL (Usando verificação robusta) */}
                      {center.email && center.email.trim() !== "" && (
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
              {/* 💡 FIM DO CONTEÚDO DO CARD OMITIDO 💡 */}

              {/* Componente de Paginação */}
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

