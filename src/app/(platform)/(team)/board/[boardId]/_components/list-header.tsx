"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { trpc } from "@/trpc/react"
import { List } from "@/types"
import { UpdateListSchema } from "@/validators/list"

import ListOptions from "./list-options"

interface ListHeaderProps {
  list: List
  onAddCard: () => void
}

export default function ListHeader({ list, onAddCard }: ListHeaderProps) {
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const [title, setTitle] = useState<string>(list.title)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { mutate: updateList } = trpc.list.updateList.useMutation()

  const form = useForm<z.infer<typeof UpdateListSchema>>({
    resolver: zodResolver(UpdateListSchema),
    defaultValues: {
      boardId: list.boardId,
      listId: list.id,
      title: title,
    },
  })

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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit()
    }
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  useEventListener("keydown", onKeyDown)

  const onSubmit = (values: z.infer<typeof UpdateListSchema>) => {
    if (values.title === list.title) {
      return disableEditing()
    }

    setTitle(values.title)

    updateList(values, {
      onSuccess: (list) => {
        toast.success(`List "${list.title}" updated`)
        setTitle(list.title)
        disableEditing()
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })
  }

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="flex-1 px-0.5"
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
                    <Input
                      {...field}
                      ref={inputRef}
                      onBlur={onBlur}
                      placeholder="Enter list title..."
                      className="h-7 truncate border-t-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" hidden />
          </form>
        </Form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}
      <ListOptions list={list} onAddCard={onAddCard} />
    </div>
  )
}
