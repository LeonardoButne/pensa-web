import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Image,
  Box,
  rem,
} from "@mantine/core";

const sdgData = [
  {
    id: 1,
    title: "+112.080",
    iconSrc: "/images-complaints/medicamentos.png",
    description:
      "Denuncias sobre falta de medicamentos e outros produtos essenciais nos centros de saúde.",
  },
  {
    id: 2,
    title: "+199.058",
    iconSrc: "/images-complaints/review.png",
    description: "Denuncias sobre mau atendimento nos centros de saúde.",
  },
  {
    id: 3,
    title: "+96.804",
    iconSrc: "/images-complaints/say-no.png",
    description:
      "Desuncias sobre cobranças indevidas por serviços que deveriam ser gratuitos.",
  },
];

export function ComplaintSection() {
  return (
    <Box py={{ base: rem(40), md: rem(0) }} bg="blue" mb={rem(40)} p={rem(20)}>
      <Container size="lg">
        <Title order={3} ta="center" mb={rem(40)}>
          Canal de Queixas e Reclamações
        </Title>

        <Text ta="center" mb={rem(40)}>
          Ajude-nos a deixar o sistema de saúde melhor para todos, enviando as
          suas queixas ou reclamações, através de *660# depois selecionando a
          opção 6 - Queixas ou pelo WhatsApp através do número +258 84 300 0660.
        </Text>

        <Grid gutter="xl">
          {sdgData.map((sdg) => (
            <Grid.Col key={sdg.id} span={{ base: 12, sm: 4 }}>
              <Card
                // shadow="sm"
                padding="lg"
                // radius="md"
                // withBorder
                ta="center"
                h="100%"
                mb={rem(40)}
              >
                <Image
                  src={sdg.iconSrc}
                  alt={`Ícone da reclamacao ${sdg.id}`}
                  style={{
                    width: rem(130),
                    margin: "0 auto",
                    marginBottom: rem(15),
                  }}
                />

                <Title order={2}>{`${sdg.title}`}</Title>

                <Text size="sm" c="dimmed">
                  {sdg.description}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

