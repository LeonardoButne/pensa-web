import { IconArrowRight } from "@tabler/icons-react";
import { Box, Button, Card, Group, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./BadgeCard.module.css";

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

export function BadgeCard() {
  return (
    <Group wrap="wrap">
      {sections.map((section) => (
        <Card
          key={section.title}
          shadow="sm"
          padding="xl"
          radius="lg"
          className={classes.card}
          style={{ width: 300 }}
        >
          {/* Imagem centralizada */}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <img
              src={section.img}
              alt={section.title}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
          </Box>

          {/* Título */}
          <Title order={3} mb="md" fw={700}>
            {section.title}
          </Title>

          {/* Lista de itens */}
          <Box component="ul" className={classes.list}>
            {section.items.map((item) => (
              <Text key={item} component="li" size="sm" c="dimmed" mb="xs">
                {item}
              </Text>
            ))}
          </Box>

          {/* Botão */}
          <Button
            component={Link}
            to={section.link}
            variant="subtle"
            rightSection={<IconArrowRight size={16} />}
            mt="md"
            fullWidth
          >
            Ver +
          </Button>
        </Card>
      ))}
    </Group>
  );
}

