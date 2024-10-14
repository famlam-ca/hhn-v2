"use client"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"

export const CloseBoardModal = () => {
  const { isOpen, onOpen, type, onClose, data } = useModal()

  const isModalOpen = isOpen && type === "close-board"
  const { boardId } = data

  const utils = trpc.useUtils()
  const closeBoard = trpc.kanban.closeBoard.useMutation()

  function handleClose() {
    if (!boardId) return

    closeBoard.mutate(boardId, {
      onSuccess: () => {
        toast.success("Board closed")
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: () => {
        utils.kanban.invalidate()
        onClose()
      },
    })
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={() => onOpen("close-board")}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Close board?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to close this board? You can always reopen it
            later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={closeBoard.isPending}
              onClick={handleClose}
              variant="destructive"
            >
              {closeBoard.isPending ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin" />
                  Closing board...
                </span>
              ) : (
                "Close board"
              )}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
