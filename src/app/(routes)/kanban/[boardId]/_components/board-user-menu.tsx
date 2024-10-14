"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Hint } from "@/components/hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BoardMember } from "@/types/board"
import { User } from "@/types/user"

interface BoardUserMenuProps {
  user: User
  currentMember: BoardMember
}

export const BoardUserMenu = ({ user, currentMember }: BoardUserMenuProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const role = currentMember.role
  const label =
    role === "owner"
      ? "You are the owner of this board."
      : role === "admin"
        ? "You are an admin of this board."
        : role === "member"
          ? "You are a member of this board."
          : role === "observer"
            ? "You are an observer of this board."
            : "You are a guest of this board."

  const blur = () => {
    setOpen(!open)
  }

  return (
    <Popover open={open} onOpenChange={blur}>
      <PopoverTrigger>
        <Hint label={label} side="bottom" asChild>
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
        </Hint>
      </PopoverTrigger>
      <PopoverContent className="bg-accent p-0 text-muted-foreground">
        <div className="relative h-40">
          <div className="relative h-1/2 bg-primary p-4">
            <button
              onClick={blur}
              className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted-foreground/10"
            >
              <X className="size-4 text-foreground" />
            </button>

            <Avatar className="absolute top-1/3 h-20 w-20">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="bg-background">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>

            <div className="absolute left-1/3 top-1/3 pl-2 text-foreground">
              <h2 className="font-bold">{user.display_name}</h2>
              <p className="text-sm">@{user.username}</p>
            </div>
          </div>

          <Link
            href={`/u/${user.username}/profile`}
            className="absolute bottom-0 w-full rounded-sm px-4 py-2 text-left hover:bg-muted-foreground/10"
          >
            Edit profile info
          </Link>
        </div>

        <div className="mx-4 my-2 h-px bg-muted-foreground/50" />

        <button className="w-full rounded-sm px-4 py-2 text-left hover:bg-muted-foreground/10">
          View member's board activity
        </button>
      </PopoverContent>
    </Popover>
  )
}
