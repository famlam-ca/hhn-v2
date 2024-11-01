import {
  CreditCard,
  FileCode,
  LayoutDashboard,
  LucideIcon,
  MessageSquareWarningIcon,
} from "lucide-react"

export type Route = {
  icon: LucideIcon
  label: string
  href: string
  target?: "_blank"
}

export const ROUTES: Route[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: CreditCard,
    label: "Pricing",
    href: "/pricing",
  },
  {
    icon: MessageSquareWarningIcon,
    label: "About",
    href: "/about",
  },
  {
    icon: FileCode,
    label: "Documentation",
    href: "https://docs.famlam.ca",
    target: "_blank",
  },
]
