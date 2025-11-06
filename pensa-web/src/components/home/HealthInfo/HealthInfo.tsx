import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Button,
  Box,
  rem,
  Image,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./HealthInfo.module.css";

interface HealthSection {
  img: string;
  title: string;
  link: string;
  description: string;
}

const sections: HealthSection[] = [
  {
    img: "/images-healthInfo/doencas.png",
    title: "Doenças",
    link: "/doencas",
    description: "Informações sobre prevenção e tratamento",
  },
  {
    img: "/images-healthInfo/urgencias.png",
    title: "Primeiros socorros",
    link: "/primeiros-socoros",
    description: "Guia rápido para situações de emergência",
  },
  {
    img: "/images-healthInfo/mae-e-bebe.png",
    title: "Mãe e bebé",
    link: "/mae-e-bebe",
    description: "Cuidados durante a gravidez e pós-parto",
  },
  {
    img: "/images-healthInfo/centros-saude.png",
    title: "Unidades sanitárias",
    link: "/centros-de-saude",
    description: "Encontre o centro de saúde mais próximo",
  },
];

export function HealthInfo() {
  return (
    <Box 
      py={{ base: rem(60), md: rem(80) }} 
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%)",
      }}
    >
      <Container size="xl">
        <Box mb={{ base: rem(40), md: rem(60) }} ta="center">
          <Title
            order={2}
            mb="md"
            fw={700}
            size={rem(36)}
            style={{
              background: "linear-gradient(135deg, #0c8599 0%, #17c1e8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Informação sobre saúde
          </Title>
          <Text c="dimmed" size="lg" maw={600} mx="auto">
            Aceda rapidamente às informações de saúde que precisa
          </Text>
        </Box>

        <SimpleGrid 
          cols={{ base: 1, sm: 2, lg: 4 }} 
          spacing={{ base: "lg", md: "xl" }}
        >
          {sections.map((section) => (
            <Card
              key={section.title}
              radius="xl"
              p="xl"
              shadow="sm"
              className={classes.card}
              style={{
                border: "1px solid rgba(12, 133, 153, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                background: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(12, 133, 153, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
              }}
            >
              <Card.Section 
                style={{
                  background: "linear-gradient(135deg, rgba(23, 193, 232, 0.05) 0%, rgba(12, 133, 153, 0.05) 100%)",
                  borderRadius: `${rem(16)} ${rem(16)} 0 0`,
                }}
              >
                <Box p="xl" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: rem(140) }}>
                  <Image
                    src={section.img}
                    alt={section.title}
                    height={100}
                    width="auto"
                    fit="contain"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))",
                    }}
                  />
                </Box>
              </Card.Section>

              <Box mt="lg">
                <Title ta="center" order={3} size="xl" fw={700} mb="xs" c="#0c8599">
                  {section.title}
                </Title>
                <Text c="dimmed" size="sm" mb="lg">
                  {section.description}
                </Text>

                <Button
                  component={Link}
                  to={section.link}
                  rightSection={<IconArrowRight size={18} stroke={2} />}
                  fullWidth
                  radius="lg"
                  size="md"
                  variant="light"
                  className={classes.button}
                >
                  Explorar
                </Button>
              </Box>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}