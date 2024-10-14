"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import {
  Clock,
  ClockArrowUp,
  Ellipsis,
  Eye,
  LayoutGrid,
  LayoutList,
  Link,
  ListChecks,
  Plus,
  Star,
  User2,
  Users2,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Hint } from "@/components/hint"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useModal } from "@/store/useModal"
import { useSheet } from "@/store/useSheet"
import { trpc } from "@/trpc/react"
import { Board } from "@/types/board"

import { FavoriteBoardButton } from "./favorite-board-button"
import "./styles.css"

interface KanbanDashboardProps {
  displayName: string
}

export type Layout = "grid" | "list"

export const KanbanDashboard = ({ displayName }: KanbanDashboardProps) => {
  const { onOpen } = useModal()

  const [boards] = trpc.kanban.getUserBoards.useSuspenseQuery()
  const [teams] = trpc.team.getUserTeams.useSuspenseQuery()

  const [layout, setLayout] = useState<Layout>(() => {
    const layout = localStorage.getItem("layout")
    return layout ? (layout as Layout) : "grid"
  })
  const [teamId, setTeamId] = useState<string>(() => {
    const teamId = localStorage.getItem("teamId")
    return teamId ? teamId : "all"
  })

  useEffect(() => {
    localStorage.setItem("layout", layout)
  }, [layout])
  useEffect(() => {
    localStorage.setItem("teamId", teamId)
  }, [teamId])

  const filteredBoards =
    teamId === "all"
      ? boards
      : boards.filter((board) => board.teamId === teamId)

  const sortedBoards = [...filteredBoards].sort((a, b) => {
    const aFavorited = a.favoritedBy[0]?.favorited ?? 0
    const bFavorited = b.favoritedBy[0]?.favorited ?? 0
    if (aFavorited > bFavorited) return -1
    if (aFavorited < bFavorited) return 1
    return 0
  })

  return (
    <MaxWidthWrapper className="my-8 flex max-w-full flex-col">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <h1 className="text-2xl font-bold">Hello, {displayName}</h1>

        <div className="flex justify-between md:justify-normal md:gap-4">
          <div className="space-x-2">
            <Button
              onClick={() => setLayout("grid")}
              size="icon"
              variant={layout === "grid" ? "secondary" : "ghost"}
            >
              <LayoutGrid />
            </Button>
            <Button
              onClick={() => setLayout("list")}
              size="icon"
              variant={layout === "list" ? "secondary" : "ghost"}
            >
              <LayoutList />
            </Button>
          </div>

          <Button onClick={() => onOpen("create-board")} size="icon">
            <Plus />
          </Button>
        </div>
      </div>

      <div className="my-6 space-y-6">
        <div className="flex items-center gap-6">
          <h2 className="text-lg font-semibold text-primary">Workspaces</h2>

          <Select value={teamId} onValueChange={(v) => setTeamId(v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Workspaces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {layout === "grid" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            {sortedBoards.map((board) => (
              <motion.div key={board.id} layout>
                <BoardCard board={board} layout={layout} />
              </motion.div>
            ))}
          </div>
        ) : null}

        {layout === "list" ? (
          <div className="flex flex-col gap-4 md:gap-6">
            {sortedBoards.map((board) => (
              <motion.div key={board.id} layout>
                <BoardCard board={board} layout={layout} />
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </MaxWidthWrapper>
  )
}

interface BoardCardProps {
  board: Board
  layout: Layout
}

const BoardCard = ({ board, layout }: BoardCardProps) => {
  const { onOpen } = useSheet()

  const utils = trpc.useUtils()
  const favoriteBoard = trpc.kanban.favoriteBoard.useMutation()

  const [isHovered, setIsHovered] = useState(false)
  const [boardFavorited, setBoardFavorited] = useState<boolean>(
    board.favoritedBy[0]?.favorited ?? false,
  )

  function handleFavorite(id: string) {
    favoriteBoard.mutate(id, {
      onSuccess: () => {
        setBoardFavorited(!boardFavorited)
      },
      onError: (error) => {
        setBoardFavorited(boardFavorited)
        toast.error("Oops!", {
          description: error.message,
        })
      },
      onSettled: async () => {
        await utils.kanban.invalidate()
      },
    })
  }

  const BOARD_DETAILS = [
    {
      label: "Team",
      icon: <Users2 className="size-5" />,
      value: board.team.name,
      visible: false,
    },
    {
      label: "Board Visibility",
      icon: (
        <Eye
          className={cn("size-5", {
            "stroke-success": board.visibility === "public",
            "stroke-primary": board.visibility === "team",
            "stroke-warning": board.visibility === "private",
          })}
        />
      ),
      value:
        board.visibility.slice(0, 1).toUpperCase() + board.visibility.slice(1),
      visible: true,
    },
    {
      label: "Tasks",
      icon: <ListChecks className="size-5" />,
      value: board.tasks.length,
      visible: true,
    },
    {
      label: "Members",
      icon: <User2 className="size-5" />,
      value: board.members.length,
      visible: false,
    },
    {
      label: "Favorited",
      icon: (
        <Star className="size-5 stroke-yellow-500 dark:stroke-yellow-400" />
      ),
      value: board.favoritedBy.length,
      visible: false,
    },
    {
      label: "Share Links",
      icon: <Link className="size-5" />,
      value: board.invites.length,
      visible: false,
    },
    {
      label: "Created At",
      icon: <Clock className="size-5" />,
      value: format(new Date(board.createdAt), "MMM yyyy"),
      visible: false,
    },
    {
      label: "Updated At",
      icon: <ClockArrowUp className="size-5" />,
      value: format(new Date(board.updatedAt), "MMM yyyy"),
      visible: false,
    },
  ]

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`box h-48 rounded-lg bg-secondary ${isHovered ? "box-hover" : ""}`}
      animate={{ y: isHovered ? -5 : 0 }}
      transition={{ duration: 0.125, ease: "easeInOut" }}
    >
      <a href={`/kanban/${board.id}`}>
        {layout === "grid" ? (
          <div className="h-full">
            <div className="relative h-2/3 w-full">
              {board.coverUrl ? (
                <Image
                  width={200}
                  height={200}
                  loading="lazy"
                  src={board.coverUrl}
                  alt={board.title}
                  className="h-full w-full rounded-t-lg object-cover"
                />
              ) : (
                <div className="h-full rounded-t-lg bg-[url('/assets/kanban/bg.jpg')] bg-cover dark:bg-[url('/assets/kanban/bg.dark.jpg')]" />
              )}

              <div className="absolute bottom-1 flex w-full flex-wrap items-center justify-around gap-0 sm:gap-2">
                {BOARD_DETAILS.slice(0, 5).map((detail) => (
                  <div
                    key={detail.label}
                    onClick={(e) => e.preventDefault()}
                    className="shrink-0"
                  >
                    <Hint label={detail.label}>
                      <div className="flex items-center gap-1.5 rounded-lg bg-background/50 p-2">
                        {detail.icon}
                        <p className="max-w-xs truncate capitalize">
                          {detail.value}
                        </p>
                      </div>
                    </Hint>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-1/3 items-center px-2">
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  handleFavorite(board.id)
                }}
                size="icon"
                variant="ghost"
                className="group"
              >
                <FavoriteBoardButton
                  boardFavorited={boardFavorited}
                  layout={layout}
                />
              </Button>

              <div className="w-full flex-1 truncate">{board.title}</div>

              <Button
                onClick={(e) => {
                  e.preventDefault()
                  onOpen("board-options", { boardId: board.id })
                }}
                size="icon"
                variant="ghost"
                className="hover:bg-muted-foreground/10"
              >
                <Ellipsis />
              </Button>
            </div>
          </div>
        ) : null}

        {layout === "list" ? (
          <div className="flex h-full w-full">
            <div className="flex-[0.25]">
              {board.coverUrl ? (
                <Image
                  width={200}
                  height={200}
                  loading="lazy"
                  src={board.coverUrl}
                  alt={board.title}
                  className="h-full w-full rounded-l-lg object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-l-lg bg-[url('/assets/kanban/bg.jpg')] bg-cover dark:bg-[url('/assets/kanban/bg.dark.jpg')]" />
              )}
            </div>

            <div className="flex-[0.75] p-4 md:p-6">
              <div className="flex h-1/4 items-center justify-between">
                <div className="flex items-center gap-2 sm:max-w-lg md:w-full md:gap-6">
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      handleFavorite(board.id)
                    }}
                    size="icon"
                    variant="ghost"
                    className="group flex items-center justify-center"
                  >
                    <FavoriteBoardButton
                      boardFavorited={boardFavorited}
                      layout={layout}
                    />
                  </Button>

                  <div className="w-[170px] sm:w-[400px] xl:w-full">
                    <p className="truncate text-lg font-semibold md:text-2xl">
                      {board.title}
                    </p>
                    <p className="truncate text-sm text-muted-foreground md:text-base">
                      {board.description}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    onOpen("board-options", { boardId: board.id })
                  }}
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer hover:bg-muted-foreground/10"
                >
                  <Ellipsis />
                </Button>
              </div>

              <div className="flex h-3/4 items-end">
                <ScrollArea className="w-[270px] whitespace-nowrap sm:w-[500px] xl:w-full">
                  <div className="flex w-max space-x-4">
                    {BOARD_DETAILS.map((detail) => (
                      <div
                        key={detail.label}
                        onClick={(e) => e.preventDefault()}
                        className="shrink-0"
                      >
                        <Hint label={detail.label}>
                          <div className="flex items-center gap-1.5 rounded-lg bg-background/25 p-2">
                            {detail.icon}
                            <p className="max-w-[140px] truncate">
                              {detail.value}
                            </p>
                          </div>
                        </Hint>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        ) : null}
      </a>
    </motion.div>
  )
}
