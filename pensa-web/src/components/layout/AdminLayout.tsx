import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDashboard,
  IconVirus,
  IconStethoscope,
  IconMessage,
  IconSettings,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "../../store/authStore";

export function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navLinks = [
    { icon: IconDashboard, label: "Dashboard", to: "/admin/dashboard" },
    { icon: IconVirus, label: "Doenças", to: "/admin/doencas" },
    { icon: IconStethoscope, label: "Médicos", to: "/admin/medicos" },
    { icon: IconMessage, label: "Mensagens", to: "/admin/mensagens" },
    { icon: IconSettings, label: "Configurações", to: "/admin/configuracoes" },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="xl" fw={700} c="cyan">
              PENSA Admin
            </Text>
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Group style={{ cursor: "pointer" }}>
                <Avatar color="cyan" radius="xl">
                  {user?.username?.[0].toUpperCase()}
                </Avatar>
                <Text size="sm" fw={500}>
                  {user?.username}
                </Text>
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Conta</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Perfil
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Configurações
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handleLogout}
              >
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            component={Link}
            to={link.to}
            label={link.label}
            leftSection={<link.icon size="1.2rem" stroke={1.5} />}
            mb="xs"
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

