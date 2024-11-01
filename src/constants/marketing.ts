import { Rocket, Server } from "lucide-react"
import { CgTrello } from "react-icons/cg"

export const FEATURES = [
  {
    icon: CgTrello,
    title: "Kanban Boards",
    description:
      "Visualize your workflow and boost productivity with our intuitive Kanban boards.",
  },
  {
    icon: Server,
    title: "VPS Hosting (Coming in v3)",
    description:
      "Scalable and reliable VPS hosting for your applications and websites.",
  },
  {
    icon: Rocket,
    title: "Future Integrations",
    description:
      "We're constantly working on new features and integrations to enhance your experience.",
  },
]

export const PRODUCTS = [
  {
    icon: CgTrello,
    title: "Kanban Boards",
    description:
      "Visualize your workflow and boost productivity with our intuitive Kanban boards.",
    content: [
      "Customizable boards and columns",
      "Task assignments and due dates",
      "File attachments and comments",
      "Real-time collaboration",
    ],
  },
  {
    icon: Server,
    title: "VPS Hosting (Coming in v3)",
    description:
      "Scalable and reliable VPS hosting for your applications and websites.",
    content: [
      "High-performance servers",
      "Flexible resource allocation",
      "24/7 support",
      "Easy scaling options",
    ],
  },
]
