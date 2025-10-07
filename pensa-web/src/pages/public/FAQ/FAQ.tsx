import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Accordion,
  TextInput,
  Select,
  Stack,
  Paper,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { faqService } from "../../../services/faq.service";

import { useDebouncedValue } from "@mantine/hooks";

const categories = [
  { value: "", label: "Todas as categorias" },
  { value: "GENERAL", label: "Geral" },
  { value: "DISEASES", label: "Doenças" },
  { value: "SERVICES", label: "Serviços" },
  { value: "DOCTORS", label: "Médicos" },
  { value: "APPOINTMENTS", label: "Consultas" },
  { value: "OTHER", label: "Outros" },
];

export function FAQ() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const { data: allFaqs } = useQuery("allFaqs", () => faqService.getAll());

  const { data: searchResults } = useQuery(
    ["faqSearch", debouncedSearch],
    () => faqService.search(debouncedSearch),
    {
      enabled: debouncedSearch.length > 2,
    }
  );

  const { data: categoryFaqs } = useQuery(
    ["faqCategory", category],
    () => faqService.getByCategory(category),
    {
      enabled: !!category,
    }
  );

  // Determinar qual lista de FAQs exibir
  let displayFaqs = allFaqs?.data || [];
  if (debouncedSearch.length > 2 && searchResults?.data) {
    displayFaqs = searchResults.data;
  } else if (category && categoryFaqs?.data) {
    displayFaqs = categoryFaqs.data;
  }

  const categoryGroups = displayFaqs.reduce((acc, faq) => {
    const cat = faq.category || "OTHER";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(faq);
    return acc;
  }, {} as Record<string, typeof displayFaqs>);

  return (
    <Box py={60}>
      <Container size="md">
        <Title order={1} ta="center" mb="md">
          Perguntas Frequentes
        </Title>
        <Text ta="center" c="dimmed" mb={40} size="lg">
          Encontre respostas para as perguntas mais comuns sobre o PENSA
        </Text>

        {/* Filtros */}
        <Paper shadow="sm" radius="lg" p="lg" mb={40}>
          <Stack gap="md">
            <TextInput
              placeholder="Pesquisar perguntas..."
              leftSection={<IconSearch size={16} />}
              size="lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              placeholder="Filtrar por categoria"
              data={categories}
              size="lg"
              value={category}
              onChange={(value) => setCategory(value || "")}
              clearable
            />
          </Stack>
        </Paper>

        {/* FAQs agrupadas por categoria */}
        {Object.entries(categoryGroups).map(([cat, faqs]) => (
          <Box key={cat} mb={40}>
            <Title order={3} mb="lg" c="cyan">
              {categories.find((c) => c.value === cat)?.label || "Outros"}
            </Title>
            <Accordion variant="separated" radius="md">
              {faqs.map((faq) => (
                <Accordion.Item key={faq.id} value={faq.id.toString()}>
                  <Accordion.Control>
                    <Text fw={500} size="lg">
                      {faq.question}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text c="dimmed" style={{ whiteSpace: "pre-line" }}>
                      {faq.answer}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        ))}

        {/* Sem resultados */}
        {displayFaqs.length === 0 && (
          <Paper shadow="sm" radius="lg" p="xl" ta="center">
            <Text size="lg" c="dimmed">
              {debouncedSearch.length > 2
                ? "Nenhuma pergunta encontrada com esses termos"
                : "Nenhuma pergunta disponível"}
            </Text>
          </Paper>
        )}

        {/* CTA */}
        <Paper shadow="sm" radius="lg" p="xl" mt={60} bg="cyan.0">
          <Title order={3} ta="center" mb="md">
            Não encontrou sua resposta?
          </Title>
          <Text ta="center" c="dimmed" mb="lg">
            Nossa equipe está pronta para ajudá-lo
          </Text>
          <Box ta="center">
            <Text size="lg" fw={600} c="cyan">
              Ligue para *660# ou entre em contato conosco
            </Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
