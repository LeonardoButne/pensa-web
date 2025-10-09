import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Button,
  Group,
  Box,
  Badge,
  rem,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./HealthInfo.module.css"; // Vamos precisar desse arquivo CSS para os separadores

// Definição dos tipos para maior segurança (Type Safety)
interface HealthSection {
  img: string;
  title: string;
  items: string[];
  link: string;
}

const sections: HealthSection[] = [
  {
    img: "/images-healthInfo/doencas.png",
    title: "Doenças",
    items: ["Aids", "Cólera", "Diabetes", "Gripe", "Malária"],
    link: "/doencas",
  },
  {
    img: "/images-healthInfo/urgencias.png",
    title: "Urgências",
    items: [
      "Ataques cardíacos",
      "Hemorragias",
      "Primeiros socorros / Trauma",
      "Urgências respiratórias",
    ],
    link: "/urgencias",
  },
  {
    img: "/images-healthInfo/mae-e-bebe.png",
    title: "Mãe e Bebé",
    items: [
      "Calendário de vacinação",
      "Crescimento/desenvolvimento do bebê",
      "Cuidados pré-natais",
      "Gravidez",
    ],
    link: "/mae-e-bebe",
  },
];

export function HealthInfo() {
  return (
    <Box py={{ base: rem(40), md: rem(20) }} bg="white">
      <Container size="xl">
        <Title
          order={2}
          ta="center"
          mb={{ base: rem(30), md: rem(60) }}
          fw={700}
        >
          Informação sobre Saúde
        </Title>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="sm">
          {sections.map((section) => {
            const features = section.items.map((item) => (
              <Badge variant="light" key={item} color="cyan">
                {item}
              </Badge>
            ));

            return (
              <Card
                key={section.title}
                withBorder
                radius="lg" // Mantendo o raio grande
                p="md"
                shadow="xl"
                className={classes.card} // Estilo CSS para o Card
              >
                {/* 1. SEÇÃO DA IMAGEM */}
                <Card.Section>
                  <Image
                    src={section.img}
                    alt={section.title}
                    height={160}
                    fit="contain"
                    p="md"
                  />
                </Card.Section>

                {/* 2. SEÇÃO DO TÍTULO */}
                <Card.Section className={classes.section} mt="md">
                  <Title ta="center" order={3} fz="xl" fw={700}>
                    {section.title}
                  </Title>
                  {/* <Text fz="sm" mt="xs" c="dimmed">
                    {section.items.length} tópicos disponíveis.
                  </Text> */}
                </Card.Section>

                {/* 3. SEÇÃO DOS BADGES (TÓPICOS) */}
                {/* <Card.Section className={classes.section}>
                  <Text mt="md" className={classes.label} c="dimmed" fz="sm">
                    Tópicos em Destaque
                  </Text>
                  <Group gap={7} mt={5}>
                    {features}
                  </Group>
                </Card.Section> */}

                {/* 4. SEÇÃO DO BOTÃO */}
                <Group mt="xl">
                  <Button
                    component={Link}
                    to={section.link}
                    rightSection={<IconArrowRight size={rem(0)} />}
                    radius="md"
                    style={{ flex: 1 }}
                    color="cyan"
                  >
                    Ver Categoria
                  </Button>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* BOTÃO 'VER TUDO' CENTRALIZADO */}
        {/* <Group justify="center" mt={{ base: rem(30), md: rem(60) }}>
          <Button
            component={Link}
            to="/informacoes-saude"
            size="lg"
            variant="outline"
            color="cyan"
          >
            Ver todas as Informações de Saúde
          </Button>
        </Group> */}
      </Container>
    </Box>
  );
}

