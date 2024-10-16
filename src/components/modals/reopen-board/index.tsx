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

export const ReopenBoardModal = () => {
  const { isOpen, type, onClose, data } = useModal()

  const isModalOpen = isOpen && type === "reopen-board"
  const { boardId } = data

  const utils = trpc.useUtils()
  const reopenBoard = trpc.kanban.reopenBoard.useMutation()

  function handleReopen() {
    if (!boardId) return

    reopenBoard.mutate(boardId, {
      onSuccess: () => {
        toast.success("Board reopened!")
        onClose()
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.kanban.invalidate()
      },
    })
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Reopen board?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reopen this board? This will make the board
            visible to all members.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={reopenBoard.isPending}
              onClick={handleReopen}
              variant="destructive"
            >
              {reopenBoard.isPending ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin" />
                  Closing board...
                </span>
              ) : (
                "Reopen board"
              )}
            </Button>
            <Button variant="ghost" onClick={() => onClose()}>
              Cancel
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
