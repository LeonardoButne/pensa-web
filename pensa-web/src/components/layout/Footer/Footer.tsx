import {
  Container,
  Group,
  Text,
  ActionIcon,
  Stack,
  Image,
  Anchor,
} from "@mantine/core";
import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTiktok,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const data = [
  {
    title: "Contactos",
    links: [
      { label: "Tel: 260 | 84x | 86x | 82x | 85x", href: "tel:260" },
      {
        label: "E-mail: info@sourcecode.solutions",
        href: "info@sourcecode.solutions",
      },
    ],
  },
  {
    title: "Endereço",
    links: [
      // { label: "Praça Samora M. Machel, 217", href: "#" },
      { label: "Av. Ahmed Sekou Touré", href: "#" },
      { label: "Maputo, Moçambique", href: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor
        key={index}
        c="dimmed"
        href={link.href}
        size="sm"
        className={classes.link}
      >
        {link.label}
      </Anchor>
    ));

    return (
      <div key={group.title} className={classes.wrapper}>
        <Text className={classes.title}>{group.title}</Text>
        <Stack gap="xs">{links}</Stack>
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="xl" className={classes.inner}>
        <div className={classes.logo}>
          <Group gap="xs" mb="md">
            <Image src="/logo-pensa.png" alt="PENSA" h={100} w="auto" />
          </Group>
        </div>

        <div className={classes.groups}>{groups}</div>
      </Container>

      <Container size="xl" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} SourceCode. Todos os direitos reservados.
        </Text>

        <Group gap="xl" className={classes.social} mb={10} justify="center">
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://tiktok.com/@pensa660"
            target="_blank"
          >
            <IconBrandTiktok size={200} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://youtube.com"
            target="_blank"
          >
            <IconBrandYoutube size={200} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://instagram.com/pensa.660"
            target="_blank"
          >
            <IconBrandInstagram size={200} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://www.facebook.com/pensa660?_rdc=1&_rdr"
            target="_blank"
          >
            <IconBrandFacebook size={200} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

