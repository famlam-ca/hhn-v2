"use client"

import { Copy, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { LoadingButton } from "@/components/ui/loading-button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCardModal } from "@/hooks/use-card-modal"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/react"
import { Card } from "@/types"

interface ActionsProps {
  card: Card
}

export function Actions({ card }: ActionsProps) {
  const params = useParams()
  const router = useRouter()
  const cardModal = useCardModal()

  const utils = trpc.useUtils()
  const { mutate: copyCard, isPending: copyCardPending } =
    trpc.card.copyCard.useMutation()
  const { mutate: deleteCard, isPending: deleteCardPending } =
    trpc.card.deleteCard.useMutation()

  const onCopy = () => {
    const boardId = params.boardId as string

    copyCard(
      { boardId, cardId: card.id },
      {
        onSuccess: async (card) => {
          toast.success(`${card?.title} copied`)
          await utils.list.getLists.invalidate({
            boardId,
          })
          cardModal.onClose()
          router.refresh()
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
      },
    )
  }

  const onDelete = () => {
    const boardId = params.boardId as string

    deleteCard(
      { boardId, cardId: card.id },
      {
        onSuccess: async (card) => {
          toast.success(`${card?.title} deleted`)
          await utils.list.getLists.invalidate({
            boardId,
          })
          cardModal.onClose()
          router.refresh()
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
      },
    )
  }

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <LoadingButton
        loading={copyCardPending}
        onClick={onCopy}
        size="inline"
        variant="gray"
        className="w-full justify-start"
      >
        <Copy
          className={cn("mr-2 size-4", {
            hidden: copyCardPending,
          })}
        />
        Copy
      </LoadingButton>
      <LoadingButton
        loading={deleteCardPending}
        onClick={onDelete}
        size="inline"
        variant="gray"
        className="w-full justify-start text-rose-500 hover:text-current"
      >
        <Trash2
          className={cn("mr-2 size-4", {
            hidden: deleteCardPending,
          })}
        />
        Delete
      </LoadingButton>
    </div>
  )
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}
