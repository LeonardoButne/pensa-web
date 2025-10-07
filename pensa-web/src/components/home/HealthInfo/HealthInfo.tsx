import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./HealthInfo.module.css";
import { IconArrowRight } from "@tabler/icons-react";

const sections = [
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
    <Box py={80} bg="white">
      <Container size="xl">
        <Title order={2} ta="center" mb={60} fw={700}>
          Informação sobre saúde
        </Title>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          {sections.map((section) => (
            <Card
              key={section.title}
              shadow="xl"
              padding="xl"
              radius="lg"
              className={classes.card}
            >
              <Group mb="md">
                {/* Substitui o ícone pelo img */}
                <Box
                  style={{
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  <Group mb="md" display="flex" justify="center">
                    <Box
                      component="img"
                      src={`${section.img}`} // se estiver usando imagens do public
                      alt={section.title}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                  </Group>
                </Box>
              </Group>

              <Title order={3} mb="lg" fw={700}>
                {section.title}
              </Title>

              <Box component="ul" className={classes.list}>
                {section.items.map((item) => (
                  <Text key={item} component="li" size="sm" c="dimmed" mb="xs">
                    {item}
                  </Text>
                ))}
              </Box>

              <Button
                component={Link}
                to={section.link}
                variant="subtle"
                rightSection={<IconArrowRight size={16} />}
                mt="md"
                fullWidth
              >
                Ver mais
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        <Group justify="center" mt={40}>
          <Button
            component={Link}
            to="/informacoes-saude"
            size="lg"
            variant="outline"
            color="cyan"
          >
            Ver tudo
          </Button>
        </Group>
      </Container>
    </Box>
  );
}

