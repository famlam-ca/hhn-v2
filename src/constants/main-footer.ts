import {
  Briefcase,
  FileCode,
  FileText,
  Globe,
  HelpCircle,
  LifeBuoy,
  LucideIcon,
  Mail,
  MessageSquareWarningIcon,
  Phone,
  User,
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IconType } from "react-icons/lib"

export type Route = {
  icon: LucideIcon | IconType
  label: string
  href: string
  target?: "_blank"
}

export const SOCIAL_ROUTES: Route[] = [
  {
    icon: FaGithub,
    label: "Github",
    href: "https://github.com/famlam-ca",
    target: "_blank",
  },
  {
    icon: FaLinkedin,
    label: "LinkedInIn",
    href: "https://www.linkedin.com/in/lasse-lammers-90a050234/",
    target: "_blank",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:lasse@famlam.ca",
  },
  {
    icon: Globe,
    label: "Website",
    href: "https://www.famlam.ca",
    target: "_blank",
  },
  {
    icon: User,
    label: "Portfolio",
    href: "https://lasse.famlam.ca",
    target: "_blank",
  },
]

export const COMPANY_ROUTES: Route[] = [
  {
    icon: MessageSquareWarningIcon,
    label: "About",
    href: "/about",
  },
  {
    icon: Briefcase,
    label: "Projects",
    href: "https://lasse.famlam.ca#projects",
    target: "_blank",
  },
  {
    icon: FileCode,
    label: "Source Code",
    href: "https://github.com/famlam-ca/hhn-v1",
    target: "_blank",
  },
]

export const HELP_ROUTES: Route[] = [
  {
    icon: FileText,
    label: "Docs",
    href: "https://docs.famlam.ca",
    target: "_blank",
  },
  {
    icon: HelpCircle,
    label: "FAQ",
    href: "#faq",
  },
  {
    icon: LifeBuoy,
    label: "Support",
    href: "https://app.famlam.ca/contact/support",
    target: "_blank",
  },
  {
    icon: Phone,
    label: "Contact",
    href: "https://lasse.famlam.ca#contact",
    target: "_blank",
  },
]
