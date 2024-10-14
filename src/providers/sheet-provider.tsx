"use client"

import { BoardOptionsSheet } from "@/components/sheets/board-options"
import { useMounted } from "@/hooks/use-mounted"
import { useSheet } from "@/store/useSheet"

export const SheetProvider = () => {
  const { type } = useSheet()
  const { mounted } = useMounted()

  if (!mounted) return null

  return <>{type === "board-options" ? <BoardOptionsSheet /> : null}</>
}
