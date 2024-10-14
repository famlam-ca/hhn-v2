import { type Metadata } from "next"

import { validateSession } from "@/server/auth"
import { api, HydrateClient } from "@/trpc/server"

import { KanbanDashboard } from "./_components/kanban-dashboard"

export const metadata: Metadata = {
  title: "Kanban Dashboard",
  description:
    "Manage your HHN Kanban boards, create new boards, and start organizing your tasks!",
}

const KanbanDashboardPage = async () => {
  const { user } = await validateSession()
  void api.kanban.getUserBoards()
  void api.team.getUserTeams()

  return (
    <HydrateClient>
      <KanbanDashboard displayName={user?.display_name as string} />
    </HydrateClient>
  )
}

export default KanbanDashboardPage
