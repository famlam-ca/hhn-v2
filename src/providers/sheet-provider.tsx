"use client"

import { useMounted } from "@/hooks/use-mounted"
import { useSheet } from "@/store/useSheet"

import { BoardOptionsSheet } from "@/components/sheets/board-options"
import { MainNavSheet } from "@/components/sheets/main-nav"

export const SheetProvider = () => {
  const { type } = useSheet()
  const { mounted } = useMounted()

  if (!mounted) return null

  return (
    <>
      {type === "board-options" ? <BoardOptionsSheet /> : null}
      {type === "main-nav" ? <MainNavSheet /> : null}
    </>
  )
}
