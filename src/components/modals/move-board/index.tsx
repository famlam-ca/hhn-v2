"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"

const FormSchema = z.object({
  teamId: z.string(),
})

export const MoveBoardModal = () => {
  const { data, isOpen, onClose, type } = useModal()

  const isModalOpen = isOpen && type === "move-board"
  const { board } = data

  const utils = trpc.useUtils()
  const [teams] = trpc.team.getUserTeamsAsOwnerOrAdmin.useSuspenseQuery()
  const moveBoard = trpc.kanban.moveBoard.useMutation()

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<string>("")

  useEffect(() => {
    setIsConfirmed(confirm.toLowerCase() === "confirm")
  }, [setIsConfirmed, confirm])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teamId: "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!board?.id) return
    if (!isConfirmed) {
      return toast.error("Please type 'confirm' to confirm the action")
    }
    if (board?.team.id === values.teamId) {
      return toast.warning("Board is already in this team")
    }

    moveBoard.mutate(
      { boardId: board?.id, teamId: values.teamId },
      {
        onSuccess: (data) => {
          toast.success(`Board moved to ${data.team.name}`)
          onClose()
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: async () => {
          await utils.kanban.invalidate()
          await utils.team.invalidate()
        },
      },
    )
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move board?</AlertDialogTitle>
          <AlertDialogDescription>
            Move this board to a different team.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teamId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select
                    disabled={moveBoard.isPending}
                    onValueChange={field.onChange}
                    defaultValue={board?.team.id}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a team to move this board to." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teams && teams.length > 0 ? (
                        teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}{" "}
                            {team.id === board?.team.id ? (
                              <span className="text-muted-foreground">
                                (Current team)
                              </span>
                            ) : null}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="No teams found">
                          No teams found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Input
              type="text"
              disabled={moveBoard.isPending}
              placeholder="Type 'Confirm' to confirm"
              onChange={(e) => setConfirm(e.target.value)}
            />

            <AlertDialogFooter>
              <div className="flex w-full items-center justify-between">
                <Button
                  type="submit"
                  disabled={moveBoard.isPending || !isConfirmed}
                  variant="destructive"
                >
                  {moveBoard.isPending ? (
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="animate-spin" />
                      <p>Moving Board</p>
                    </div>
                  ) : (
                    "Move board"
                  )}
                </Button>
                <Button
                  type="button"
                  disabled={moveBoard.isPending}
                  variant="ghost"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
