"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { Input } from "@/components/ui/input"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"

export const DeleteBoardModal = () => {
  const router = useRouter()
  const { isOpen, onOpen, type, onClose, data } = useModal()

  const isModalOpen = isOpen && type === "delete-board"
  const { boardId } = data

  const utils = trpc.useUtils()
  const deleteBoard = trpc.kanban.deleteBoard.useMutation()

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<string>("")

  useEffect(() => {
    setIsConfirmed(confirm.toLowerCase() === "confirm")
  }, [setIsConfirmed, confirm])

  function handleDelete() {
    if (!boardId) return

    deleteBoard.mutate(boardId, {
      onSuccess: () => {
        toast.success("Board deleted")
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.kanban.invalidate()
        router.push("/kanban")
        onClose()
      },
    })
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={() => onOpen("delete-board")}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete board?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this board? This action is
            irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          type="text"
          disabled={deleteBoard.isPending}
          placeholder="Type 'Confirm' to confirm"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <AlertDialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={!isConfirmed}
              onClick={handleDelete}
              variant="destructive"
            >
              {deleteBoard.isPending ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin" />
                  Deleting board...
                </span>
              ) : (
                "Delete board"
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
