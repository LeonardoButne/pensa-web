import { useParams, Link } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Image,
  Box,
  Paper,
  Grid,
  Badge,
  Button,
  Group,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconFirstAidKit,
  IconShieldCheck,
  IconHelpCircle, // Novo ícone para Causas
} from "@tabler/icons-react";
import { useQuery } from "react-query";
// import { diseasesService } from "../../../services/diseases.service"; // Removido ou comentado temporariamente

// ===========================================
// 1. TIPAGEM E MOCK DOS DADOS
// ===========================================

interface DiseaseDetailData {
  id: number;
  name: string;
  description: string;
  category:
    | "INFECTIOUS_DISEASES"
    | "CHRONIC_DISEASES"
    | "CARDIOVASCULAR"
    | "MENTAL_HEALTH"
    | string;
  imageUrl: string;
  symptoms?: string;
  treatment?: string;
  prevention?: string;
  causes?: string; // Adicionado para Causas
  info?: string; // Adicionado para Outras Informações (O que é detalhado, etc.)
  isFeatured: boolean;
}

const MOCK_DISEASES_DETAILS: DiseaseDetailData[] = [
  {
    id: 1,
    name: "Aftas",
    description:
      "É uma pequena úlcera não muito profunda que pode ser bem dolorosas e incomodar o paciente na hora de ingerir alimentos, surge em diversos pontos da boca.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images-diseases/aftas.jpg",
    symptoms:
      "Dor intensa no local, que pode causar dificuldade para comer, falar, engolir, febre, sensação de mal-estar e em alguns casos, aumento das glândulas do pescoço.",
    treatment:
      "Afta passa naturalmente após alguns dias. Se sente muita dor na hora de comer é possível usar medicamentos e pomadas tópicas aplicadas sobre afta.",
    prevention: undefined,
    causes:
      "As aftas, surgem normalmente, como resultado de um sistema imunológico que está mais enfraquecido.",
    isFeatured: false,
  },
  {
    id: 2,
    name: "Alcoolismo",
    description:
      "O alcoolismo é uma condição caracterizada pelo uso compulsivo de bebidas alcoólicas, a pesar das consequências negativas para saúde, vida social, familiar e profissional da pessoa.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images-diseases/Alcoolismo.jpg",
    symptoms:
      "Forte vontade de consumir álcool, dificuldade em limitar a quantidade de álcool consumida, ansiedade, náuseas, tremores, irritabilidade quando a pessoa fica sem beber.",
    treatment:
      "Buscar ajuda de profissionais para um tratamento médico, psicológico e social contínuo de modo a que possa prevenir recaídas e reconstruir sua vida.",
    prevention:
      "Evitar consumo precoce e excessivo. Educação sobre riscos e falsos mitos (ex.: álcool alivia o stress). Limitar acesso a bebidas e promover alternativas de lazer sem álcool.",
    causes:
      "Factores biológicos e genéticos como a hereditariedade, factores psicológicos como traumas, ansiedade ou depressão. Factores sociais e Ambientais como a pressão social ou cultural e a falta de uma rede de apoio.",
    isFeatured: false,
  },
  {
    id: 3,
    name: "AVC",
    description:
      "Acidente Vascular Cerebral (AVC ou Derrame) ocorre quando há entupimento ou rompimento dos vasos que levam sangue ao cérebro provocando a paralisia da área.",
    category: "CARDIOVASCULAR",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Dor de cabeça, perda da força de 1 lado do corpo, alterações da visão, boca torta e sobrancelha caída, dificuldade de falar, perda de memória.",
    treatment:
      "Va logo ao Hospital: O tratamento e reabilitação de AVC varia dependendo da gravidade. Os menos graves podem não deixar sequelas. Os graves podem levar à morte.",
    prevention: undefined,
    causes:
      "Isquémico: entupimento dos vasos que levam sangue ao cérebro. Hemorrágico: rompimento do vaso provocando sangramento no cérebro.",
    isFeatured: false,
  },
  // Adicione os detalhes das outras doenças aqui, seguindo o padrão.
  // Para simplificar, vou manter apenas as 3 iniciais como exemplo detalhado.
];

// MOCK para simular diseasesService.getById
const mockDiseasesService = {
  getById: (id: number) => {
    const disease = MOCK_DISEASES_DETAILS.find((d) => d.id === id);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (disease) {
          resolve({ data: disease });
        } else {
          // Simula um erro ou não encontrado
          resolve({ data: undefined });
        }
      }, 500); // Simula delay de rede
    });
  },
};

