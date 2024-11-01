"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Layout } from "lucide-react"
import { useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from "@/trpc/react"
import { Card } from "@/types"
import { UpdateCardTitleSchema } from "@/validators/card"

interface HeaderProps {
  card: Card
}

export function Header({ card }: HeaderProps) {
  const router = useRouter()
  const inputRef = useRef<ElementRef<"input">>(null)

  const [title, setTitle] = useState<string>(card.title)

  const utils = trpc.useUtils()
  const { mutate: updateCardTitle, isPending } =
    trpc.card.updateCardTitle.useMutation()

  const form = useForm<z.infer<typeof UpdateCardTitleSchema>>({
    resolver: zodResolver(UpdateCardTitleSchema),
    defaultValues: {
      boardId: card.list.boardId,
      cardId: card.id,
      title: title,
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (values: z.infer<typeof UpdateCardTitleSchema>) => {
    if (title === values.title) return

    updateCardTitle(values, {
      onSuccess: async (title) => {
        setTitle(title)
        await utils.card.getCardById.invalidate({
          cardId: card.id,
        })
        router.refresh()
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout
        style={{ width: "24px", height: "24px" }}
        className="mt-2 text-muted-foreground"
      />
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      ref={inputRef}
                      disabled={isLoading}
                      onBlur={onBlur}
                      name="Card title"
                      className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold focus-visible:border-input focus-visible:bg-background"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-background" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-background" />
        <Skeleton className="h-4 w-12 bg-background" />
      </div>
    </div>
  )
}
