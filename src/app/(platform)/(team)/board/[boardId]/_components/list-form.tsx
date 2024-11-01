"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { trpc } from "@/trpc/react"
import { CreateListSchema } from "@/validators/list"

import { ListWrapper } from "./list-wrapper"

export function ListForm() {
  const router = useRouter()
  const boardId = useParams().boardId

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { mutate: createList, isPending } = trpc.list.createList.useMutation()

  const form = useForm<z.infer<typeof CreateListSchema>>({
    resolver: zodResolver(CreateListSchema),
    defaultValues: {
      boardId: boardId as string,
      title: "",
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing()
    }
  }

  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (values: z.infer<typeof CreateListSchema>) => {
    createList(values, {
      onSuccess: (list) => {
        toast.success(`List "${list.title}" created`)
        disableEditing()
        form.reset()
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
      <ListWrapper>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 rounded-md bg-background px-[9px] py-[7px] shadow-md"
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
                      placeholder="Enter list title..."
                      className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <LoadingButton loading={isLoading} type="submit">
                Add list
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
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md bg-background/80 p-3 text-sm font-medium transition hover:bg-background/50"
      >
        <Plus className="mr-2 size-4" />
        Add a list
      </button>
    </ListWrapper>
  )
}