// ===========================================
// 2. COMPONENTE ADAPTADO
// ===========================================

export function DiseaseDetail() {
  const { id } = useParams<{ id: string }>();

  // A tipagem do useQuery agora usa o tipo DiseaseDetailData
  const { data, isLoading, error } = useQuery(
    ["disease", id],
    // Substituindo diseasesService.getById pela função de mock
    () => mockDiseasesService.getById(Number(id)),
    {
      enabled: !!id,
    }
  );

  // O componente espera data.data ser DiseaseDetailData | undefined
  const diseaseData: DiseaseDetailData | undefined = (
    data as { data: DiseaseDetailData }
  )?.data;

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Verifica se não há dados ou se o mock retornou undefined
  if (!diseaseData) {
    return (
      <Container size="md" py={60}>
        <Center>
          <Box ta="center">
            <IconAlertCircle size={48} color="red" />
            <Title order={3} mt="md">
              Doença não encontrada
            </Title>
            <Button
              component={Link}
              to="/doencas"
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para doenças
            </Button>
          </Box>
        </Center>
      </Container>
    );
  }

  const disease = diseaseData;

  // Função auxiliar para formatar a categoria
  const formatCategory = (category: string) => {
    // Exemplo: 'CARDIOVASCULAR' -> 'Cardiovascular'
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box py={60}>
      <Container size="lg">
        <Button
          component={Link}
          to="/doencas"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          mb="xl"
        >
          Voltar para doenças
        </Button>

        <Paper shadow="sm" radius="lg" p="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Image
                src={disease.imageUrl || "/images/disease-placeholder.jpg"}
                alt={disease.name}
                radius="md"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%2300A0A0'/%3E%3C/svg%3E"
              />
              {disease.isFeatured && (
                <Badge color="cyan" size="lg" mt="md" fullWidth>
                  Em Destaque
                </Badge>
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title order={1} mb="md">
                {disease.name}
              </Title>

              {disease.category && (
                <Badge color="cyan" variant="light" size="lg" mb="lg">
                  {formatCategory(disease.category)}
                </Badge>
              )}

              <Text size="lg" c="dimmed" mb="xl">
                {disease.description}
              </Text>

              <Divider my="xl" />

              {/* Novo Bloco: Causas */}
              {disease.causes && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconHelpCircle
                      size={24}
                      color="var(--mantine-color-orange-6)"
                    />
                    <Title order={3}>Causas</Title>
                  </Group>
                  <Text>{disease.causes}</Text>
                </Box>
              )}
              {/* Fim do Novo Bloco: Causas */}

              {disease.symptoms && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconAlertCircle
                      size={24}
                      color="var(--mantine-color-red-6)"
                    />
                    <Title order={3}>Sintomas</Title>
                  </Group>
                  <Text>{disease.symptoms}</Text>
                </Box>
              )}

              {disease.treatment && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconFirstAidKit
                      size={24}
                      color="var(--mantine-color-blue-6)"
                    />
                    <Title order={3}>Tratamento</Title>
                  </Group>
                  <Text>{disease.treatment}</Text>
                </Box>
              )}

              {disease.prevention && (
                <Box>
                  <Group mb="md">
                    <IconShieldCheck
                      size={24}
                      color="var(--mantine-color-green-6)"
                    />
                    <Title order={3}>Prevenção</Title>
                  </Group>
                  <Text>{disease.prevention}</Text>
                </Box>
              )}
            </Grid.Col>
          </Grid>
        </Paper>

        {/* <Paper shadow="sm" radius="lg" p="xl" mt="xl" bg="cyan.0">
          <Title order={3} mb="md">
            Precisa de ajuda?
          </Title>
          <Text mb="lg">
            Se você está enfrentando sintomas relacionados a esta doença, é
            importante procurar ajuda médica profissional.
          </Text>
          <Group>
            <Button component={Link} to="/medicos" color="cyan" size="lg">
              Encontre um médico
            </Button>
            <Button
              component="a"
              href="tel:*660#"
              variant="outline"
              color="cyan"
              size="lg"
            >
              Ligue *660#
            </Button>
          </Group>
        </Paper> */}
      </Container>
    </Box>
  );
}

