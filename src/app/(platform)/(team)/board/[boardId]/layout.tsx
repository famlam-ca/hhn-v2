import { notFound } from "next/navigation"

import { db } from "@/server/db"

import BoardNavbar from "./_components/board-navbar"

interface BoardIdLayoutProps {
  children: React.ReactNode
  params: Promise<{
    boardId: string
  }>
}

export default async function BoardIdLayout({
  children,
  params,
}: BoardIdLayoutProps) {
  const { boardId } = await params
  if (!boardId) {
    return notFound()
  }

  const board = await db.board.findUnique({
    where: { id: boardId },
  })
  if (!board) {
    return notFound()
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-cover bg-center bg-no-repeat"
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}
