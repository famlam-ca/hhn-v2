"use client"

import { BoardVisibility } from "@prisma/client"
import { Ellipsis, UserPlus2 } from "lucide-react"
import { notFound } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Hint } from "@/components/hint"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useModal } from "@/store/useModal"
import { useSheet } from "@/store/useSheet"
import { trpc } from "@/trpc/react"
import { BoardMember } from "@/types/board"
import { User } from "@/types/user"

import { BoardUserMenu } from "./board-user-menu"
import { VisibilityMenu } from "./visibility-menu"

import { FavoriteBoardButton } from "../../_components/favorite-board-button"

interface KanbanNavbarProps {
  boardId: string
  user: User
}

export const KanbanNavbar = ({ boardId, user }: KanbanNavbarProps) => {
  const { onOpen } = useModal()
  const { onOpen: onOpenSheet } = useSheet()

  const utils = trpc.useUtils()
  const [board] = trpc.kanban.getBoard.useSuspenseQuery(boardId)
  const updateBoardTitle = trpc.kanban.updateBoardTitle.useMutation()
  const favoriteBoard = trpc.kanban.favoriteBoard.useMutation()
  const updateBoardVisibility = trpc.kanban.updateBoardVisibility.useMutation()

  const [editMode, setEditMode] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>(board.title)
  const [boardFavorited, setBoardFavorited] = useState<boolean>(
    board.favoritedBy[0]?.favorited ?? false,
  )
  const [boardVisibility, setBoardVisibility] = useState<BoardVisibility>(
    board.visibility,
  )

  const currentMember = board.members.find(
    (member) => member.userId === user.id,
  ) as BoardMember
  if (!currentMember) {
    return notFound()
  }

  function handleBlur() {
    setEditMode(false)
  }

  function handleTitle(title: string) {
    if (title === board.title) return
    if (title === "") return setBoardTitle(board.title)

    const previousTitle = boardTitle
    setBoardTitle(title)

    updateBoardTitle.mutate(
      { title, boardId: board.id },
      {
        onSuccess: (data) => {
          setBoardTitle(data.title)
          toast.success("Board title updated")
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

  function handleFavorite() {
    const previousFavoriteStatus = boardFavorited
    setBoardFavorited(!boardFavorited)

    favoriteBoard.mutate(board.id, {
      onSuccess: (data) => {
        setBoardFavorited(data.favorited)
        toast.success(
          `You have ${data.favorited ? "favorited" : "unfavorited"} this board`,
        )
      },
      onError: (error) => {
        setBoardFavorited(previousFavoriteStatus)
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.kanban.invalidate()
      },
    })
  }

  function handleVisibility(visibility: BoardVisibility) {
    const previousVisibility = boardVisibility
    setBoardVisibility(visibility)

    updateBoardVisibility.mutate(
      { boardId: board.id, visibility },
      {
        onSuccess: (data) => {
          setBoardVisibility(data.visibility)
          toast.success(`Board is now ${data.visibility}`)
        },
        onError: (error) => {
          setBoardVisibility(previousVisibility)
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

  return (
    <div className="fixed inset-x-0 top-16 z-50 h-16 border-b border-border transition-all">
      <MaxWidthWrapper className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4 md:gap-1">
          <div
            onClick={() => setEditMode(true)}
            className="max-w-[250px] truncate md:max-w-[400px]"
          >
            {editMode ? (
              <Input
                autoFocus
                value={boardTitle}
                onChange={(e) => {
                  setBoardTitle(e.target.value)
                }}
                onBlur={() => {
                  handleBlur()
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitle(boardTitle)
                    setEditMode(false)
                  }
                }}
                className="bg-accent text-2xl font-bold ring-accent ring-offset-accent focus-visible:ring-primary lg:text-3xl"
              />
            ) : (
              <Button
                variant="ghost"
                className="ml-[-0.19rem] text-2xl font-bold lg:text-3xl"
              >
                {boardTitle}
              </Button>
            )}
          </div>

          <div className="hidden md:block">
            <Button
              onClick={handleFavorite}
              onKeyDown={handleFavorite}
              size="icon"
              variant="ghost"
              className="group"
            >
              <FavoriteBoardButton boardFavorited={boardFavorited} />
            </Button>

            {currentMember &&
            (currentMember.role === "owner" ||
              currentMember.role === "admin") ? (
              <VisibilityMenu
                visibility={boardVisibility}
                changeVisibility={handleVisibility}
              />
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center md:flex">
            <BoardUserMenu user={user} currentMember={currentMember} />

            <Button
              onClick={() =>
                onOpen("share-board", {
                  boardId: board.id,
                  currentMember,
                  showTabs: true,
                })
              }
              variant="primary"
              className="gap-1.5"
            >
              <UserPlus2 className="size-4" />
              Share
            </Button>
          </div>

          <Hint label="Board Options" asChild>
            <Button
              onClick={() =>
                onOpenSheet("board-options", { boardId: board.id })
              }
              size="icon"
              variant="ghost"
            >
              <Ellipsis className="size-8 md:size-6" />
            </Button>
          </Hint>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
