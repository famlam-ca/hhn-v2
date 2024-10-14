import { notFound, redirect } from "next/navigation"

import { validateSession } from "@/server/auth"
import { api, HydrateClient } from "@/trpc/server"
import { User } from "@/types/user"

import { KanbanBoard } from "./_components/board"

interface BoardPageProps {
  params: {
    boardId: string
  }
}

const BoardPage = async ({ params: { boardId } }: BoardPageProps) => {
  const { user } = await validateSession()
  if (!user) return redirect(`/signin?next=/kanban${boardId}`)
  if (!boardId || !user) return notFound()

  void api.kanban.getBoard.prefetch(boardId)

  return (
    <HydrateClient>
      <KanbanBoard boardId={boardId} user={user as User} />
    </HydrateClient>
  )
}

export default BoardPage
