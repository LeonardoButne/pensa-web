import { Accordion, Container, Title } from "@mantine/core";
import classes from "./FaqSimple.module.css";

// 1. Definição Estática dos Dados das FAQs (P: Pergunta, R: Resposta)
const FAQ_DATA = [
  {
    value: "cadastro-pensa",
    question: "Como posso me cadastrar na plataforma Pensa?",
    answer:
      "O cadastro é simples e rápido. Basta ligar *660#, selecionar opcao 4 e seguir as instruções.",
  },
  {
    value: "custo-pensa",
    question: "Existe algum custo para utilizar a Pensa?",
    answer:
      "A Pensa é totalmente gratuito e funciona sem nenhuma ligação a internet.",
  },
  {
    value: "seguranca-dados",
    question: "Meus dados e informações estão seguros na Pensa?",
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

// 2. Componente FaqSimple
export function FaqSimple() {
  // Mapeamento dos dados para os componentes Accordion.Item
  const items = FAQ_DATA.map((item) => (
    <Accordion.Item
      className={classes.item}
      value={item.value}
      key={item.value}
    >
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Perguntas frequentes sobre a Pensa
      </Title>

      <Accordion variant="separated">{items}</Accordion>
    </Container>
  );
}

