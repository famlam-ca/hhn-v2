import {
  FileCode,
  Gamepad2,
  Kanban,
  LayoutDashboard,
  LucideIcon,
  MessageSquareWarning,
} from "lucide-react"

type NavbarRouteProps = {
  icon: LucideIcon
  label: string
  href: string
  target?: string
}

export const NAVBAR_ROUTES: NavbarRouteProps[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Kanban,
    label: "Kanban",
    href: "/kanban",
  },
  {
    icon: MessageSquareWarning,
    label: "About",
    href: "/about",
  },
  {
    icon: Gamepad2,
    label: "Game Servers",
    href: "https://panel.famlam.ca",
    target: "_blank",
  },
  {
    icon: FileCode,
    label: "Documentation",
    href: "https://docs.famlam.ca",
    target: "_blank",
  },
]
