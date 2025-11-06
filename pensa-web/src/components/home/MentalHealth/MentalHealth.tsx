import { useState } from "react";
import { Container, Title, Text, Paper, Box, Button } from "@mantine/core";
import { useInView } from "react-intersection-observer";
import { Heart, Brain } from "lucide-react";

export default function MentalHealth() {
  const videoSrc = `https://www.pensa.org.mz/files/SAUDE_MENTAL.mp4`;
  const [isHovered, setIsHovered] = useState(false);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: videoRef, inView: videoInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <Box
      py={{ base: 30, md: 60 }}
      style={{
        background: "linear-gradient(165deg, #00b8af 0%, #008f87 30%, #006b66 70%, #004d49 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
        <div
          ref={sectionRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(30px, 5vw, 60px)",
            flexDirection: "row",
          }}
          className="mental-health-wrapper"
        >
          {/* Conteúdo textual - 60% */}
          <div
            style={{
              flex: "1 1 60%",
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Title
              order={1}
              mb="lg"
              style={{
                color: "white",
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.2)"
              }}
            >
              Sua Saúde Mental{" "}
              <span style={{
                display: "block",
                background: "linear-gradient(120deg, #ffffff 0%, #a0f0ed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginTop: "8px"
              }}>
                Merece Atenção
              </span>
            </Title>
            <Text
              size="md"
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.75,
                fontSize: "clamp(15px, 2vw, 17px)",
                marginBottom: "32px",
                maxWidth: "520px"
              }}
            >
              Cuide da sua saúde mental com o mesmo cuidado que dedica ao seu corpo.
              O bem-estar emocional é fundamental para uma vida plena e equilibrada.
            </Text>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "28px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Heart size={22} color="white" fill="white" />
                </div>
                <div>
                  <Text size="xs" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, marginBottom: "2px" }}>
                    Apoio Contínuo
                  </Text>
                  <Text size="sm" fw={700} style={{ color: "white" }}>
                    Disponível 24/7
                  </Text>
                </div>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Brain size={22} color="white" />
                </div>
                <div>
                  <Text size="xs" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500, marginBottom: "2px" }}>
                    Especialistas
                  </Text>
                  <Text size="sm" fw={700} style={{ color: "white" }}>
                    Qualificados
                  </Text>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              radius="md"
              style={{
                backgroundColor: "white",
                color: "#00918b",
                fontWeight: 700,
                padding: "12px 32px",
                fontSize: "15px",
                border: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
              }}
            >
              Saiba Mais
            </Button>
          </div>

          {/* Vídeo wrapper - 40% */}
          <div
            ref={videoRef}
            style={{
              flex: "1 1 40%",
              maxWidth: "420px",
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <Paper
              shadow="xl"
              radius="xl"
              style={{
                overflow: "hidden",
                aspectRatio: "9 / 12",
                position: "relative",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                transform: isHovered ? "scale(1.03) rotate(1deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.15)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glow effect */}
              <div style={{
                position: "absolute",
                inset: -2,
                background: "linear-gradient(145deg, rgba(255,255,255,0.3), transparent 60%)",
                borderRadius: "inherit",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.5s",
                pointerEvents: "none",
                zIndex: 1
              }} />

              <video
                width="100%"
                height="100%"
                autoPlay={videoInView}
                muted
                controls
                loop
                playsInline
                preload="metadata"
                style={{
                  display: "block",
                  objectFit: "contain",
                  width: "100%",
                  height: "100%"
                }}
              >
                <source src={videoSrc} type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
            </Paper>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          33% { 
            transform: translate(30px, -30px) rotate(120deg); 
          }
          66% { 
            transform: translate(-20px, 20px) rotate(240deg); 
          }
        }

        @media (max-width: 768px) {
          .mental-health-wrapper {
            flex-direction: column !important;
            text-align: center;
          }
          
          .mental-health-wrapper > div:first-child {
            flex: 1 1 100% !important;
            max-width: 100% !important;
          }
          
          .mental-health-wrapper > div:last-child {
            flex: 1 1 100% !important;
            max-width: 100% !important;
            margin: 0 auto;
          }
        }
      `}</style>
    </Box>
  );
}