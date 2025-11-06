import { Accordion, Container, Title, Text, Box } from "@mantine/core";
import { useState } from "react";

const FAQ_DATA = [
  {
    value: "cadastro-pensa",
    question: "Como posso me cadastrar na PENSA?",
    answer:
      "O cadastro é simples e rápido. Basta ligar *660#, selecionar opção 4 e seguir as instruções.",
  },
  {
    value: "custo-pensa",
    question: "Existe algum custo para utilizar a PENSA?",
    answer:
      "A PENSA é totalmente gratuito e funciona sem nenhuma ligação a internet.",
  },
  {
    value: "seguranca-dados",
    question: "Meus dados e informações estão seguros na PENSA?",
    answer:
      "Sim, a segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de proteção de dados. Seus dados são armazenados em servidores seguros, em conformidade com as normas internacionais de privacidade.",
  },
  {
    value: "reclamacoes-pensa",
    question: "Como fazer reclamações na plataforma?",
    answer:
      "Para fazer reclamações, basta ligar *660# e escolher a opção 6 - Queixas. Poderá deixar uma queixa sobre unidades sanitárias, postos de vacinação e até mesmo da PENSA.",
  },
];

export default function FaqSimple() {
  const [value, setValue] = useState<string | null>(null);

  const items = FAQ_DATA.map((item) => (
    <Accordion.Item
      value={item.value}
      key={item.value}
      style={{
        backgroundColor: "white",
        border: "1px solid #e9ecef",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: value === item.value
          ? "0 8px 24px rgba(0, 0, 0, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Accordion.Control
        style={{
          padding: "5px 15px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#1a1a1a",
          transition: "background-color 0.2s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>{item.question}</span>
        </div>
      </Accordion.Control>
      <Accordion.Panel
        style={{
          padding: "0 0 10px 34px",
          color: "#495057",
          fontSize: "15px",
          lineHeight: "1.7",
        }}
      >
        {item.answer}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        padding: "40px 0px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container
        size="md"
        style={{ width: "100%", maxWidth: "800px" }}>
        {/* Header Section */}
        <Box style={{ textAlign: "center", marginBottom: "48px" }}>
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#228be6",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            Suporte
          </Text>
          <Title
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Perguntas Frequentes
          </Title>
          <Text
            style={{
              fontSize: "17px",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Encontre respostas rápidas sobre a PENSA. Não encontrou o que procura? Entre em contacto connosco.
          </Text>
        </Box>

        {/* Accordion */}
        <Accordion
          value={value}
          onChange={setValue}
          variant="separated"
          chevronPosition="right"
          styles={{
            chevron: {
              transition: "transform 0.3s ease",
              color: "#228be6",
            },
          }}
        >
          {items}
        </Accordion>

        {/* Footer CTA */}
        <Box
          style={{
            marginTop: "48px",
            padding: "32px",
            background: "white",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            Ainda tem dúvidas?
          </Text>
          <Text style={{ fontSize: "15px", color: "#666", marginBottom: "20px" }}>
            Nossa equipa está pronta para ajudar. Ligue para 82149, 84146 ou 1490 para assistência directa.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}