"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useSession } from "@/providers/session-provider"
import { useSheet } from "@/store/useSheet"

import { BoardOptions } from "./_components/sheet"

export const BoardOptionsSheet = () => {
  const { user } = useSession()
  const { data, isOpen, onClose, type } = useSheet()

  const isSheetOpen = isOpen && type === "board-options"
  const { boardId } = data
  if (!boardId || !user) return null

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <BoardOptions boardId={boardId} user={user} />
      </SheetContent>
    </Sheet>
  )
}
