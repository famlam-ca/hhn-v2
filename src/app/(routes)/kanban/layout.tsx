import { type Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Kanban",
    template: "%s | HHN Kanban",
  },
  description:
    "Organize your tasks with HHN Kanban, and start getting things done!",
}

const KanbanLayout = ({ children }: React.PropsWithChildren) => {
  return children
}

export default KanbanLayout
