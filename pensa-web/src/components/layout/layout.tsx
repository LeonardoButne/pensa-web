import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

export function Layout() {
  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
}

