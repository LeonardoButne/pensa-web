import { Container, Title, Text, Paper, Box, ThemeIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import classes from "./MentalHealth.module.css";

export function MentalHealth() {
  return (
    <Box py={80} bg="white">
      <Container size="xl">
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <Title order={2} mb="md" fw={700}>
              Saúde mental
            </Title>
            <Text c="dimmed" size="md" lh={1.6}>
              Cuide da sua saúde mental da mesma forma que cuida do resto do seu
              corpo. A saúde mental é tão importante quanto a física. Encontre
              apoio, informação e orientação.
            </Text>
          </div>

          <Paper className={classes.iconWrapper} shadow="sm" radius="lg" p="xl">
            <ThemeIcon
              size={120}
              radius="md"
              variant="light"
              color="violet"
              className={classes.icon}
            >
              <IconLink size={60} stroke={1.5} />
            </ThemeIcon>
          </Paper>
        </div>
      </Container>
    </Box>
  );
}
