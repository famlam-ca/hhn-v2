"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { FormPicker } from "@/components/form/form-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { useProModal } from "@/hooks/use-pro-modal"
import { useTeamModal } from "@/hooks/use-team-modal"
import { trpc } from "@/trpc/react"
import { CreateTeamSchema } from "@/validators/team"

export function CreateTeamModal() {
  const router = useRouter()
  const teamModal = useTeamModal()
  const proModal = useProModal()

  const utils = trpc.useUtils()
  const { mutate: createTeam, isPending } = trpc.team.createTeam.useMutation()

  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const onSubmit = (values: z.infer<typeof CreateTeamSchema>) => {
    createTeam(values, {
      onSuccess: async (team) => {
        toast.success(`Team ${team.title} created successfully`)
        await utils.team.getUserTeams.invalidate()
        router.push(`/dashboard/${team.id}`)
        teamModal.onClose()
        form.reset()
      },
      onError: (error) => {
        if (error.data?.code === "FORBIDDEN") {
          proModal.onOpen()
        } else {
          toast.error("Oops!", {
            description: error.message,
          })
        }
      },
    })
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input focus-visible:ring-primary",
  }

  return (
    <Dialog open={teamModal.isOpen} onOpenChange={teamModal.onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to collaborate with others.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormPicker {...form} />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      autoFocus
                      type="text"
                      label="Workspace name"
                      className={styles.input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton loading={isLoading} type="submit" className="w-full">
              Create workspace
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
