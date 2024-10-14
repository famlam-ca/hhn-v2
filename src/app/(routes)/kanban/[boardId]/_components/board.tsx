"use client"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { trpc } from "@/trpc/react"
import { User } from "@/types/user"

import { DraggableArea } from "./draggable-area"
import { KanbanNavbar } from "./navbar"

interface KanbanBoardProps {
  boardId: string
  user: User
}

export const KanbanBoard = ({ boardId, user }: KanbanBoardProps) => {
  const [board] = trpc.kanban.getBoard.useSuspenseQuery(boardId)

  return (
    <>
      <KanbanNavbar board={board} user={user} />

      <MaxWidthWrapper className="mt-16 max-w-full">
        <DraggableArea />
      </MaxWidthWrapper>
    </>
  )
}
