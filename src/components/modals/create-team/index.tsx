"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"
import { CreateTeamSchema } from "@/validators/team"

export const CreateTeamModal = () => {
  const router = useRouter()
  const { data, isOpen, onClose, onOpen, type } = useModal()

  const isModalOpen = isOpen && type === "create-team"
  const { fromCreateBoard } = data

  const utils = trpc.useUtils()
  const createTeam = trpc.team.createTeam.useMutation()

  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateTeamSchema>) {
    createTeam.mutate(values, {
      onSuccess: async () => {
        router.refresh()
        onClose()
        if (fromCreateBoard) {
          onOpen("create-board")
        }
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.team.invalidate()
        form.reset()
      },
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a New Team</DialogTitle>
          <DialogDescription>
            Create a new team to collaborate with others.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={createTeam.isPending}
                      placeholder="The Super Awesome Team"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex w-full items-center justify-between">
                <Button
                  type="button"
                  disabled={createTeam.isPending}
                  variant="outline"
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createTeam.isPending}>
                  {createTeam.isPending ? (
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="animate-spin" />
                      <p>Creating team</p>
                    </div>
                  ) : (
                    "Create team"
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
