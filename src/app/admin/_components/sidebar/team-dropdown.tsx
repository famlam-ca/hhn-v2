"use client"

import { Team } from "@prisma/client"
import { ChevronsUpDown, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useTeamModal } from "@/hooks/use-team-modal"

export function TeamDropdown({
  initialTeam,
  teams,
}: {
  initialTeam: Team
  teams: Team[]
}) {
  const { onOpen } = useTeamModal()

  const [activeTeam, setActiveTeam] = useState(initialTeam)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image
            src={activeTeam.imageThumbUrl}
            alt={activeTeam.title}
            width={100}
            height={100}
            className="size-8 rounded-lg object-cover"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.title}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Teams
        </DropdownMenuLabel>
        {teams.map((team, index) => (
          <DropdownMenuItem
            key={team.title}
            onClick={() => setActiveTeam(team)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <Image
                src={team.imageThumbUrl}
                alt={team.title}
                width={100}
                height={100}
                className="size-4 shrink-0 rounded-sm object-cover"
              />
            </div>
            {team.title}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onOpen()} className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">Add team</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
