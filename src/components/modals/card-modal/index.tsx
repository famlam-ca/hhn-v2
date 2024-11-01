"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { trpc } from "@/trpc/react"

import { Actions } from "./actions"
import Activity from "./activity"
import { Description } from "./description"
import { Header } from "./header"

export function CardModal() {
  const id = useCardModal((state) => state.id)
  const isOpen = useCardModal((state) => state.isOpen)
  const onClose = useCardModal((state) => state.onClose)

  const { data: card, isLoading } = trpc.card.getCardById.useQuery(
    { cardId: id ?? "" },
    {
      enabled: !!id,
    },
  )
  const { data: auditLogs, isLoading: auditLogsLoading } =
    trpc.auditLogs.getAuditLogsByCardId.useQuery(
      { cardId: id ?? "", teamId: card?.list.board.teamId ?? "" },
      {
        enabled: !!id,
      },
    )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!card || isLoading ? <Header.Skeleton /> : <Header card={card} />}
          </DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!card || isLoading ? (
                <Description.Skeleton />
              ) : (
                <Description card={card} />
              )}
              {!auditLogs || auditLogsLoading ? (
                <Activity.Skeleton />
              ) : (
                <Activity auditLogs={auditLogs} />
              )}
            </div>
          </div>
          {!card || isLoading ? <Actions.Skeleton /> : <Actions card={card} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
