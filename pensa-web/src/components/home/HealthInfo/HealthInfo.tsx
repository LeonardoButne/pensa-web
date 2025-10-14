import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Button,
  Group,
  Box,
  rem,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./HealthInfo.module.css";

// Definição dos tipos
interface HealthSection {
  img: string;
  title: string;
  link: string;
}

const sections: HealthSection[] = [
  {
    img: "/images-healthInfo/doencas.png",
    title: "Doenças",
    link: "/doencas",
  },
  {
    img: "/images-healthInfo/urgencias.png",
    title: "Urgências",
    link: "/urgencias",
  },
  {
    img: "/images-healthInfo/mae-e-bebe.png",
    title: "Mãe e Bebé",
    link: "/mae-e-bebe",
  },
];

export function HealthInfo() {
  return (
    <Box py={{ base: rem(30), md: rem(60) }} bg="white">
      {/* Ajuste Principal: 
        1. Reduzir o 'size' do Container de "xl" para "lg" ou "md". 
           Usar "lg" para um efeito de redução de largura significativa.
      */}
      <Container size="lg">
        <Title
          order={2}
          ta="center"
          mb={{ base: rem(30), md: rem(40) }}
          fw={700}
        >
          Informação sobre Saúde
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {sections.map((section) => (
            <Card
              key={section.title}
              withBorder
              radius="lg"
              p={{ base: "lg", md: "md" }}
              shadow="md"
              className={classes.card}
            >
              {/* 1. SEÇÃO DA IMAGEM */}
              <Card.Section>
                <Image
                  src={section.img}
                  alt={section.title}
                  height={120}
                  fit="contain"
                  p="sm"
                />
              </Card.Section>

              {/* 2. SEÇÃO DO TÍTULO */}
              <Card.Section className={classes.section} mt="sm" p="sm">
                <Title ta="center" order={3} fz="lg" fw={700}>
                  {section.title}
                </Title>
              </Card.Section>

              {/* 3. SEÇÃO DO BOTÃO */}
              <Group mt="lg">
                <Button
                  component={Link}
                  to={section.link}
                  rightSection={<IconArrowRight size={16} />}
                  radius="md"
                  style={{ flex: 1 }}
                  color="cyan"
                  size="md"
                >
                  Ver Categoria
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

