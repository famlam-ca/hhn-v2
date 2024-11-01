import { Board } from "@prisma/client"

import BoardOptions from "./board-options"
import BoardTitlteForm from "./board-title-form"

interface BoardNavbarProps {
  board: Board
}

export default async function BoardNavbar({ board }: BoardNavbarProps) {
  return (
    <div className="fixed top-16 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 backdrop-blur-lg">
      <BoardTitlteForm board={board} />
      <div className="ml-auto">
        <BoardOptions boardId={board.id} />
      </div>
    </div>
  )
}
