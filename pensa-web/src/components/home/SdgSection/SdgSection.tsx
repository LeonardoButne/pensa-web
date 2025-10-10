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

// Nota: Você precisará salvar os ícones do ODS na pasta 'public'.
// Ex: /public/images/sdg-03.svg, /public/images/sdg-09.svg, /public/images/sdg-17.svg

const sdgData = [
  {
    id: 3,
    // title: "Saúde e Bem-Estar",
    iconSrc: "/images-sgd/3.jpeg",
    description:
      "Nossa plataforma promove o acesso a informações e recursos que apoiam a saúde física e mental dos usuários.",
  },
  {
    id: 9,
    // title: "Indústria, Inovação e Infraestrutura",
    iconSrc: "/images-sgd/9.jpeg",
    description:
      "Fomentamos a inovação através de soluções digitais e uma infraestrutura tecnológica resiliente para todos os nossos parceiros.",
  },
  {
    id: 17,
    // title: "Parcerias para os Objetivos",
    iconSrc: "/images-sgd/17.jpeg",
    description:
      "Acreditamos que a colaboração é a chave. Fortalecemos e revitalizamos a parceria global para o desenvolvimento sustentável.",
  },
];

export function SdgSection() {
  return (
    <Box py={{ base: rem(40), mt: rem(40), mb: rem(40) }} bg="white">
      <Container size="lg">
        <Title order={3} ta="center" mb={rem(40)}>
          Nosso Compromisso com os Objectivos Globais
        </Title>

        <Grid gutter="xl">
          {sdgData.map((sdg) => (
            <Grid.Col key={sdg.id} span={{ base: 12, sm: 4 }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                ta="center"
                h="100%"
              >
                {/* Ícone do ODS */}
                <Image
                  src={sdg.iconSrc}
                  alt={`Ícone do ODS ${sdg.id}`}
                  style={{
                    width: rem(130),
                    margin: "0 auto",
                    marginBottom: rem(15),
                  }}
                />

                {/* <Title order={4} mb="xs">{`ODS ${sdg.id}: ${sdg.title}`}</Title> */}

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

