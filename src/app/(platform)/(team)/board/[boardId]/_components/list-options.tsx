"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, MoreHorizontal, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ElementRef, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { trpc } from "@/trpc/react"
import { List } from "@/types"
import { CopyListSchema, DeleteListSchema } from "@/validators/list"

interface ListOptionsProps {
  list: List
  onAddCard: () => void
}

export default function ListOptions({ list, onAddCard }: ListOptionsProps) {
  const router = useRouter()
  const closeRef = useRef<ElementRef<"button">>(null)

  const { mutate: deleteList, isPending: deleteListPending } =
    trpc.list.deleteList.useMutation()
  const { mutate: copyList, isPending: copyListPending } =
    trpc.list.copyList.useMutation()

  const copyForm = useForm<z.infer<typeof CopyListSchema>>({
    resolver: zodResolver(CopyListSchema),
    defaultValues: {
      boardId: list.boardId,
      listId: list.id,
    },
  })

  const isCopying = copyForm.formState.isSubmitting || copyListPending

  const deleteForm = useForm<z.infer<typeof DeleteListSchema>>({
    resolver: zodResolver(DeleteListSchema),
    defaultValues: {
      boardId: list.boardId,
      listId: list.id,
    },
  })

  const isDeleting = deleteForm.formState.isSubmitting || deleteListPending

  const onCopy = (values: z.infer<typeof CopyListSchema>) => {
    copyList(values, {
      onSuccess: (returnedList) => {
        toast.success(`List "${returnedList?.title}" copied`)
        closeRef.current?.click()
        router.refresh()
      },
      onError: (error) => {
        toast.error("Oops!", {
          description: error.message,
        })
      },
    })
  }

  const onDelete = (values: z.infer<typeof DeleteListSchema>) => {
    deleteList(values, {
      onSuccess: (returnedList) => {
        toast.success(`List "${returnedList?.title}" deleted`)
        closeRef.current?.click()
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={onAddCard}
          variant="ghost"
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          <Copy /> Add card
        </Button>
        <Form {...copyForm}>
          <form onSubmit={copyForm.handleSubmit(onCopy)}>
            <FormField
              control={copyForm.control}
              name="boardId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={copyForm.control}
              name="listId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <LoadingButton
              loading={isCopying}
              type="submit"
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            >
              <Copy /> Copy list
            </LoadingButton>
          </form>
        </Form>
        <Separator />
        <Form {...deleteForm}>
          <form onSubmit={deleteForm.handleSubmit(onDelete)}>
            <FormField
              control={deleteForm.control}
              name="boardId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={deleteForm.control}
              name="listId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
            <LoadingButton
              loading={isDeleting}
              type="submit"
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-rose-500"
            >
              <Trash2 />
              Delete this list
            </LoadingButton>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
