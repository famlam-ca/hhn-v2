import { Github, Linkedin, User } from "lucide-react"

export const ROUTES = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "https://lasse.famlam.ca#projects",
    target: "_blank",
  },
  {
    label: "Docs",
    href: "https://docs.famlam.ca",
    target: "_blank",
  },
  {
    label: "Contact",
    href: "https://lasse.famlam.ca#contact",
    target: "_blank",
  },
  {
    label: "Support",
    href: "/support",
  },
]

export const SOCIALS = [
  {
    label: "Portfolio",
    href: "https://lasse.famlam.ca",
    icon: User,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lasse-lammers-90a050234/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/famlam-ca/hhn",
    icon: Github,
  },
]
