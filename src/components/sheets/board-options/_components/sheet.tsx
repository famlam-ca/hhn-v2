"use client"

import { User } from "@prisma/client"
import {
  ActivitySquare,
  Archive,
  Copy,
  Image,
  Info,
  ListOrdered,
  LucideIcon,
  Mail,
  Minus,
  Network,
  Settings,
  Tags,
} from "lucide-react"
import { useRouter } from "next/navigation"

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { useModal } from "@/store/useModal"
import { useSheet } from "@/store/useSheet"
import { trpc } from "@/trpc/react"

interface BoardOptionsProps {
  boardId: string
  user: User
}

export const BoardOptions = ({ boardId, user }: BoardOptionsProps) => {
  const router = useRouter()
  const { onOpen } = useModal()
  const { onClose } = useSheet()

  const [board, queryBoard] = trpc.kanban.getBoard.useSuspenseQuery(boardId)
  if (queryBoard.isLoading) {
    return <SheetSkeleton />
  }
  if (!board) {
    return <div>Board not found</div>
  }

  const currentMember = board.members.find(
    (member) => member.userId === user.id,
  )
  const isOwner = currentMember?.role === "owner"
  const isAdmin = currentMember?.role === "admin"

  const SHEET_ITEMS: SheetItemProps[] = [
    {
      icon: Info,
      label: "About this board",
      description: board?.description ? "" : "Add a description to your board",
      onClick: () =>
        onOpen("about-board", {
          boardId,
          initDescription: board?.description,
        }),
      disabled: !isOwner && !isAdmin,
    },
    {
      icon: ActivitySquare,
      label: "Activity",
      //   disabled: !isOwner && !isAdmin,
      disabled: true,
    },
    {
      icon: Archive,
      label: "Archived items",
      //   disabled: !isOwner && !isAdmin,
      disabled: true,
    },

    {
      icon: Settings,
      label: "Settings",
      disabled: !isOwner && !isAdmin,
      onClick: () => {
        onClose()
        router.push(`/kanban/${boardId}/settings`)
      },
    },
    {
      icon: Image,
      label: "Change cover",
      onClick: () =>
        onOpen("change-board-cover", {
          boardId,
          initCoverUrl: board?.coverUrl,
        }),
      disabled: !isOwner && !isAdmin,
    },
    {
      icon: Tags,
      label: "Labels",
      disabled: true,
    },
    {
      icon: ListOrdered,
      label: "Priorities",
      disabled: true,
    },

    {
      icon: Copy,
      label: "Copy board",
      disabled: true,
    },
    {
      icon: Mail,
      label: "Email-to-board",
      //   disabled: !isOwner && !isAdmin,
      disabled: true,
    },
    {
      icon: Network,
      label: "Print, export, and share",
      disabled: true,
    },
    {
      icon: Minus,
      label: "Close board",
      onClick: () =>
        onOpen("close-board", {
          boardId,
        }),
      disabled: !isOwner || board?.closed,
    },
  ]

  return (
    <>
      <SheetHeader>
        <SheetTitle>{board.title}</SheetTitle>
        <SheetDescription aria-hidden className="hidden" />
      </SheetHeader>

      <div className="my-4 h-px bg-accent" />

      <div className="flex flex-col gap-2">
        {SHEET_ITEMS.slice(0, 3).map((item, i) => (
          <SheetItem key={i} {...item} />
        ))}

        <div className="my-0 h-px bg-accent" />

        {SHEET_ITEMS.slice(3, 7).map((item, i) => (
          <SheetItem key={i} {...item} />
        ))}

        <div className="my-0 h-px bg-accent" />

        {SHEET_ITEMS.slice(7).map((item, i) => (
          <SheetItem key={i} {...item} />
        ))}
      </div>
    </>
  )
}

export interface SheetItemProps {
  icon: LucideIcon
  label: string
  description?: string
  onClick?: () => void
  href?: string
  disabled?: boolean
}

const SheetItem = ({
  icon: Icon,
  label,
  description,
  onClick,
  href,
  disabled,
}: SheetItemProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className="flex items-center gap-3 rounded-md p-2 hover:bg-muted-foreground/10 disabled:opacity-50"
    >
      <Icon className="size-5 stroke-muted-foreground" />
      <div className="flex flex-col text-start text-muted-foreground">
        {label}
        {description ? <p className="text-xs">{description}</p> : null}
      </div>
    </button>
  )
}

const SheetSkeleton = () => {
  return (
    <>
      <SheetHeader>
        <SheetTitle>
          <Skeleton className="h-8 w-60" />
        </SheetTitle>
        <SheetDescription aria-hidden className="hidden" />
      </SheetHeader>

      <div className="my-4 h-px bg-accent" />

      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-muted-foreground/10 disabled:opacity-50"
          >
            <Skeleton className="size-6" />
            <Skeleton className="h-5 w-40" />
          </div>
        ))}

        <div className="my-0 h-px bg-accent" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-muted-foreground/10 disabled:opacity-50"
          >
            <Skeleton className="size-6" />
            <Skeleton className="h-5 w-40" />
          </div>
        ))}

        <div className="my-0 h-px bg-accent" />

        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-muted-foreground/10 disabled:opacity-50"
          >
            <Skeleton className="size-6" />
            <Skeleton className="h-5 w-40" />
          </div>
        ))}
      </div>
    </>
  )
}
