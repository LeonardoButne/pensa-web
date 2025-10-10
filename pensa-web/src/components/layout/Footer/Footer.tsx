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
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const data = [
  {
    title: "Contactos",
    links: [
      { label: "Tel: 260 | 84x | 86x | 82x | 85x", href: "tel:260" },
      {
        label: "E-mail: geral@pensa.com.mz",
        href: "mailto:geral@pensa.com.mz",
      },
    ],
  },
  {
    title: "Endereço",
    links: [
      { label: "Praça Samora M. Machel, 217", href: "#" },
      { label: "Av. Eduardo Mondlane", href: "#" },
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
            <Image src="/logo-pensa.png" alt="PENSA" h={120} w="auto" />
          </Group>
        </div>

        <div className={classes.groups}>{groups}</div>
      </Container>

      <Container size="xl" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} PENSA. Todos os direitos reservados.
        </Text>

        <Group gap="xs" className={classes.social}>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://twitter.com"
            target="_blank"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://youtube.com"
            target="_blank"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://instagram.com/pensa.660"
            target="_blank"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://www.facebook.com/pensa660?_rdc=1&_rdr"
            target="_blank"
          >
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

