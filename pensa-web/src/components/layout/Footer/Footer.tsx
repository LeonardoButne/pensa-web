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
      // Corrigindo o valor do 'href' para o telefone e e-mail
      { label: "Tel: +258 | 84x | 86x | 82x | 85x", href: "tel:+258" },
      {
        label: "E-mail: info@sourcecode.solutions",
        href: "mailto:info@sourcecode.solutions",
      },
    ],
  },
  {
    title: "Endereço",
    links: [
      { label: "Polana cimento" },
      {
        label: "Av. Ahmed Sekou Touré",
        href: "https://maps.app.goo.gl/EHvDJv5txzrLYKMA7",
      },
      { label: "Maputo, Moçambique", href: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor
        key={index} // Usar index aqui é aceitável, pois a ordem dos links é estática
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
      {/* Container Principal: Logo e Links. O layout horizontal/vertical é definido no CSS */}
      <Container size="xl" className={classes.inner}>
        <div className={classes.logo}>
          <Group gap="xs" mb="md">
            <Image src="/logo-pensa.png" alt="PENSA" h={100} w="auto" />
          </Group>
        </div>

        <div className={classes.groups}>{groups}</div>
      </Container>

      {/* Container Pós-Rodapé: Copyright e Sociais. O layout horizontal/vertical é definido no CSS */}
      <Container size="xl" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} SourceCode. Todos os direitos reservados.
        </Text>

        {/* ActionIcons ajustados para usar size="lg" e remover mb={10} */}
        <Group gap="xl" className={classes.social} justify="center">
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://tiktok.com/@pensa660"
            target="_blank"
          >
            <IconBrandTiktok size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://youtube.com"
            target="_blank"
          >
            <IconBrandYoutube size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://instagram.com/pensa.660"
            target="_blank"
          >
            <IconBrandInstagram size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="white"
            variant="subtle"
            component="a"
            href="https://www.facebook.com/pensa660?_rdc=1&_rdr"
            target="_blank"
          >
            <IconBrandFacebook size={24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

