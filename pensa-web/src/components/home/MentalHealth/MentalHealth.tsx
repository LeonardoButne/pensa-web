import { Container, Title, Text, Paper, Box } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import classes from "./MentalHealth.module.css";

export function MentalHealth() {
  const videoSrc = `https://www.pensa.org.mz/files/SAUDE_MENTAL.mp4`;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    // 🟢 Ajuste a cor de fundo para uma variável Mantine para consistência
    <Box py={80} style={{ backgroundColor: "#00918b" }}>
      <Container size="xl">
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <Title order={2} mb="md" fw={700} c="white">
              Saúde mental
            </Title>
            <Text c="white" size="lg" lh={1.6}>
              {" "}
              {/* Tamanho aumentado para harmonizar */}
              Cuide da sua saúde mental da mesma forma que cuida do resto do seu
              corpo. A saúde mental é tão importante quanto a física. Encontre
              apoio, informação e orientação.
            </Text>
          </div>

          <Paper
            ref={ref}
            className={classes.videoWrapper}
            shadow="xl" // Sombra mais proeminente
            radius="lg"
            p={0}
            style={{ overflow: "hidden" }}
          >
            <video
              width="100%"
              height="100%"
              autoPlay={inView}
              muted
              controls
              loop
              preload="metadata"
              className={classes.videoElement}
            >
              <source src={videoSrc} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </Paper>
        </div>
      </Container>
    </Box>
  );
}

