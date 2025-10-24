import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Text,
  Box,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: "Início" },
  { link: "/doencas", label: "Doenças" },
  { link: "/primeiros-socoros", label: "Primeiros socorros" },
  { link: "/mae-e-bebe", label: "Mãe e bebê" },
  { link: "/centros-de-saude", label: "Unidades sanitárias" },
  { link: "/sobre", label: "Sobre nós" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  return (
    <Box component="header" className={classes.header}>
      <Container size="xl">
        <Group justify="space-between" h={70}>
          {/* Logo */}
          <Link to="/" className={classes.logo}>
            <Group gap="xs">
              <Image
                src="/images-header/logo.png"
                alt="PENSA Logo"
                h={70}
                w="auto"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%2300A0A0'/%3E%3C/svg%3E"
              />
              <Text fw={700} size="30px" c="black">
                PENSA
              </Text>
            </Group>
          </Link>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="md">
            {links.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={classes.link}
                data-active={location.pathname === item.link || undefined}
              >
                {item.label}
              </Link>
            ))}
          </Group>

          {/* Mobile Burger */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={
          <Group gap="xs">
            <Image src="/logo.svg" alt="PENSA" h={32} w="auto" />
            <Text fw={700} size="lg" c="cyan.6">
              PENSA
            </Text>
          </Group>
        }
        hiddenFrom="md"
        zIndex={1000000}
      >
        <Stack gap="md" pt="xl">
          {links.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={classes.mobileLink}
              onClick={close}
              data-active={location.pathname === item.link || undefined}
            >
              {item.label}
            </Link>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}

