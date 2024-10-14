"use client"

import { BoardVisibility } from "@prisma/client"
import { Check, Globe2, LockKeyhole, Users2 } from "lucide-react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface VisibilityMenuProps {
  visibility: BoardVisibility
  changeVisibility: (visibility: BoardVisibility) => void
}

type VisibilityMenuItemProps = {
  icon: React.ReactNode
  label: string
  description: string
  isChecked: boolean
  onClick: (visibility: BoardVisibility) => void
}

export const VisibilityMenu = ({
  visibility,
  changeVisibility,
}: VisibilityMenuProps) => {
  const MENU_ITEMS: VisibilityMenuItemProps[] = [
    {
      icon: <LockKeyhole className="stroke-alert size-3" />,
      label: "Private",
      description:
        "Only board members can see this board. Board owners can close or remove the board.",
      isChecked: visibility === "private",
      onClick: () => changeVisibility("private"),
    },
    {
      icon: <Users2 className="size-3" />,
      label: "Team",
      description:
        "Only team members can see this board. Board owners can close or remove the board.",
      isChecked: visibility === "team",
      onClick: () => changeVisibility("team"),
    },
    {
      icon: <Globe2 className="stroke-success size-3" />,
      label: "Public",
      description:
        "Anyone on the internet can see this board. Only board members can edit.",
      isChecked: visibility === "public",
      onClick: () => changeVisibility("public"),
    },
  ]

  return (
    <Popover>
      <Hint label="Change visibility" asChild>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost" className="group">
            <Users2 className="size-4 transition-all group-hover:scale-110" />
          </Button>
        </PopoverTrigger>
      </Hint>
      <PopoverContent className="w-[400px] bg-accent p-0">
        <div className="flex h-14 w-full items-center justify-center">
          <Label>Change visibility</Label>
        </div>

        <div className="flex flex-col">
          {MENU_ITEMS.map((item, i) => (
            <VisibilityMenuItem key={i} {...item} onClick={changeVisibility} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

const VisibilityMenuItem = ({
  icon,
  label,
  description,
  isChecked,
  onClick,
}: VisibilityMenuItemProps) => {
  return (
    <button
      onClick={() => onClick(label.toLowerCase() as BoardVisibility)}
      className="space-y-2 rounded-sm p-4 text-left hover:bg-muted-foreground/10"
    >
      <div className="flex items-center gap-2">
        {icon}
        <Label>{label}</Label>
        {isChecked ? <Check className="size-3" /> : null}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  )
}
