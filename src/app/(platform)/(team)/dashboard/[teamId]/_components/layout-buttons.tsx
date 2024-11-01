"use client"

import { LayoutGrid, LayoutList } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export type Layout = "grid" | "list"

export function LayoutButtons() {
  const [layout, setLayout] = useState<Layout>(
    (localStorage.getItem("board-layout") as Layout) || "grid",
  )

  const onClick = (layout: Layout) => {
    setLayout(layout)
    localStorage.setItem("board-layout", layout)
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => onClick("grid")}
        size="icon"
        variant={layout === "grid" ? "secondary" : "ghost"}
      >
        <LayoutGrid />
      </Button>
      <Button
        onClick={() => onClick("list")}
        size="icon"
        variant={layout === "list" ? "secondary" : "ghost"}
      >
        <LayoutList />
      </Button>
    </div>
  )
}
