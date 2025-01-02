"use client"

import { MoreHorizontal, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { trpc } from "@/trpc/react"
import { DeleteBoardSchema } from "@/validators/board"

interface BoardOptionsProps {
  boardId: string
}

export default function BoardOptions({ boardId }: BoardOptionsProps) {
  const router = useRouter()

  const { mutate: deleteBoard, isPending } =
    trpc.board.deleteBoard.useMutation()

  const onDelete = (values: z.infer<typeof DeleteBoardSchema>) => {
    deleteBoard(values, {
      onSuccess: (board) => {
        router.push(`/dashboard/${board?.teamId}`)
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto p-2">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <LoadingButton
          loading={isPending}
          onClick={() => onDelete({ boardId })}
          variant="ghost"
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-alert-foreground"
        >
          <Trash2 /> Delete this board
        </LoadingButton>
      </PopoverContent>
    </Popover>
  )
}
