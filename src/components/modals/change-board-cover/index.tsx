"use client"

import { Check, Cloud, File, Loader2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import Dropzone from "react-dropzone"
import { toast } from "sonner"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useUpload } from "@/lib/uploadthing"
import { useModal } from "@/store/useModal"
import { trpc } from "@/trpc/react"
import Image from "next/image"

export const ChangeBoardCoverModal = () => {
  const { data, isOpen, onClose, type } = useModal()
  const { startUpload } = useUpload("fileUpload")

  const isModalOpen = isOpen && type === "change-board-cover"
  const { boardId, initCoverUrl } = data

  const utils = trpc.useUtils()
  const updateBoardCover = trpc.kanban.updateBoardCover.useMutation()

  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  function handleUpdateCover() {
    if (!boardId || !coverUrl) return

    updateBoardCover.mutate(
      { boardId, coverUrl },
      {
        onSuccess: (data) => {
          setCoverUrl(data.coverUrl)
          toast.success("Board cover updated!")
          onClose()
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: async () => {
          setIsUploading(false)
          setUploadProgress(0)
          await utils.kanban.invalidate()
        },
      },
    )
  }

  function handleRemoveCover() {
    if (!boardId) return

    setIsRemoving(true)
    updateBoardCover.mutate(
      { boardId, coverUrl: null },
      {
        onSuccess: () => {
          setCoverUrl(null)
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
        onSettled: async () => {
          setIsRemoving(false)
          setIsUploading(false)
          setUploadProgress(0)
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

  useEffect(() => {
    if (initCoverUrl) {
      setCoverUrl(initCoverUrl)
    }
  }, [initCoverUrl])

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl space-y-6">
        <DialogHeader>
          <DialogTitle>Change Board Cover</DialogTitle>
          <DialogDescription aria-hidden className="hidden" />
        </DialogHeader>

        {updateBoardCover.isPending ? (
          <CoverSkeleton />
        ) : (
          <div className="group relative h-96">
            {coverUrl ? (
              <>
                <Image
                  priority
                  width={500}
                  height={500}
                  src={coverUrl}
                  alt="board cover"
                  className="absolute top-0 h-full w-full rounded-lg object-cover group-hover:opacity-75"
                />
                <Hint label="Remove board cover" asChild>
                  <Button
                    onClick={handleRemoveCover}
                    size="icon"
                    variant="destructive"
                    className="absolute right-[calc(50%-1.5rem)] top-[calc(50%-1.5rem)] hidden cursor-pointer group-hover:flex"
                  >
                    {isRemoving ? (
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

                  if (!fileResponse || !fileResponse.key) {
                    return toast("Oops!", {
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
        )}

        <DialogFooter className="flex sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsRemoving(false)
              setCoverUrl(coverUrl)
              onClose()
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateCover} variant="primary">
            {updateBoardCover.isPending ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="animate-spin" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const CoverSkeleton = () => {
  return (
    <div className="relative h-96 rounded-lg border border-dashed border-accent-foreground">
      <Skeleton className="h-full" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  )
}
