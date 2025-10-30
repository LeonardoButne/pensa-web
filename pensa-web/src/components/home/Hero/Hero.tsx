import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Image,
  SimpleGrid, // 🟢 Importado para a seção de parceiros
} from "@mantine/core";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

// 🟢 Importa o plugin de Autoplay
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import classes from "./Hero.module.css";

// ===============================================
// 1. DADOS DAS IMAGENS DO SLIDER
// ===============================================
const SLIDER_IMAGES = [
  "images-hero/hero-phone.png",
  "images-hero/hero-phone.png",
  "images-hero/hero-phone.png",
  "images-hero/hero-phone.png",
];

// ===============================================
// 2. DADOS DOS PARCEIROS
// ===============================================
const PARTNERS_LOGOS = [
  "/images-parceiros/minisaude.png",
  "/images-parceiros/Csaude.png",
  "/images-parceiros/FGH.png",
  "/images-parceiros/USAID.jpg",
  "/images-parceiros/UNICEF.png",
  "/images-parceiros/Johns.png",
  "/images-parceiros/fni.jpg",
];

export function Hero() {
  const theme = useMantineTheme();
  // Usa o breakpoint 'sm' para verificar se é mobile
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // 🟢 CORREÇÃO: Inicializa o plugin Autoplay usando useRef
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  );

  const handleUSSDCall = () => {
    window.location.href = "tel:*660#";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/258820000660", "_blank");
  };

  // Mapeia as imagens para slides do Carousel
  const slides = SLIDER_IMAGES.map((url, index) => (
    <Carousel.Slide key={index}>
      <Image
        src={url}
        alt={`Smartphone com app *660# Slide ${index + 1}`}
        className={classes.heroImage}
        fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23E5E7EB'/%3E%3C/svg%3E"
      />
    </Carousel.Slide>
  ));

  return (
    <Box className={classes.hero}>
      <Container size="xl">
        {/* Bloco do Conteúdo Principal (Texto e Carousel) */}
        <div className={classes.inner}>
          {/* Conteúdo da Esquerda (Fixo) */}
          <div className={classes.content}>
            <Title className={classes.title}>*660#</Title>
            <Text className={classes.description} size="lg" mt="md">
              Informação sobre saúde para todos.
              <br />
              <Text component="span" fw={700}>
                O NOSSO MAIOR VALOR É A VIDA.
              </Text>
            </Text>

            <Group mt={30} className={classes.buttons}>
              <Button
                size="lg"
                radius="md"
                color="black"
                onClick={handleUSSDCall}
                leftSection={<IconMail size={20} />}
              >
                Ligue *660# (USSD)
              </Button>
              <Button
                size="lg"
                radius="md"
                variant="outline"
                color="black"
                onClick={handleWhatsApp}
                leftSection={<IconBrandWhatsapp size={20} />}
              >
                Conversar no WhatsApp
              </Button>
            </Group>
          </div>

          {/* Área do Carousel */}
          <div className={classes.image}>
            <Carousel
              withIndicators
              loop={!isMobile}
              height="100%"
              slideSize="100%"
              align="start"
              slidesToScroll={1}
              dragFree
              controlsOffset="sm"
              plugins={[autoplayRef.current]}
            >
              {slides}
            </Carousel>
          </div>
        </div>

        <div className={classes.partnersSection}>
          <Text
            size="sm"
            ta="center"
            c="dimmed" // Usando dimmed para ser discreto
            fw={600}
            mb="lg"
          >
            Nossos parceiros:
          </Text>

          <SimpleGrid
            // Colunas: 3 (mobile), 5 (tablet), 9 (desktop)
            cols={{ base: 3, sm: 5, md: 7 }}
            spacing={{ base: "xl", md: "xl", sm: "sm" }}
            // className={classes.partnersGrid}
          >
            {PARTNERS_LOGOS.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Parceiro ${index + 1}`}
                className={classes.partnerLogo} // Classe para transparência/tons de cinza
                fit="contain"
                h={60} // Altura fixa para todos os logos
              />
            ))}
          </SimpleGrid>
        </div>
      </Container>
    </Box>
  );
}

