"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlignLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/trpc/react"
import { Card } from "@/types"
import { UpdateCardDescriptionSchema } from "@/validators/card"

interface DescriptionProps {
  card: Card
}

export function Description({ card }: DescriptionProps) {
  const boardId = useParams().boardId as string

  const textareaRef = useRef<ElementRef<"textarea">>(null)
  const formRef = useRef<ElementRef<"form">>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [description, setDescription] = useState<string>(card.description ?? "")

  const utils = trpc.useUtils()
  const { mutate: updateCardDescription, isPending } =
    trpc.card.updateCardDescription.useMutation()

  const form = useForm<z.infer<typeof UpdateCardDescriptionSchema>>({
    resolver: zodResolver(UpdateCardDescriptionSchema),
    defaultValues: {
      boardId: boardId,
      cardId: card.id,
      description: description,
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing()
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (values: z.infer<typeof UpdateCardDescriptionSchema>) => {
    if (description === values.description) return

    updateCardDescription(values, {
      onSuccess: async (description) => {
        setDescription(description)
        await utils.card.getCardById.invalidate({
          cardId: card.id,
        })
        disableEditing()
      },
    })
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 size-5 text-muted-foreground" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-muted-foreground">Description</p>
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={formRef}
              className="space-y-2"
            >
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
                name="cardId"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormControl>{field.value}</FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        ref={textareaRef}
                        placeholder="Add a more detailed description..."
                        className="mt-2 w-full resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <LoadingButton loading={isLoading} type="submit">
                  Save
                </LoadingButton>
                <Button
                  type="button"
                  onClick={disableEditing}
                  size="sm"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] whitespace-pre-wrap rounded-md bg-background px-3.5 py-3 text-sm font-medium"
          >
            {description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24" />
        <Skeleton className="h-[78px] w-full" />
      </div>
    </div>
  )
}
