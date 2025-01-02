"use client"

import { Team } from "@prisma/client"
import { Check, ChevronsUpDown, LogOut, Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useProModal } from "@/hooks/use-pro-modal"
import { useSelectTeam } from "@/hooks/use-select-team"
import { useTeamModal } from "@/hooks/use-team-modal"
import { hasAvailableTeamCount } from "@/lib/user-limit"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/react"

interface TeamSwitcherProps {
  sessionId: string
  teamId: string
  teams: Team[]
  afterCreateTeamUrl?: string
  afterSelectTeamUrl?: string
  afterLeaveTeamUrl?: string
}

export function TeamSwitcher({
  sessionId,
  teamId,
  teams,
  afterSelectTeamUrl = "/dashboard",
  afterLeaveTeamUrl = "/dashboard",
}: TeamSwitcherProps) {
  const router = useRouter()
  const teamModal = useTeamModal()
  const proModal = useProModal()
  const { selectedTeam } = useSelectTeam()

  const utils = trpc.useUtils()
  const { mutate: leaveTeam, isPending } = trpc.team.leaveTeam.useMutation()
  const { mutate: setActiveTeam } = trpc.team.setActiveTeam.useMutation()
  const { data: activeTeam } = trpc.team.getActiveTeam.useQuery({
    teamId,
  })

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(activeTeam?.title ?? "")
  const [teamImageUrl, setTeamImageUrl] = useState<string>(
    activeTeam?.imageThumbUrl ?? "",
  )

  const handleLeaveTeam = () => {
    leaveTeam(
      { teamId: teams.find((team) => team.title === value)?.id ?? "" },
      {
        onSuccess: async () => {
          router.push(afterLeaveTeamUrl)
          await utils.team.getUserTeams.invalidate()
          router.refresh()
          setOpen(false)
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error.message,
          })
        },
      },
    )
  }

  const onClick = async () => {
    const canCreate = await hasAvailableTeamCount()
    if (canCreate) {
      teamModal.onOpen()
    } else {
      proModal.onOpen()
    }
  }

  useEffect(() => {
    if (selectedTeam) {
      setValue(selectedTeam.title)
      setTeamImageUrl(selectedTeam.imageThumbUrl)
    } else {
      setValue(activeTeam?.title ?? "")
      setTeamImageUrl(activeTeam?.imageThumbUrl ?? "")
    }
  }, [selectedTeam, activeTeam])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className="w-[150px] justify-between md:w-[200px]"
        >
          <div className="flex items-center gap-x-2 truncate text-muted-foreground">
            <div className="relative size-5 shrink-0">
              {teamImageUrl ? (
                <Image
                  fill
                  src={teamImageUrl}
                  alt="Team"
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center rounded-md bg-muted text-xs">
                  {value.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {value ? (
              <span className="truncate">{value}</span>
            ) : (
              "Select a team..."
            )}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex items-center justify-between">
            <CommandInput placeholder="Search team..." />
            <Button
              onClick={onClick}
              size="icon"
              variant="transparent"
              className="ml-auto hover:opacity-80"
            >
              <Plus className="mr-2 size-4" />
            </Button>
          </div>
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.id}
                  onSelect={(v) => {
                    if (v !== value) {
                      setValue(v)
                      setTeamImageUrl(team.imageThumbUrl)
                      setActiveTeam({
                        sessionId,
                        teamId: team.id,
                      })
                      router.push(
                        `${afterSelectTeamUrl?.replace(":id", team.id)}`,
                      )
                      setOpen(false)
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div className="relative size-5 shrink-0">
                    {team.imageThumbUrl ? (
                      <Image
                        fill
                        src={team.imageThumbUrl}
                        alt="Team"
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center rounded-md bg-muted text-xs">
                        {team.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {team.title}

                  <Check
                    className={cn(
                      "ml-auto mr-2 size-4",
                      value === team.title ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Separator className="my-2" />
        <LoadingButton
          disabled={teams.length === 1 || isPending}
          loading={isPending}
          variant="transparent"
          className="w-full justify-start text-alert-foreground hover:text-alert-foreground/80"
          onClick={handleLeaveTeam}
        >
          <LogOut
            className={cn("-mt-1 mr-2 size-4", {
              hidden: isPending,
            })}
          />
          Leave current team
        </LoadingButton>
      </PopoverContent>
    </Popover>
  )
}

TeamSwitcher.displayName = "TeamSwitcher"

export function TeamSwitcherSkeleton() {
  return <Skeleton className="h-9 w-[200px]" />
}
