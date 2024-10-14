"use client"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { User } from "@/types/user"

import { DraggableArea } from "./draggable-area"
import { KanbanNavbar } from "./navbar"

interface KanbanBoardProps {
  boardId: string
  user: User
}

export const KanbanBoard = ({ boardId, user }: KanbanBoardProps) => {
  return (
    <>
      <KanbanNavbar boardId={boardId} user={user} />

      <MaxWidthWrapper className="mt-16 max-w-full">
        <DraggableArea />
      </MaxWidthWrapper>
    </>
  )
}
