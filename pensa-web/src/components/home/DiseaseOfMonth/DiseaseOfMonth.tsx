import {
  Container,
  Title,
  Text,
  Button,
  Box,
  Image,
  Paper,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { diseasesService } from "../../../services/diseases.service";

import classes from "./DiseaseOfMonth.module.css";

export function DiseaseOfMonth() {
  const { data: disease, isLoading } = useQuery(
    "featuredDiseaseMonth",
    () => diseasesService.getFeaturedOfMonth(),
    {
      retry: 1,
    }
  );

  if (isLoading || !disease) {
    return null;
  }

  return (
    <Box py={80} bg="gray.0">
      <Container size="xl">
        <Title order={2} ta="center" mb={60} fw={700}>
          Doença do mês
        </Title>

        <Paper shadow="md" radius="lg" className={classes.card}>
          <div className={classes.inner}>
            <div className={classes.imageSection}>
              <Image
                src={disease.imageUrl || "/images/disease-placeholder.jpg"}
                alt={disease.name}
                className={classes.image}
                height={300}
                fit="cover"
                radius="md"
              />
            </div>

            <div className={classes.content}>
              <Title order={3} mb="md" fw={700}>
                {disease.name}
              </Title>
              <Text c="dimmed" lineClamp={4} mb="lg">
                {disease.description}
              </Text>

              <Button
                variant="outline"
                color="cyan"
                rightSection={<IconArrowRight size={16} />}
                component="a"
                href={`/doencas/${disease.id}`}
              >
                Ver mais
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}

