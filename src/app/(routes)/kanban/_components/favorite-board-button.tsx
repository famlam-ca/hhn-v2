import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

import { type Layout } from "./kanban-dashboard"

export const FavoriteBoardButton = ({
  boardFavorited,
  layout,
}: {
  boardFavorited: boolean
  layout?: Layout
}) => {
  return (
    <Star
      className={cn(
        "transition-all group-hover:scale-110",
        layout === "list" ? "size-6" : "size-4",
        {
          "fill-yellow-500 stroke-yellow-500 group-hover:fill-none dark:fill-yellow-400 dark:stroke-yellow-400":
            boardFavorited,
          "fill-none stroke-current group-hover:fill-yellow-500 group-hover:stroke-yellow-500 dark:group-hover:fill-yellow-400 dark:group-hover:stroke-yellow-400":
            !boardFavorited,
        },
      )}
    />
  )
}
