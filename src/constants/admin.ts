import {
  BookOpen,
  Flag,
  HelpCircle,
  Lock,
  LucideIcon,
  Megaphone,
  MessageCircle,
  Send,
  Settings2,
  Users,
} from "lucide-react"

export type Route = {
  icon: LucideIcon
  label: string
  href: string
  isActive?: boolean
  items?: RouteItem[]
  badge?: string
}
export type RouteItem = {
  label: string
  href: string
}

export const PLATFORM_ROUTES: Route[] = [
  {
    icon: Settings2,
    label: "Settings",
    href: "/admin/settings",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
    isActive: true,
    items: [
      {
        label: "Users",
        href: "/admin/users",
      },
      {
        label: "Teams",
        href: "/admin/teams",
      },
      {
        label: "Sessions",
        href: "/admin/sessions",
      },
      {
        label: "Roles",
        href: "/admin/roles",
      },
    ],
  },
  {
    icon: Flag,
    label: "Features",
    href: "/admin/features",
  },
  {
    icon: Lock,
    label: "Limits",
    href: "/admin/limits",
  },
  {
    icon: BookOpen,
    label: "Documentation",
    href: "/admin/docs",
  },
]

export const SUPPORT_ROUTES: Route[] = [
  {
    icon: HelpCircle,
    label: "Support",
    href: "/admin/support",
  },
  {
    icon: Send,
    label: "Feedback",
    href: "/admin/feedback",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    href: "/admin/messages",
    badge: "12",
  },
]

export const MARKETING_ROUTES: Route[] = [
  {
    icon: Megaphone,
    label: "Campaigns",
    href: "/admin/marketing/campaigns",
  },
]
