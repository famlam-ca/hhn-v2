"use client"

import { BoardVisibility } from "@prisma/client"
import {
  Check,
  Cloud,
  Copy,
  CopyCheck,
  File,
  Loader2,
  Trash2,
} from "lucide-react"
import { notFound } from "next/navigation"
import { useState } from "react"
import Dropzone from "react-dropzone"
import { toast } from "sonner"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BOARD_VISIBILITY } from "@/constants/kanban"
import { useUpload } from "@/lib/uploadthing"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"
import Image from "next/image"

interface SettingsProps {
  boardId: string
}

export const Settings = ({ boardId }: SettingsProps) => {
  const { startUpload } = useUpload("fileUpload")
  const { isOpen, onOpen, type } = useModal()

  const isMoveModalOpen = isOpen && type === "move-board"
  const isReopenModalOpen = isOpen && type === "reopen-board"
  const isCloseModalOpen = isOpen && type === "close-board"
  const isDeleteModalOpen = isOpen && type === "delete-board"

  const utils = trpc.useUtils()
  const [board] = trpc.kanban.getBoard.useSuspenseQuery(boardId)
  const [member] = trpc.kanban.getCurrentMember.useSuspenseQuery(boardId)
  const updateBoardTitle = trpc.kanban.updateBoardTitle.useMutation()
  const updateBoardDescription =
    trpc.kanban.updateBoardDescription.useMutation()
  const updateBoardVisibility = trpc.kanban.updateBoardVisibility.useMutation()

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isResetting, setIsResetting] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [coverUrl, setCoverUrl] = useState<string | null>(board.coverUrl)
  const [boardTitle, setBoardTitle] = useState<string>(board.title)
  const [boardDescription, setBoardDescription] = useState<string | null>(
    board.description !== null ? board.description : null,
  )
  const [boardVisibility, setBoardVisibility] = useState<BoardVisibility>(
    board.visibility,
  )

  function handleTitle(title: string) {
    if (title === board.title) {
      return toast.warning("The title is the same as the current one.")
    }
    if (title === "") {
      toast.warning("Title cannot be empty.")
      return setBoardTitle(board.title)
    }

    const previousTitle = boardTitle
    setBoardTitle(title)
    updateBoardTitle.mutate(
      { boardId, title },
      {
        onSuccess: (data) => {
          setBoardTitle(data.title)
          toast.success(`Board title has been updated to ${data.title}`)
        },
        onError: (error) => {
          setBoardTitle(previousTitle)
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: async () => {
          await utils.kanban.invalidate()
        },
      },
    )
  }

  function handleChangeDescriptions() {
    if (boardDescription === board.description) {
      return toast.warning("The title is the same as the current one.")
    }
    if (boardDescription === "") {
      toast.warning("Please provide a description")
      return setBoardTitle(board.title)
    }

    setIsSaving(true)
    updateBoardDescription.mutate(
      { boardId, description: boardDescription },
      {
        onSuccess: (data) => {
          setBoardDescription(data.description)
          toast.success("Board description has been updated")
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
        onSettled: async () => {
          setIsSaving(false)
          await utils.kanban.invalidate()
        },
      },
    )
  }

  function handleResetDescription() {
    setIsResetting(true)
    updateBoardDescription.mutate(
      { boardId, description: null },
      {
        onSuccess: () => {
          setBoardDescription("")
          toast.success("Board description has been reset")
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
        onSettled: async () => {
          setIsResetting(false)
          await utils.kanban.invalidate()
        },
      },
    )
  }

  function handleChangeVisibility() {
    if (boardVisibility === board.visibility) {
      return toast.warning("The visibility is the same as the current one.")
    }

    updateBoardVisibility.mutate(
      { boardId, visibility: boardVisibility },
      {
        onSuccess: (data) => {
          setBoardVisibility(data.visibility)
          toast.success(
            `Board visibility has been updated to ${data.visibility}`,
          )
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: async () => {
          await utils.kanban.invalidate()
        },
      },
    )
  }

  function startSimulatedUpload() {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 99) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 1
      })
    }, 500)

    return interval
  }

  if (!board || (member?.role !== "owner" && member?.role !== "admin")) {
    return notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-normal capitalize">General</h1>
      <div className="mb-6 mt-3 h-px bg-accent" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Board name */}
          <div className="flex flex-col gap-2">
            <Label>Board name</Label>
            <div className="flex gap-2">
              <Input
                disabled={updateBoardTitle.isPending}
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                className="w-80"
              />
              <Button
                disabled={updateBoardTitle.isPending}
                onClick={() => handleTitle(boardTitle)}
                variant="secondary"
              >
                {updateBoardTitle.isPending ? (
                  <div className="flex items-center gap-1.5">
                    <Loader2 className="animate-spin" />
                    <span>Renaming...</span>
                  </div>
                ) : (
                  "Rename"
                )}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <div className="flex gap-2">
              <div className="w-full max-w-80">
                <Textarea
                  disabled={isSaving}
                  value={boardDescription || ""}
                  onChange={(e) => setBoardDescription(e.target.value)}
                  className="resize-none"
                />
                <Button
                  disabled={isResetting || board.description === null}
                  onClick={handleResetDescription}
                  variant="link"
                  size="icon"
                  className="text-alert"
                >
                  Reset
                </Button>
              </div>
              <Button
                disabled={isSaving || isResetting}
                onClick={handleChangeDescriptions}
                variant="secondary"
              >
                {isSaving || isResetting ? (
                  <div className="flex items-center gap-1.5">
                    <Loader2 className="animate-spin" />
                    {isSaving ? "Saving..." : null}
                    {isResetting ? "Resetting..." : null}
                  </div>
                ) : (
                  "Change"
                )}
              </Button>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex flex-col gap-2">
            <Label>Visibility</Label>
            <div className="flex gap-2">
              <Select
                disabled={updateBoardVisibility.isPending}
                onValueChange={(v) => setBoardVisibility(v as BoardVisibility)}
                defaultValue={boardVisibility}
              >
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Who can view your board?" />
                </SelectTrigger>
                <SelectContent>
                  {BOARD_VISIBILITY.map((visibility, i) => (
                    <SelectItem key={i} value={visibility.value}>
                      {visibility.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                disabled={updateBoardVisibility.isPending}
                onClick={handleChangeVisibility}
                variant="secondary"
              >
                Change
              </Button>
            </div>
          </div>

          {/* Board ID */}
          <div className="flex flex-col gap-2">
            <Label>Board ID</Label>
            <div className="flex gap-2">
              <Input disabled value={board.id} className="w-full max-w-80" />
              <Button
                disabled={isCopied}
                onClick={() => {
                  setIsCopied(true)
                  navigator.clipboard.writeText(board.id)
                  toast.success("Board ID has been copied to clipboard.")
                  setTimeout(() => {
                    setIsCopied(false)
                  }, 2000)
                }}
                size="icon"
                variant="secondary"
              >
                {isCopied ? (
                  <CopyCheck className="size-5 stroke-success" />
                ) : (
                  <Copy className="size-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Board dates */}
          <div className="flex w-full max-w-full gap-2 truncate">
            <div className="space-y-2">
              <Label>Created at</Label>
              <Input
                disabled
                value={new Date(board.createdAt).toDateString()}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Last updated</Label>
              <Input
                disabled
                value={new Date(board.updatedAt).toDateString()}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Closed At</Label>

              <Input
                disabled
                value={
                  board.closedAt
                    ? new Date(board.closedAt).toDateString()
                    : "Not closed"
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="flex flex-col gap-2 lg:col-span-1">
          <Label>Board Cover</Label>
          <div className="group relative size-64">
            {coverUrl ? (
              <>
                <Image
                  width={256}
                  height={256}
                  loading="lazy"
                  src={coverUrl || ""}
                  alt="board cover"
                  className="h-full w-full rounded-md object-cover group-hover:opacity-75"
                />
                <Hint label="Remove board cover" asChild>
                  <Button
                    onClick={() => {
                      setIsUploading(true)
                      setTimeout(() => {
                        setCoverUrl(null)
                        setIsUploading(false)
                      }, 500)
                    }}
                    size="icon"
                    variant="destructive"
                    className="absolute right-[calc(50%-1.5rem)] top-[calc(50%-1.5rem)] hidden cursor-pointer group-hover:flex"
                  >
                    {isUploading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </Hint>
              </>
            ) : (
              <Dropzone
                multiple={false}
                onDrop={async (acceptedFile) => {
                  setIsUploading(true)

                  const progressInterval = startSimulatedUpload()

                  const res = await startUpload(acceptedFile)
                  if (!res) {
                    return toast.error("Oops!", {
                      description:
                        "Something went wrong while uploading your file, please try again.",
                    })
                  }

                  const [fileResponse] = res

                  const key = fileResponse?.key
                  if (!key) {
                    return toast.error("Oops!", {
                      description:
                        "Something went wrong while uploading your file, please try again.",
                    })
                  }

                  setCoverUrl(fileResponse.url)
                  clearInterval(progressInterval)
                  setUploadProgress(100)
                }}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div
                    {...getRootProps()}
                    className="h-full rounded-lg border border-dashed border-accent-foreground"
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-secondary hover:bg-secondary/75"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-4">
                          <Cloud className="mb-2" />
                          <p className="mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop.
                          </p>
                        </div>

                        {acceptedFiles && acceptedFiles[0] ? (
                          <div className="flex max-w-xs items-center divide-x divide-accent overflow-hidden rounded-md bg-background outline outline-1 outline-accent">
                            <div className="grid h-full place-items-center px-3 py-2">
                              <File className="h-4 w-4 stroke-primary" />
                            </div>
                            <div className="h-full truncate px-3 py-2 text-sm">
                              {acceptedFiles[0].name}
                            </div>
                          </div>
                        ) : null}

                        {isUploading ? (
                          <div className="mx-auto mt-4 w-full max-w-xs">
                            <Progress
                              indicatorColor={
                                uploadProgress === 100 ? "bg-success" : ""
                              }
                              value={uploadProgress}
                              className="h-1 w-full bg-foreground"
                            />
                            {uploadProgress === 100 ? (
                              <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm">
                                <Check className="h-4 w-4 text-success" />
                                Upload completed successfully!
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        <input
                          {...getInputProps()}
                          type="file"
                          id="dropzone-file-input"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
        </div>

        {/* Danger zone */}
        <div className="col-span-full">
          <Label className="text-3xl font-bold">Danger zone</Label>
          <div className="mt-2 rounded-lg border-2 border-alert">
            <div className="flex items-center justify-between p-4">
              <span>
                <p className="font-semibold">Move board</p>
                <p className="text-sm">
                  Move the board to another team, which you are a owner or admin
                  of.
                </p>
              </span>

              {board.closed ? (
                <Hint label="You cannot move a board that is closed" asChild>
                  <Button disabled variant="destructive">
                    Move board
                  </Button>
                </Hint>
              ) : (
                <Button
                  disabled={isMoveModalOpen || board.closed}
                  onClick={() =>
                    onOpen("move-board", {
                      board,
                    })
                  }
                  variant="destructive"
                >
                  Move board
                </Button>
              )}
            </div>

            {board.closed ? (
              <div className="flex items-center justify-between p-4">
                <span>
                  <p className="font-semibold">Reopen board</p>
                  <p className="text-sm">
                    Reopening the board will make the board accessible again.
                  </p>
                </span>
                <Button
                  disabled={isReopenModalOpen || !board.closed}
                  onClick={() =>
                    onOpen("reopen-board", {
                      boardId: board.id,
                    })
                  }
                  variant="destructive"
                >
                  Reopen board
                </Button>
              </div>
            ) : null}
            {!board.closed ? (
              <div className="flex items-center justify-between p-4">
                <span>
                  <p className="font-semibold">Close board</p>
                  <p className="text-sm">
                    Closing the board will archive it and make it read-only. You
                    can reopen it at any time.
                  </p>
                </span>
                <Button
                  disabled={isCloseModalOpen || board.closed}
                  onClick={() =>
                    onOpen("close-board", {
                      boardId: board.id,
                    })
                  }
                  variant="destructive"
                >
                  Close board
                </Button>
              </div>
            ) : null}

            <div className="h-px bg-accent" />

            <div className="flex items-center justify-between p-4">
              <span>
                <p className="font-semibold">Delete board</p>
                <p className="text-sm">
                  Deleting the board will permanently remove it and all of its
                  data. This action is irreversible.
                </p>
              </span>

              {!board.closed ? (
                <Hint
                  label="You cannot delete a board that is not closed"
                  asChild
                >
                  <Button disabled variant="destructive">
                    Delete board
                  </Button>
                </Hint>
              ) : (
                <Button
                  disabled={isDeleteModalOpen || !board.closed}
                  onClick={() =>
                    onOpen("delete-board", {
                      boardId: board.id,
                    })
                  }
                  variant="destructive"
                >
                  Delete board
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
