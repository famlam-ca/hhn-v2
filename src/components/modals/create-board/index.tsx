"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { BOARD_VISIBILITY } from "@/constants/kanban"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"
import { CreateBoardSchema } from "@/validators/kanban"

export const CreateBoardModal = () => {
  const router = useRouter()
  const { isOpen, onClose, onOpen, type } = useModal()

  const isModalOpen = isOpen && type === "create-board"

  const utils = trpc.useUtils()
  const [teams] = trpc.team.getUserTeamsAsOwnerOrAdmin.useSuspenseQuery()
  const createBoard = trpc.kanban.createBoard.useMutation()

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
      visibility: "private",
      teamId: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateBoardSchema>) {
    createBoard.mutate(values, {
      onSuccess: (boardId) => {
        router.push(`/kanban/${boardId}`)
        onClose()
      },
      onError: (error) => {
        toast("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.kanban.invalidate()
        form.reset()
      },
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Board</DialogTitle>
          <DialogDescription>
            Start organizing your tasks by creating a new board.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="teamId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Team</FormLabel>
                    <Select
                      disabled={createBoard.isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams && teams.length > 0
                          ? teams.map((team) => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            ))
                          : "No teams found"}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Hint label="Create a team" asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onOpen("create-team", { fromCreateBoard: true })
                  }
                  className="mt-8 gap-1.5"
                >
                  <Plus className="size-4" />
                  <Users className="size-4" />
                </Button>
              </Hint>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={createBoard.isPending}
                      placeholder="What are you working on?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Board visibility</FormLabel>
                  <Select
                    disabled={createBoard.isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Who can view your board?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BOARD_VISIBILITY.map((visibility, i) => (
                        <SelectItem key={i} value={visibility.value}>
                          {visibility.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex w-full items-center justify-between">
                <Button
                  type="button"
                  disabled={createBoard.isPending}
                  variant="outline"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createBoard.isPending}>
                  {createBoard.isPending ? (
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="animate-spin" />
                      <p>Creating Board</p>
                    </div>
                  ) : (
                    "Create board"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
