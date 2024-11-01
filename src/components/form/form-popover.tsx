"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ElementRef, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "@/components/ui/floating-label-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useProModal } from "@/hooks/use-pro-modal"
import { trpc } from "@/trpc/react"
import { CreateBoardSchema } from "@/validators/board"

import { FormPicker } from "./form-picker"

interface FormPopoverProps {
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end"
  sideOffset?: number
}

export function FormPopover({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) {
  const router = useRouter()
  const proModal = useProModal()
  const teamId = useParams().teamId as string
  const closeRef = useRef<ElementRef<"button">>(null)

  const utils = trpc.useUtils()
  const { mutate: createBoard, isPending } =
    trpc.board.createBoard.useMutation()

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      teamId: teamId,
      title: "",
      image: "",
    },
  })

  const isLoading = form.formState.isSubmitting || isPending

  const onSubmit = async (values: z.infer<typeof CreateBoardSchema>) => {
    createBoard(values, {
      onSuccess: (board) => {
        utils.team.getUserTeams.invalidate()
        closeRef.current?.click()
        router.push(`/board/${board.id}`)
      },
      onError: (error) => {
        toast.error(error.message)
        if (error.data?.code === "FORBIDDEN") {
          proModal.onOpen()
        }
      },
    })
  }

  const styles = {
    input:
      "border-0 bg-background/50 ring-1 ring-input focus-visible:ring-primary",
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="teamId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>{field.value}</FormControl>
                </FormItem>
              )}
            />
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
                      label="Board title"
                      className={styles.input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton loading={isLoading} type="submit" className="w-full">
              Create
            </LoadingButton>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
