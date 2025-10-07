import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Box,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import classes from "./NewsSection.module.css";

const news = [
  {
    id: 1,
    title: "A SAÚDE MENTAL É IMPORTANTE PARA TODOS NÓS",
    image: "/images-news/saude_mental.jpg",
    date: "15 de Setembro, 2024",
    badge: "*660#",
  },
  {
    id: 2,
    title: "FUMAR NAO ALIVIA O STRESS: APENAS ADOECE O CORPO E A MENTE",
    image: "/images-news/fumar-pensa.jpg",
    date: "12 de Setembro, 2024",
    badge: "*660#",
  },
  {
    id: 3,
    title: "PRIMEIROS SOCORROS NA PENSA",
    image: "/images-news/PRIMEIROS-SOCORROS.jpg",
    date: "10 de Setembro, 2024",
    badge: "*660#",
  },
  {
    id: 4,
    title: "CUIDADOS PRÉ-NATAIS: O QUE TODA GESTANTE PRECISA SABER",
    image: "/images-news/gravidez.png",
    date: "08 de Setembro, 2024",
    badge: "*660#",
  },
  {
    id: 5,
    title: "DIA DA CONSCIENCIALIZACAO DE MODOS DE VIDA SAUDAVEIS",
    image: "/images-news/vida-saudavel.jpg",
    date: "05 de Setembro, 2024",
    badge: "*660#",
  },
  {
    id: 6,
    title: "SAUDE NA PALMA DA SUA MAO",
    image: "/images-news/saude -na-palma.jpg",
    date: "02 de Setembro, 2024",
    badge: "*660#",
  },
];

export function NewsSection() {
  return (
    <Box py={80} bg="gray.0">
      <Container size="lg">
        <Title order={2} ta="center" mb={60} fw={700}>
          Notícias
        </Title>
        <Text ta="center" c="dimmed" mb={40}>
          Mais recentes
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {news.map((item) => (
            <Card
              key={item.id}
              shadow="sm"
              padding="sm"
              radius="md"
              className={classes.card}
            >
              <Card.Section>
                <Image
                  src={item.image}
                  // height={350}
                  fit="contain"
                  alt={item.title}
                  fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%2300C7B7'/%3E%3C/svg%3E"
                />
              </Card.Section>

              <Badge color="cyan" variant="filled" mt="md" size="sm">
                {item.badge}
              </Badge>

              <Text
                fw={600}
                size="md"
                mt="md"
                lineClamp={2}
                className={classes.title}
              >
                {item.title}
              </Text>

              <Text size="xs" c="dimmed" mt="sm" className={classes.date}>
                <IconCalendar
                  size={14}
                  style={{ marginRight: 4, verticalAlign: "middle" }}
                />
                {item.date}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

