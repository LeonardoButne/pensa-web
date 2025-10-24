// =========================================================
// ARQUIVO: BadgeCard.tsx (FINALIZADO com SimpleGrid)
// =========================================================
import { IconArrowRight, IconLocation } from "@tabler/icons-react";
import { Box, Button, Card, Text, Title, SimpleGrid } from "@mantine/core"; // Adicionado SimpleGrid
import { Link } from "react-router-dom";
// import classes from "./BadgeCard.module.css"; // Mantenha se você usa classes externas

const sections = [
  {
    img: "/images-healthInfo/doencas.png",
    title: "Doenças",
    items: ["Aids", "Cólera", "Diabetes", "Gripe", "Malária"],
    link: "/doencas",
  },
  {
    img: "/images-healthInfo/urgencias.png",
    title: "Primeiros socorros",
    items: [
      "Ataques cardíacos",
      "Hemorragias",
      "Primeiros socorros / Trauma",
      "Primeiros socorros respiratórias",
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
  {
    img: "/images-healthInfo/centros-saude.png",
    title: "Unidades sanitárias",
    items: [
      "Hospitais e Clínicas",
      "Localização por Província",
      "Contactos de Emergência",
      "Serviços Disponíveis",
    ],
    link: "/centros-de-saude",
  },
];

export function BadgeCard() {
  return (
    // USAMOS SimpleGrid AQUI:
    // - cols: 1 coluna no mobile (base), 2 colunas no tablet (sm), 4 colunas no desktop (lg)
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 4 }}
      spacing="xl"
      style={{ margin: "0 auto", maxWidth: 1400 }} // Opcional: Centraliza e limita a largura se necessário
    >
      {sections.map((section) => (
        <Card
          key={section.title}
          shadow="sm"
          padding="xl"
          radius="lg"
          // className={classes.card}
          // O width: 300px foi removido. O SimpleGrid define a largura automaticamente.
          // style={{ width: 300 }} // Remova esta linha
        >
          {/* Imagem centralizada */}
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {/* Se não tiver imagem, use um ícone como fallback */}
            {section.img ? (
              <img
                src={section.img}
                alt={section.title}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
            ) : (
              <IconLocation
                size={80}
                style={{ color: "var(--mantine-color-teal-6)" }}
              />
            )}
          </Box>

          {/* Título */}
          <Title order={3} mb="md" fw={700}>
            {section.title}
          </Title>

          {/* Lista de itens */}
          <Box
            component="ul"
            // className={classes.list}
            style={{ listStyleType: "disc", paddingLeft: "20px" }}
          >
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
    </SimpleGrid>
  );
}

