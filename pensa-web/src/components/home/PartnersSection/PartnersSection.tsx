import {
  Box,
  Container,
  Title,
  Group,
  Image,
  rem,
  useMantineTheme,
} from "@mantine/core";

// Defina as interfaces para garantir o type safety
interface PartnerLogo {
  id: number;
  alt: string;
  // O caminho é relativo à pasta 'public', por isso 'images-parceiros/nome-do-arquivo.svg'
  src: string;
}

// Array de dados com os parceiros.
// Você pode (e deve) mover isso para um arquivo de dados separado (e.g., partnersData.ts)
// ou buscar de uma API, mas para este exemplo, vamos mantê-lo aqui.
const partners: PartnerLogo[] = [
  { id: 1, alt: "Logo MISAU", src: "/images-parceiros/minisaude.png" },
  { id: 2, alt: "Logo CCP", src: "/images-parceiros/ccp-logo.jpg" },
  { id: 3, alt: "Logo Movitel", src: "/images-parceiros/Movitel.png" },
  { id: 4, alt: "Logo TMCEL", src: "/images-parceiros/TMCEL.png" },
  { id: 5, alt: "Logo USAID", src: "/images-parceiros/USAID.jpg" },
  { id: 6, alt: "Logo Vodacom", src: "/images-parceiros/VODACOM.png" },
  { id: 7, alt: "Logo RADIO", src: "/images-parceiros/radio.png" },
  { id: 8, alt: "Logo fni", src: "/images-parceiros/fni.jpg" },
];

export function PartnersSection() {
  const theme = useMantineTheme();

  return (
    // Box para dar um padding vertical e um fundo sutil, se desejar
    <Box
      py={{ base: rem(0), md: rem(20) }}
      style={{ borderTop: `1px solid ${theme.colors.gray[2]}` }}
    >
      <Container size="xl">
        {/* Título da seção */}
        <Title
          order={4}
          ta="center"
          mb={{ base: rem(20), md: rem(40) }}
          style={{ fontWeight: 400 }}
          c="dimmed" // Cor mais suave para o título
        >
          Nossos parceiros
        </Title>

        {/* Grupo para alinhar os logos */}
        <Group
          justify="center"
          align="center"
          gap={0} // Espaçamento entre os logos
          wrap="wrap" // Permite que os logos quebrem para a próxima linha em telas menores
        >
          {partners.map((partner) => (
            // Box para definir o tamanho máximo do logo e facilitar o alinhamento
            <Box
              key={partner.id}
              style={{
                width: rem(160), // Largura máxima do logo para desktops
                height: rem(90), // Altura máxima do logo
                // Estilo para garantir que o logo se ajuste bem
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.75, // Deixar o logo um pouco mais "apagado" para não competir com o conteúdo principal
                transition: "opacity 0.2s ease",
                "&:hover": {
                  opacity: 1, // Opacidade total no hover
                },
              }}
            >
              {/* Componente Image do Mantine */}
              <Image
                src={partner.src}
                alt={partner.alt}
                fit="contain" // Garante que o logo se ajuste sem ser cortado
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </Box>
          ))}
        </Group>
      </Container>
    </Box>
  );
}

