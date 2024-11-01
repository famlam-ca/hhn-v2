"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/trpc/react"
import { CreateCardSchema } from "@/validators/card"

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const router = useRouter()
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)

    const { mutate: createCard, isPending } = trpc.card.createCard.useMutation()

    const form = useForm<z.infer<typeof CreateCardSchema>>({
      resolver: zodResolver(CreateCardSchema),
      defaultValues: {
        listId,
        boardId: params.boardId as string,
        title: "",
      },
    })

    const isLoading = form.formState.isSubmitting || isPending

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing()
      }
    }

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        form.handleSubmit(onSubmit)()
      }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (values: z.infer<typeof CreateCardSchema>) => {
      createCard(values, {
        onSuccess: (returnedCard) => {
          toast.success(`Card "${returnedCard.title}" created`)
          form.reset()
          disableEditing()
          router.refresh()
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
      })
    }

    if (isEditing) {
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-1 space-y-4 px-1 py-0.5"
          >
            <FormField
              control={form.control}
              name="listId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boardId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      ref={ref}
                      onKeyDown={onTextareaKeyDown}
                      className="focus-visible:rint-0 resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <LoadingButton loading={isLoading} type="submit">
                Add card
              </LoadingButton>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                <X className="size-5" />
              </Button>
            </div>
          </form>
        </Form>
      )
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          size="sm"
          variant="ghost"
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        >
          <Plus className="mr-2 size-4" />
          Add a card
        </Button>
      </div>
    )
  },
)

CardForm.displayName = "CardForm"
