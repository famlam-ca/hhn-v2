"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Board } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { trpc } from "@/trpc/react"
import { UpdateBoardTitleSchema } from "@/validators/board"

interface BoardTitlteFormProps {
  board: Board
}

export default function BoardTitlteForm({ board }: BoardTitlteFormProps) {
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(board.title)

  const { mutate: updateBoardTitle, isPending } =
    trpc.board.updateBoardTitle.useMutation()

  const form = useForm<z.infer<typeof UpdateBoardTitleSchema>>({
    resolver: zodResolver(UpdateBoardTitleSchema),
    defaultValues: {
      boardId: board.id,
      title: title,
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = (values: z.infer<typeof UpdateBoardTitleSchema>) => {
    setTitle(values.title)

    updateBoardTitle(values, {
      onSuccess: (board) => {
        toast.success(`Board ${board.title} updated`)
        setTitle(board.title)
        disableEditing()
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-x-2"
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    ref={inputRef}
                    onBlur={onBlur}
                    className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  return (
    <LoadingButton
      loading={isLoading}
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </LoadingButton>
  )
}
