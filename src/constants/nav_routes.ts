type NavbarRouteProps = {
  label: string
  href: string
  target?: string
}

export const NAVBAR_ROUTES: NavbarRouteProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Kanban",
    href: "/kanban",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Game Servers",
    href: "https://panel.famlam.ca",
    target: "_blank",
  },
  {
    label: "Docs",
    href: "https://docs.famlam.ca",
    target: "_blank",
  },
]
