import { Container, Title, Text, Paper, Box } from "@mantine/core";
// Importamos o hook useInView para detectar quando o elemento está visível
import { useInView } from "react-intersection-observer";
import classes from "./MentalHealth.module.css";

export function MentalHealth() {
  // O link do seu arquivo .mp4
  const videoSrc = `https://www.pensa.org.mz/files/SAUDE_MENTAL.mp4`;

  // 1. Hook para observar se a seção está visível
  // ref: é o elemento que queremos observar (o Paper que envolve o vídeo)
  // inView: é um booleano (true ou false) que diz se o elemento está visível
  const { ref, inView } = useInView({
    threshold: 0.5, // O vídeo deve estar 50% visível para ser considerado 'inView'
    triggerOnce: false, // Permite que a detecção ocorra múltiplas vezes (liga/desliga)
  });

  return (
    <Box py={80} bg="#00918b">
      <Container size="xl">
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <Title order={2} mb="md" fw={700}>
              Saúde mental
            </Title>
            <Text c="black" size="md" lh={1.6}>
              Cuide da sua saúde mental da mesma forma que cuida do resto do seu
              corpo. A saúde mental é tão importante quanto a física. Encontre
              apoio, informação e orientação.
            </Text>
          </div>

          {/* 2. Criamos um contêiner Paper para dar o efeito de sombra e cantos arredondados,
            e anexamos a ref para observação.
          */}
          <Paper
            ref={ref}
            className={classes.videoWrapper} // Adapte ou crie este estilo no seu CSS
            shadow="sm"
            radius="lg"
            p="xl"
            style={{ width: 550, height: 550, overflow: "hidden" }}
          >
            {/* 3. Usamos a tag <video> para arquivos locais/diretos.
              - autoplay: Adicionado condicionalmente.
              - muted: Essencial para garantir o autoplay na maioria dos navegadores.
              - controls: Para permitir que o usuário controle o vídeo (opcional).
            */}
            <video
              width="100%"
              height="100%"
              // Quando inView é true, adicionamos o atributo 'autoPlay'
              autoPlay={inView}
              // O atributo 'muted' é necessário para que o 'autoPlay' funcione em muitos navegadores
              muted
              // Você pode remover 'controls' se quiser que o vídeo rode em loop sem interface
              controls
              loop // Para que o vídeo recomece ao terminar
              preload="metadata"
              className={classes.videoElement} // Classe CSS para estilo específico do vídeo
            >
              {/* O atributo 'src' vai para a tag <source> */}
              <source src={videoSrc} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </Paper>
        </div>
      </Container>
    </Box>
  );
}

