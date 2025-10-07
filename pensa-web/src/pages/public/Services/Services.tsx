import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Button,
  Box,
  Badge,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { servicesService } from "../../../services/services.service";

export function Services() {
  const { data, isLoading } = useQuery("services", () =>
    servicesService.getAll(0, 50)
  );

  return (
    <Box py={60}>
      <Container size="xl">
        <Title order={1} ta="center" mb="md">
          Serviços e Produtos
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Conheça os serviços que oferecemos para cuidar da sua saúde
        </Text>

        {!isLoading && data?.data.content && (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {data.data.content.map((service) => (
              <Card key={service.id} shadow="md" padding="xl" radius="lg">
                <Card.Section>
                  <Image
                    src={service.imageUrl || "/images/service-placeholder.jpg"}
                    height={220}
                    alt={service.name}
                    fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E%3Crect width='400' height='220' fill='%2300A0A0'/%3E%3C/svg%3E"
                  />
                </Card.Section>

                <Badge color="cyan" variant="light" size="lg" mt="md">
                  {service.type?.replace(/_/g, " ")}
                </Badge>

                <Text fw={600} size="xl" mt="md" lineClamp={2}>
                  {service.name}
                </Text>

                <Text size="sm" c="dimmed" mt="sm" lineClamp={4}>
                  {service.description}
                </Text>

                <Button
                  variant="light"
                  color="cyan"
                  fullWidth
                  mt="md"
                  radius="md"
                  rightSection={<IconArrowRight size={16} />}
                  component={Link}
                  to="/contato"
                >
                  Saiba mais
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        )}

        {/* CTA Section */}
        <Card
          shadow="md"
          radius="lg"
          p="xl"
          mt={60}
          bg="gradient-to-r from-cyan-50 to-teal-50"
        >
          <Title order={2} ta="center" mb="md">
            Precisa de ajuda para escolher um serviço?
          </Title>
          <Text ta="center" c="dimmed" mb="lg" size="lg">
            Nossa equipe está pronta para ajudá-lo a encontrar o serviço ideal
            para suas necessidades
          </Text>
          <Box ta="center">
            <Button component={Link} to="/contato" size="lg" color="cyan">
              Entre em contato
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
