"use client"

import { PLAN, Team } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import { useLocalStorage } from "usehooks-ts"

import { Accordion } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MAX_BASIC_TEAMS,
  MAX_FREE_TEAMS,
  MAX_PRO_TEAMS,
} from "@/constants/teams"
import { useProModal } from "@/hooks/use-pro-modal"
import { useSelectTeam } from "@/hooks/use-select-team"
import { useTeamModal } from "@/hooks/use-team-modal"
import { hasAvailableTeamCount } from "@/lib/user-limit"
import { trpc } from "@/trpc/react"

import { NavItem } from "./nav-item"

export function Sidebar({
  plan,
  availableCount,
  storageKey = "t-sidebar-state",
  sessionId,
}: {
  plan: PLAN
  availableCount: number
  storageKey?: string
  sessionId: string
}) {
  const teamModal = useTeamModal()
  const proModal = useProModal()
  const { teamId } = useParams()
  const { setSelectedTeam } = useSelectTeam()

  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
    storageKey,
    {},
  )

  const { data: teams, isLoading } = trpc.team.getUserTeams.useQuery()
  const { mutate: setActiveTeam } = trpc.team.setActiveTeam.useMutation()

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc
    },
    [],
  )

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  const onClick = async () => {
    const canCreate = await hasAvailableTeamCount()
    if (canCreate) {
      teamModal.onOpen()
    } else {
      proModal.onOpen()
    }
  }

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team)
    setActiveTeam({
      sessionId,
      teamId: team.id,
    })
  }

  if (!teams || isLoading) {
    return <Sidebar.Skeleton />
  }

  return (
    <>
      <div className="flex items-center text-xs font-medium">
        <span className="pl-4 pr-2">Workspaces</span>
        <Badge variant="outline">
          <span className="text-xs">
            {plan === "PRO"
              ? `${MAX_PRO_TEAMS - availableCount} / ${MAX_PRO_TEAMS}`
              : plan === "BASIC"
                ? `${MAX_BASIC_TEAMS - availableCount} / ${MAX_BASIC_TEAMS}`
                : `${MAX_FREE_TEAMS - availableCount} / ${MAX_FREE_TEAMS}`}
          </span>
        </Badge>
        <Button
          onClick={onClick}
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <Separator />

      <ScrollArea className="h-[calc(100dvh-4rem)] md:h-[calc(100dvh-9rem)]">
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValue}
          className="space-y-2"
        >
          {teams.map((team) => (
            <NavItem
              key={team.id}
              team={team as Team}
              isActive={team.id === teamId}
              isExpanded={expanded[team.id]}
              onExpand={onExpand}
              onSelectTeam={handleSelectTeam}
            />
          ))}
        </Accordion>
      </ScrollArea>
    </>
  )
}

Sidebar.Skeleton = function SidebarSkeleton() {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <Skeleton className="h-10 w-[50%]" />
        <Skeleton className="size-10" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <NavItem.Skeleton key={i} />
        ))}
      </div>
    </>
  )
}
