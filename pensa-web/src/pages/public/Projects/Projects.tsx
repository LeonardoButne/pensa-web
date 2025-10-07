import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Box,
  Group,
} from "@mantine/core";
import { IconCalendar, IconUser } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { projectsService } from "../../../services/projects.service";

import dayjs from "dayjs";
import "dayjs/locale/pt";

dayjs.locale("pt");

const statusColors: Record<string, string> = {
  PLANNING: "gray",
  IN_PROGRESS: "blue",
  COMPLETED: "green",
  ON_HOLD: "orange",
  CANCELLED: "red",
};

const statusLabels: Record<string, string> = {
  PLANNING: "Planejamento",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  ON_HOLD: "Pausado",
  CANCELLED: "Cancelado",
};

export function Projects() {
  const { data } = useQuery("projects", () => projectsService.getAll(0, 50));
  const { data: featuredData } = useQuery("featuredProjects", () =>
    projectsService.getFeatured()
  );

  const featured = featuredData?.data || [];
  const allProjects = data?.data.content || [];

  return (
    <Box py={60}>
      <Container size="xl">
        <Title order={1} ta="center" mb="md">
          Trabalhos Realizados
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Conheça alguns dos nossos projetos e iniciativas em saúde
        </Text>

        {/* Projetos em Destaque */}
        {featured.length > 0 && (
          <Box mb={60}>
            <Title order={2} mb="xl">
              Projetos em Destaque
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {featured.map((project) => (
                <Card key={project.id} shadow="lg" padding="xl" radius="lg">
                  <Card.Section>
                    <Image
                      src={
                        project.imageUrl || "/images/project-placeholder.jpg"
                      }
                      height={280}
                      alt={project.title}
                      fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='280'%3E%3Crect width='600' height='280' fill='%2300A0A0'/%3E%3C/svg%3E"
                    />
                  </Card.Section>

                  <Group mt="md" mb="xs">
                    <Badge
                      color={statusColors[project.status]}
                      variant="filled"
                    >
                      {statusLabels[project.status]}
                    </Badge>
                    <Badge color="yellow" variant="light">
                      Destaque
                    </Badge>
                  </Group>

                  <Text fw={700} size="xl" mt="md">
                    {project.title}
                  </Text>

                  <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
                    {project.description}
                  </Text>

                  <Group mt="md" gap="xs">
                    {project.clientName && (
                      <Group gap={4}>
                        <IconUser size={16} />
                        <Text size="xs" c="dimmed">
                          {project.clientName}
                        </Text>
                      </Group>
                    )}
                    {project.startDate && (
                      <Group gap={4}>
                        <IconCalendar size={16} />
                        <Text size="xs" c="dimmed">
                          {dayjs(project.startDate).format("MMM YYYY")}
                        </Text>
                      </Group>
                    )}
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Todos os Projetos */}
        <Title order={2} mb="xl">
          Todos os Projetos
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {allProjects.map((project) => (
            <Card key={project.id} shadow="sm" padding="lg" radius="md">
              <Card.Section>
                <Image
                  src={project.imageUrl || "/images/project-placeholder.jpg"}
                  height={200}
                  alt={project.title}
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%2300A0A0'/%3E%3C/svg%3E"
                />
              </Card.Section>

              <Badge
                color={statusColors[project.status]}
                variant="light"
                mt="md"
              >
                {statusLabels[project.status]}
              </Badge>

              <Text fw={600} size="lg" mt="md" lineClamp={2}>
                {project.title}
              </Text>

              <Text size="sm" c="dimmed" mt="sm" lineClamp={3}>
                {project.description}
              </Text>

              <Group mt="md" gap="xs">
                {project.clientName && (
                  <Group gap={4}>
                    <IconUser size={14} />
                    <Text size="xs" c="dimmed">
                      {project.clientName}
                    </Text>
                  </Group>
                )}
                {project.startDate && (
                  <Group gap={4}>
                    <IconCalendar size={14} />
                    <Text size="xs" c="dimmed">
                      {dayjs(project.startDate).format("MMM YYYY")}
                    </Text>
                  </Group>
                )}
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

