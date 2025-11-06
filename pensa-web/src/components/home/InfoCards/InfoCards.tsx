import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Title,
  Box,
  rem,
  ThemeIcon,
  Flex,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconMailFast,
  IconHeartbeat,
  IconChartBar,
} from "@tabler/icons-react";
import classes from "./infoCards.module.css";

interface CardData {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const cardsData: CardData[] = [
  {
    title: "Informação",
    description:
      "O cidadão tem acesso a diversas informações sobre doenças, saúde materna e infantil, vacinas e contactos de unidades sanitárias, geridas pelo MISAU e atualizadas em tempo real.",
    color: "#0088CC",
    icon: <IconInfoCircle size={28} stroke={2} />,
  },
  {
    title: "Disseminação de SMS",
    description:
      "Além de receberem SMS com informações solicitadas, os cidadãos podem receber mensagens enviadas pelo MISAU para todo o país ou para áreas específicas, como alertas sobre surtos de cólera.",
    color: "#0088CC",
    icon: <IconMailFast size={28} stroke={2} />,
  },
  {
    title: "Acompanhamento",
    description:
      "O sistema *660# envia alertas sobre medidas de saúde aos utentes de acordo com seu perfil individual. Mantenha sua saúde em dia com lembretes personalizados.",
    color: "#0088CC",
    icon: <IconHeartbeat size={28} stroke={2} />,
  },
  {
    title: "Resultados",
    description:
      "Serão gerados relatórios na plataforma para mostrar como os cidadãos utilizam a ferramenta, indicando as informações mais procuradas e as províncias ou distritos com maior uso.",
    color: "#0088CC",
    icon: <IconChartBar size={28} stroke={2} />,
  },
];

export function InfoCards() {
  return (
    <Box
      py={{ base: rem(50), sm: rem(70), md: rem(90) }}
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #e6f4fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos de fundo */}
      <Box
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 136, 204, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 136, 204, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
        <Box mb={{ base: rem(35), sm: rem(45), md: rem(55) }} ta="center">
          <Title
            order={2}
            mb="md"
            fw={700}
            size={rem(32)}
            style={{
              background: "linear-gradient(135deg, #0088CC 0%, #0066AA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            O que fazemos
          </Title>
          <Text
            c="dimmed"
            size={rem(21)}
            maw={700}
            mx="auto"
            px={{ base: "md", sm: 0 }}
          >
            Conheça os principais serviços e funcionalidades disponíveis
          </Text>
        </Box>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: "md", sm: "lg", md: "xl" }}
        >
          {cardsData.map((card, index) => (
            <Card
              key={index}
              radius="xl"
              className={classes.card}
              style={{
                background: `linear-gradient(135deg, ${card.color} 0%, #006699 100%)`,
                border: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0, 136, 204, 0.2)",
              }}
            >
              {/* Padrão decorativo de fundo melhorado */}
              <Box
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: -50,
                  left: -50,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-20%",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.05)",
                  pointerEvents: "none",
                }}
              />

              {/* Conteúdo do card */}
              <Box style={{ position: "relative", zIndex: 1 }}>
                <Flex align="center" gap="sm" mb={{ base: "sm", sm: "md" }}>
                  <ThemeIcon
                    size={56}
                    radius="lg"
                    variant="white"
                    color="white"
                    style={{
                      flexShrink: 0,
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                      transition: "transform 0.3s ease",
                    }}
                    className={classes.cardIcon}
                  >
                    <Box c="#0088CC">{card.icon}</Box>
                  </ThemeIcon>

                  <Title
                    order={4}
                    c="white"
                    style={{
                      marginBottom: 0,
                      flex: 1,
                      lineHeight: 1.3,
                      whiteSpace: "normal",
                    }}
                  >
                    {card.title}
                  </Title>
                </Flex>

                <Text
                  c="rgba(255, 255, 255, 0.96)"
                  lh={1.7}
                  style={{
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {card.description}
                </Text>
              </Box>

            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}