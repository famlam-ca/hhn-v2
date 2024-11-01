import { PLAN } from "@prisma/client"
import { Ghost, Plus, User } from "lucide-react"
import { redirect } from "next/navigation"

import { FormPopover } from "@/components/form/form-popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MAX_BASIC_BOARDS,
  MAX_FREE_BOARDS,
  MAX_PRO_BOARDS,
} from "@/constants/boards"
import { checkSubscription } from "@/lib/subscription"
import { getAvailableBoardCount } from "@/lib/user-limit"
import { api } from "@/trpc/server"

import { BoardCard } from "./board-card"
import { LayoutButtons } from "./layout-buttons"

interface BoardListProps {
  teamId: string
}

export async function BoardList({ teamId }: BoardListProps) {
  if (!teamId) {
    return redirect("/dashboard")
  }

  const boards = await api.board.getBoardsByTeamId({ teamId })

  const availableCount = await getAvailableBoardCount(teamId)
  const { plan } = await checkSubscription()

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-muted-foreground">
        <User className="mr-2 size-6" />
        <div className="-mt-1.5 flex flex-col font-semibold">
          <p className="text-lg">Your boards</p>
          <span className="text-xs">
            {plan === PLAN.PRO
              ? `${MAX_PRO_BOARDS - availableCount} boards remaining`
              : plan === PLAN.BASIC
                ? `${MAX_BASIC_BOARDS - availableCount} boards remaining`
                : `${MAX_FREE_BOARDS - availableCount} boards remaining`}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <LayoutButtons />
          {boards.length > 0 ? (
            <FormPopover align="center" side="bottom" sideOffset={18}>
              <Button size="icon">
                <Plus />
              </Button>
            </FormPopover>
          ) : null}
        </div>
      </div>
      {boards.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-y-6">
          <Ghost className="size-12 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Create a board to get started
          </p>
          <FormPopover align="center" side="bottom" sideOffset={18}>
            <Button size="lg" className="text-xl">
              <Plus style={{ width: "24px", height: "24px" }} />
              Create
            </Button>
          </FormPopover>
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board, index) => (
          <BoardCard key={board.id} index={index} board={board} />
        ))}
      </div>
    </div>
  )
}

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  )
}
