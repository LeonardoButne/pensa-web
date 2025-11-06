import { Text, Paper, SimpleGrid, Box, Title, Container, Group, ThemeIcon, rem } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconUsers, IconChartBar, IconVirus, IconClock } from "@tabler/icons-react";

// Definição dos Dados do Impacto
interface ImpactItem {
  value: string;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  gradient: { from: string; to: string; deg: number };
}

const IMPACT_DATA: ImpactItem[] = [
  {
    value: "+5.33M",
    label: "Utilizadores",
    description: "Pessoas que utilizam o sistema",
    color: "cyan",
    icon: <IconUsers size={28} stroke={2} />,
    gradient: { from: "cyan", to: "blue", deg: 135 },
  },
  {
    value: "+77.6M",
    label: "Total de acessos",
    description: "Pessoas que acederam ao sistema",
    color: "indigo",
    icon: <IconChartBar size={28} stroke={2} />,
    gradient: { from: "indigo", to: "violet", deg: 135 },
  },
  {
    value: "+40",
    label: "Doenças catalogadas",
    description: "Informações completas e confiáveis",
    color: "grape",
    icon: <IconVirus size={28} stroke={2} />,
    gradient: { from: "grape", to: "pink", deg: 135 },
  },
  {
    value: "24/7",
    label: "Disponibilidade",
    description: "Acesso a informações a qualquer hora",
    color: "teal",
    icon: <IconClock size={28} stroke={2} />,
    gradient: { from: "teal", to: "green", deg: 135 },
  },
];

export function ImpactSection() {
  const { ref, entry } = useIntersection({
    threshold: 0.2,
  });

  const isVisible = entry?.isIntersecting;

  return (
    <Box
      py={{ base: 60, md: 80 }}
      style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,182,212,0.03) 50%, rgba(0,0,0,0) 100%)",
      }}
    >
      <Container size="xl">
        {/* Header da Secção */}
        <Box mb={50} ta="center">
          <Text
            size="sm"
            tt="uppercase"
            fw={700}
            c="cyan.6"
            mb="xs"
            style={{ letterSpacing: "0.1em" }}
          >
            O Nosso Impacto
          </Text>
          <Title
            order={2}
            fw={800}
            mb="md"
            style={{
              fontSize: rem(36),
              lineHeight: 1.2,
            }}
          >
            Transformando o acesso à{" "}
            <Text
              span
              fw={800}
              variant="gradient"
              style={{
                fontSize: rem(36),
                lineHeight: 1.2,
              }}
              gradient={{ from: "cyan", to: "blue", deg: 90 }}
            >
              saúde digital
            </Text>
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Números que demonstram o nosso compromisso com a saúde pública
          </Text>
        </Box>

        {/* Grid de Cards */}
        <SimpleGrid
          ref={ref}
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: "lg", md: "xl" }}
        >
          {IMPACT_DATA.map((item, index) => (
            <Paper
              key={item.label}
              shadow="md"
              radius="lg"
              p="xl"
              withBorder
              style={{
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.95)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
                cursor: "pointer",
                borderColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(6, 182, 212, 0.15)";
                e.currentTarget.style.borderColor = "var(--mantine-color-cyan-4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "var(--mantine-shadow-md)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {/* Ícone com Gradiente */}
              <ThemeIcon
                variant="gradient"
                gradient={item.gradient}
                size={60}
                radius="md"
                mb="lg"
              >
                {item.icon}
              </ThemeIcon>

              {/* Valor Principal */}
              <Text
                fw={900}
                variant="gradient"
                gradient={item.gradient}
                style={{
                  fontSize: rem(42),
                  lineHeight: 1,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
                mb="md"
              >
                {item.value}
              </Text>

              {/* Label */}
              <Title order={4} fw={700} mb="xs" c="dark.7">
                {item.label}
              </Title>

              {/* Descrição */}
              <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                {item.description}
              </Text>

              {/* Barra de destaque */}
              <Box
                mt="md"
                h={3}
                style={{
                  borderRadius: 2,
                  background: `linear-gradient(90deg, var(--mantine-color-${item.color}-5), var(--mantine-color-${item.color}-7))`,
                  width: "60%",
                  transition: "width 0.3s ease",
                }}
                className="impact-bar"
              />
            </Paper>
          ))}
        </SimpleGrid>

        {/* Footer motivacional */}
        <Box
          mt={60}
          p="xl"
          style={{
            borderRadius: rem(12),
            background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(99,102,241,0.08) 100%)",
            border: "1px solid rgba(6,182,212,0.2)",
          }}
        >
          <Group justify="center" gap="lg">
            <Text size="md" fw={600} c="dark.6" ta="center">
              💡 Juntos estamos a construir um futuro mais saudável e informado
            </Text>
          </Group>
        </Box>
      </Container>

      {/* CSS personalizado para animação da barra */}
      <style>{`
        .mantine-Paper-root:hover .impact-bar {
          width: 100% !important;
        }
      `}</style>
    </Box>
  );
}