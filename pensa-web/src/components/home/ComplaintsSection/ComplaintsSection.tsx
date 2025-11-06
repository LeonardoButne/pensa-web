import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Image,
  Box,
  rem,
  Button,
  Group,
  Stack,
  Badge,
  Paper,
} from "@mantine/core";
import {
  IconPhone,
  IconBrandWhatsapp,
  IconAlertCircle,
  IconTrendingUp
} from "@tabler/icons-react";

const complaintData = [
  {
    id: 1,
    count: "112.080",
    iconSrc: "/images-complaints/medicamentos.png",
    title: "Falta de Medicamentos",
    description: "Denúncias sobre falta de medicamentos e produtos essenciais",
    color: "#ff6b6b",
  },
  {
    id: 2,
    count: "199.058",
    iconSrc: "/images-complaints/review.png",
    title: "Mau Atendimento",
    description: "Relatos sobre atendimento inadequado nas unidades sanitárias",
    color: "#4ecdc4",
  },
  {
    id: 3,
    count: "96.804",
    iconSrc: "/images-complaints/say-no.png",
    title: "Cobranças Indevidas",
    description: "Denúncias de cobranças por serviços gratuitos",
    color: "#ffd93d",
  },
];

export function ComplaintSection() {
  const handleUSSDCall = () => {
    window.location.href = "tel:*660%23";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/258820000660", "_blank");
  };

  return (
    <Box
      py={{ base: rem(30), md: rem(40) }}
      style={{
        background: "linear-gradient(135deg, #00918b 0%, #00756f 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Padrão decorativo de fundo */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 20% 30%, white 2px, transparent 2px),
                           radial-gradient(circle at 80% 70%, white 2px, transparent 2px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Stack align="center" gap="md" mb={rem(50)}>
          <Badge
            size="lg"
            radius="sm"
            variant="white"
            color="teal"
            leftSection={<IconAlertCircle size={16} />}
            styles={{
              root: { textTransform: "uppercase", letterSpacing: "1px" },
            }}
          >
            Sistema de Denúncias
          </Badge>

          <Title
            order={2}
            ta="center"
            c="white"
            style={{
              fontSize: rem(36),
              fontWeight: 800,
              letterSpacing: "-0.5px",
              maxWidth: rem(600),
            }}
          >
            Canal de Queixas e Reclamações
          </Title>

          <Text
            ta="center"
            c="rgba(255, 255, 255, 0.95)"
            size="lg"
            maw={rem(700)}
            style={{ lineHeight: 1.7 }}
          >
            Ajude-nos a melhorar o sistema de saúde. Sua voz é importante para
            tornar o atendimento melhor para todos os moçambicanos.
          </Text>

          {/* Botões de Ação */}
          <Group mt="md" gap="md">
            <Button
              size="md"
              radius="md"
              color="white"
              variant="filled"
              leftSection={<IconPhone size={18} />}
              onClick={handleUSSDCall}
              styles={{
                root: {
                  color: "#00918b",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(128, 128, 128, 0.2)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            >
              *660# → Opção 6
            </Button>

            <Button
              size="md"
              radius="md"
              variant="light"
              color="white"
              leftSection={<IconBrandWhatsapp size={18} />}
              onClick={handleWhatsApp}
              styles={{
                root: {
                  color: "white",
                  fontWeight: 600,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
                },
              }}
            >
              WhatsApp
            </Button>
          </Group>
        </Stack>

        {/* Cards de Estatísticas */}
        <Grid gutter="lg">
          {complaintData.map((item, index) => (
            <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card
                shadow="lg"
                padding="xl"
                radius="lg"
                h="100%"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                styles={{
                  root: {
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                    },
                  },
                }}
              >
                <Stack align="center" gap="md">
                  {/* Ícone */}
                  <Paper
                    radius="xl"
                    p="md"
                    style={{
                      backgroundColor: `${item.color}15`,
                      border: `3px solid ${item.color}30`,
                    }}
                  >
                    <Image
                      src={item.iconSrc}
                      alt={`Ícone ${item.title}`}
                      style={{
                        width: rem(70),
                        height: rem(70),
                        objectFit: "contain",
                      }}
                    />
                  </Paper>

                  {/* Contador */}
                  <Box ta="center">
                    <Group gap={4} justify="center" mb={4}>
                      <IconTrendingUp size={20} color={item.color} />
                      <Title
                        order={1}
                        style={{
                          fontSize: rem(36),
                          fontWeight: 900,
                          color: item.color,
                          letterSpacing: "-1px",
                        }}
                      >
                        {item.count}
                      </Title>
                    </Group>
                    <Badge
                      size="sm"
                      radius="sm"
                      variant="light"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Text size="xs" fw={600} c={item.color}>
                        DENÚNCIAS
                      </Text>
                    </Badge>
                  </Box>

                  {/* Título e Descrição */}
                  <Box ta="center">
                    <Text fw={700} size="lg" mb={8} c="dark.8">
                      {item.title}
                    </Text>
                    <Text size="sm" c="gray.7" style={{ lineHeight: 1.6 }}>
                      {item.description}
                    </Text>
                  </Box>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Footer Note */}
        <Paper
          p="lg"
          radius="md"
          mt={rem(40)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Text ta="center" c="white" size="sm" fw={500}>
            💡 Todas as denúncias são analisadas e encaminhadas para as
            autoridades competentes. Seu anonimato é garantido.
          </Text>
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