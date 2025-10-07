import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  SimpleGrid,
  Card,
  Avatar,
  Text,
  Button,
  Box,
  Group,
  Badge,
  Pagination,
  Loader,
  Center,
  Stack,
} from "@mantine/core";
import {
  IconSearch,
  IconPhone,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";
import { useQuery } from "react-query";
import { doctorsService } from "../../../services/doctors.service";

import { useDebouncedValue } from "@mantine/hooks";

export function Doctors() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data, isLoading } = useQuery(
    ["doctors", page, debouncedSearch],
    () => {
      if (debouncedSearch) {
        return doctorsService.search(debouncedSearch, page - 1, 12);
      }
      return doctorsService.getAll(page - 1, 12);
    }
  );

  return (
    <Box py={60}>
      <Container size="xl">
        <Title order={1} ta="center" mb="md">
          Encontre um Médico
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Conecte-se com profissionais de saúde qualificados
        </Text>

        {/* Busca */}
        <Container size="md" mb={40}>
          <TextInput
            placeholder="Pesquisar por nome ou especialidade..."
            leftSection={<IconSearch size={16} />}
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Container>

        {/* Loading */}
        {isLoading && (
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        )}

        {/* Lista de médicos */}
        {!isLoading && data?.data.content && (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {data.data.content.map((doctor) => (
                <Card key={doctor.id} shadow="sm" padding="xl" radius="md">
                  <Card.Section p="xl" pb={0}>
                    <Center>
                      <Avatar
                        src={doctor.imageUrl}
                        size={120}
                        radius={120}
                        alt={doctor.name}
                      />
                    </Center>
                  </Card.Section>

                  <Stack gap="sm" mt="md" align="center">
                    <Text fw={600} size="xl" ta="center">
                      {doctor.name}
                    </Text>

                    <Badge color="cyan" variant="light" size="lg">
                      {doctor.specialty}
                    </Badge>

                    {doctor.biography && (
                      <Text size="sm" c="dimmed" ta="center" lineClamp={3}>
                        {doctor.biography}
                      </Text>
                    )}
                  </Stack>

                  <Stack gap="xs" mt="lg">
                    {doctor.phone && (
                      <Group gap="xs">
                        <IconPhone size={16} />
                        <Text size="sm">{doctor.phone}</Text>
                      </Group>
                    )}
                    {doctor.email && (
                      <Group gap="xs">
                        <IconMail size={16} />
                        <Text size="sm">{doctor.email}</Text>
                      </Group>
                    )}
                    {doctor.address && (
                      <Group gap="xs">
                        <IconMapPin size={16} />
                        <Text size="sm" lineClamp={2}>
                          {doctor.address}
                        </Text>
                      </Group>
                    )}
                  </Stack>

                  <Button
                    variant="light"
                    color="cyan"
                    fullWidth
                    mt="md"
                    radius="md"
                    component="a"
                    href={`tel:${doctor.phone}`}
                  >
                    Entrar em contato
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
              Nenhum médico encontrado
            </Text>
          </Center>
        )}
      </Container>
    </Box>
  );
}

