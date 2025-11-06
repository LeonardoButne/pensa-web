import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Paper,
  ActionIcon,
  Transition,
} from "@mantine/core";
import {
  IconCalendar,
  IconMail,
  IconArrowRight,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useState } from "react";

const news = [
  {
    id: 1,
    title: "A Saúde Mental é Importante para Todos Nós",
    image: "/images-news/saude_mental.jpg",
    date: "15 de Setembro, 2024",
    category: "Saúde Mental",
    excerpt: "Descubra como cuidar da sua saúde mental e bem-estar emocional no dia a dia.",
  },
  {
    id: 2,
    title: "Fumar Não Alivia o Stress: Apenas Adoece o Corpo e a Mente",
    image: "/images-news/fumar-pensa.jpg",
    date: "12 de Setembro, 2024",
    category: "Prevenção",
    excerpt: "Entenda os verdadeiros impactos do tabagismo na sua saúde física e mental.",
  },
  {
    id: 3,
    title: "Primeiros Socorros na Pensa",
    image: "/images-news/PRIMEIROS-SOCORROS.jpg",
    date: "10 de Setembro, 2024",
    category: "Emergência",
    excerpt: "Aprenda técnicas essenciais de primeiros socorros que podem salvar vidas.",
  },
  {
    id: 4,
    title: "Cuidados Pré-Natais: O Que Toda Gestante Precisa Saber",
    image: "/images-news/gravidez.png",
    date: "08 de Setembro, 2024",
    category: "Maternidade",
    excerpt: "Guia completo para uma gravidez saudável e segura para mãe e bebê.",
  },
  {
    id: 5,
    title: "Dia da Consciencialização de Modos de Vida Saudáveis",
    image: "/images-news/vida-saudavel.jpg",
    date: "05 de Setembro, 2024",
    category: "Bem-estar",
    excerpt: "Dicas práticas para adotar hábitos saudáveis no seu cotidiano.",
  },
  {
    id: 6,
    title: "Saúde na Palma da Sua Mão",
    image: "/images-news/saude -na-palma.jpg",
    date: "02 de Setembro, 2024",
    category: "Tecnologia",
    excerpt: "Conheça como o *660# facilita o acesso a informações de saúde.",
  },
];

type NewsItem = {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
};

type NewsCardProps = {
  item: NewsItem;
  index: number;
};

function NewsCard({ item, index }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      shadow="md"
      padding={0}
      radius="lg"
      style={{
        height: "100%",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        border: "1px solid #e9ecef",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      styles={{
        root: {
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
          },
        },
      }}
    >
      <Card.Section style={{ position: "relative", overflow: "hidden" }}>
        <Box style={{ position: "relative", paddingTop: "60%", overflow: "hidden" }}>
          <Image
            src={item.image}
            alt={item.title}
            fit="contain"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            }}
            fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%2300C7B7'/%3E%3C/svg%3E"
          />

          {/* Overlay gradiente */}
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Badge categoria */}
        <Badge
          size="md"
          radius="sm"
          variant="filled"
          color="cyan"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: "10px",
          }}
        >
          {item.category}
        </Badge>
      </Card.Section>

      <Stack gap="xs" p="lg" style={{ flex: 1 }}>
        {/* Título */}
        <Text
          fw={700}
          size="md"
          lineClamp={2}
          style={{
            color: "#1a1a1a",
            lineHeight: 1.4,
            minHeight: "2.8em",
          }}
        >
          {item.title}
        </Text>

        {/* Excerpt */}
        <Text
          size="sm"
          c="dimmed"
          lineClamp={2}
          style={{ lineHeight: 1.5, flex: 1 }}
        >
          {item.excerpt}
        </Text>

        {/* Data e botão */}
        <Group justify="space-between" align="center" mt="auto" pt="sm">
          <Group gap={6}>
            <IconCalendar size={14} color="#868e96" />
            <Text size="xs" c="dimmed" fw={500}>
              {item.date}
            </Text>
          </Group>

          <Transition
            mounted={isHovered}
            transition="slide-left"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <ActionIcon
                variant="subtle"
                color="cyan"
                size="sm"
                radius="xl"
                style={styles}
              >
                <IconArrowRight size={16} />
              </ActionIcon>
            )}
          </Transition>
        </Group>
      </Stack>
    </Card>
  );
}

export function NewsSection() {
  return (
    <Box
      py={{ base: 30, md: 50 }}
      style={{
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
      }}
    >
      <Container size="xl">
        {/* Header Section */}
        <Stack align="center" gap="sm" mb={50}>
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.5px",
            }}
          >
            Notícias e Artigos
          </Title>

          <Group gap={6}>
            <IconTrendingUp size={18} color="#00ACC1" />
            <Text ta="center" c="dimmed" size="md" fw={500}>
              Conteúdos mais recentes sobre saúde
            </Text>
          </Group>
        </Stack>

        {/* Grid de Notícias */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: "lg", md: "xl" }}
        >
          {news.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </SimpleGrid>

        {/* CTA Newsletter */}
        <Paper
          shadow="md"
          radius="xl"
          p={{ base: "xl", md: 40 }}
          mt={60}
          style={{
            background: "linear-gradient(135deg, #00ACC1 0%, #00838F 100%)",
            border: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Padrão decorativo */}
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 30% 50%, white 2px, transparent 2px)`,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          <Stack align="center" gap="md" style={{ position: "relative", zIndex: 1 }}>
            <Box
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                padding: 16,
              }}
            >
              <IconMail size={32} color="white" />
            </Box>

            <Stack align="center" gap={8}>
              <Title order={3} c="white" ta="center" fw={700}>
                Fique Sempre Informado
              </Title>
              <Text c="rgba(255, 255, 255, 0.95)" ta="center" size="md" maw={500}>
                Receba as últimas novidades sobre saúde, dicas e artigos exclusivos
                diretamente no seu email.
              </Text>
            </Stack>

            <Button
              component="a"
              href="https://pensa.us5.list-manage.com/subscribe?u=6728b29e62cbca57aac43a7a4&id=6737f56e4d"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              radius="xl"
              color="white"
              variant="filled"
              leftSection={<IconMail size={20} />}
              styles={{
                root: {
                  color: "#00ACC1",
                  fontWeight: 600,
                  fontSize: "16px",
                  height: "52px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            >
              Assinar Newsletter Gratuita
            </Button>

            <Text size="xs" c="rgba(255, 255, 255, 0.8)" ta="center">
              ✨ Sem spam, apenas conteúdo de qualidade
            </Text>
          </Stack>
        </Paper>
      </Container>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}