"use client"

import { User } from "@/types/user"

import { DraggableArea } from "./draggable-area"
import { KanbanNavbar } from "./navbar"

interface KanbanBoardProps {
  boardId: string
  user: User
}

export const KanbanBoard = ({ boardId, user }: KanbanBoardProps) => {
  return (
    <div>
      <KanbanNavbar boardId={boardId} user={user} />
      <DraggableArea />
    </div>
  )
}
