"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
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
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"

const FormSchema = z.object({
  description: z.string().max(500),
})

export const AboutBoardModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal()

  const isModalOpen = isOpen && type === "about-board"
  const { boardId, initDescription } = data

  const utils = trpc.useUtils()
  const updateBoardDescription =
    trpc.kanban.updateBoardDescription.useMutation()

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isResetting, setIsResetting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: initDescription || "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!boardId) return
    if (values.description === "")
      return toast.warning("Please provide a description")

    setIsSaving(true)
    updateBoardDescription.mutate(
      { boardId, description: values.description },
      {
        onSuccess: (data) => {
          toast.success("Board description updated successfully")
          form.setValue("description", data.description ?? "")
          onClose()
        },
        onError: (error) => {
          if (error.data?.code === "BAD_REQUEST") {
            toast.warning("Oops!", {
              description: error.message,
            })
          } else {
            toast.error("Oops!", {
              description: error.message,
            })
          }
        },
        onSettled: () => {
          setIsSaving(false)
          utils.kanban.invalidate()
          form.reset()
        },
      },
    )
  }

  function handleReset() {
    if (!boardId) return

    setIsResetting(true)
    updateBoardDescription.mutate(
      { boardId, description: null },
      {
        onSuccess: () => {
          form.setValue("description", "")
        },
        onError: (error) => {
          if (error.data?.code === "BAD_REQUEST") {
            toast.warning("Oops!", {
              description: error.message,
            })
          } else {
            toast.error("Oops!", {
              description: error.message,
            })
          }
        },
        onSettled: () => {
          setIsResetting(false)
          utils.kanban.invalidate()
          form.reset()
        },
      },
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onOpen("about-board")}>
      <DialogContent className="max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>About this board</DialogTitle>
              <DialogDescription>
                Add a description to your board to give context to your team
                members and collaborators.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSaving}
                      placeholder="Your board description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex sm:justify-between">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="link"
                  className="text-alert"
                >
                  {isResetting ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="animate-spin" />
                      Reseting...
                    </span>
                  ) : (
                    "Reset"
                  )}
                </Button>

                <Button type="submit" variant="primary">
                  {isSaving ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save"
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
