import { notFound } from "next/navigation"

import { api, HydrateClient } from "@/trpc/server"

import { Settings } from "./_components/settings"

interface BoardSettingsPageProps {
  params: {
    boardId: string
  }
}

const BoardSettingsPage = async ({
  params: { boardId },
}: BoardSettingsPageProps) => {
  if (!boardId) return notFound()
  void api.kanban.getBoard.prefetch(boardId)
  void api.kanban.getCurrentMember.prefetch(boardId)

  return (
    <HydrateClient>
      <Settings boardId={boardId} />
    </HydrateClient>
  )
}

export default BoardSettingsPage
