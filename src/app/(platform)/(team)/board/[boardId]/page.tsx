import { notFound } from "next/navigation"

import { getSession } from "@/server/session"
import { api, HydrateClient } from "@/trpc/server"

import { ListContainer } from "./_components/list-container"

interface BoardIdPageProps {
  params: Promise<{
    boardId: string
  }>
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { boardId } = await params
  const { session } = await getSession()
  if (session === null || !boardId) {
    return notFound()
  }

  const lists = await api.list.getLists({ boardId })

  return (
    <div className="h-full overflow-x-auto p-4">
      <HydrateClient>
        <ListContainer boardId={boardId} lists={lists} />
      </HydrateClient>
    </div>
  )
}
