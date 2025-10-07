import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Image,
} from "@mantine/core";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import classes from "./Hero.module.css";

export function Hero() {
  const handleUSSDCall = () => {
    window.location.href = "tel:*660#";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/258878727900", "_blank");
  };

  return (
    <Box className={classes.hero}>
      <Container size="xl">
        <div className={classes.inner}>
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
                Assinar newsletter
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

          <div className={classes.image}>
            <Image
              src="images-hero/hero-phone.png"
              alt="Smartphone com app *660#"
              className={classes.heroImage}
              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23E5E7EB'/%3E%3C/svg%3E"
            />
          </div>
        </div>
      </Container>
    </Box>
  );
}

