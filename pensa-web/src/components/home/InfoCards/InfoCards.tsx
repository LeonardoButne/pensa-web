import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Title,
  Box,
  rem,
} from "@mantine/core";
import classes from "./InfoCards.module.css";

const cardsData = [
  {
    title: "Informação",
    description:
      "O cidadão tem acesso a informações sobre diversas doenças, saúde materna e infantil, vacinas e contactos de centros de saúde, geridas pelo MISAU e atualizadas em tempo real.",
    color: "#0088CC",
  },
  {
    title: "Disseminação de SMS",
    description:
      "Além de receberem SMS com informações solicitadas, os cidadãos podem receber mensagens enviadas pelo MISAU para todo o país ou para áreas específicas, como alertas sobre surtos de cólera.",
    color: "#0088CC",
  },
  {
    title: "Acompanhamento",
    description:
      "O sistema *660# envia alertas sobre medidas de saúde aos utentes de acordo com seu perfil individual. Mantenha sua saúde em dia com lembretes personalizados.",
    color: "#0088CC",
  },
  {
    title: "Resultados",
    description:
      "Serão gerados relatórios na plataforma para mostrar como os cidadãos utilizam a ferramenta, indicando as informações mais procuradas e as províncias ou distritos com maior uso.",
    color: "#0088CC",
  },
];

export function InfoCards() {
  return (
    <Box py={60} bg="white">
      <Title
        order={4}
        ta="center"
        mb={{ base: rem(20), md: rem(30) }}
        style={{ fontWeight: 400 }}
        c="dimmed" // Cor mais suave para o título
      >
        O que fazemos
      </Title>

      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              className={classes.card}
              style={{ backgroundColor: card.color }}
            >
              <Title order={4} c="white" mb="md" fw={700}>
                {card.title}
              </Title>
              <Text size="sm" c="white" lh={1.6}>
                {card.description}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

