import { Plus } from "lucide-react"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { FormPopover } from "@/components/form/form-popover"
import { Logo } from "@/components/logo"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/user-button"
import { checkSubscription } from "@/lib/subscription"
import { getAvailableTeamCount, hasAvailableTeamCount } from "@/lib/user-limit"
import { getSession } from "@/server/session"
import { api, HydrateClient } from "@/trpc/server"

import { MobileSidebar } from "../dashboard/_components/mobile-sidebar"
import { TeamSwitcher, TeamSwitcherSkeleton } from "./team-switcher"

export async function Navbar() {
  const { session, user, teamId } = await getSession()
  if (session === null || teamId === null) {
    return redirect("/signin")
  }
  const { plan } = await checkSubscription()
  const availableCount = await getAvailableTeamCount()
  const canCreate = await hasAvailableTeamCount()

  const teams = await api.team.getUserTeams()

  return (
    <nav className="fixed top-0 z-50 flex h-16 w-full items-center border-b bg-background px-4 shadow-sm">
      <MobileSidebar
        sessionId={session.id}
        plan={plan}
        availableCount={availableCount}
      />

      <MaxWidthWrapper className="flex items-center">
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex">
            <Logo animate href={`/dashboard/${teamId}`} />
          </div>

          <FormPopover align="start" side="bottom" sideOffset={18}>
            <Button
              disabled={!canCreate}
              size="sm"
              variant="default"
              className="hidden h-auto rounded-sm px-2 py-1.5 md:flex"
            >
              <Plus className="size-4" />
              Create
            </Button>
          </FormPopover>
          <FormPopover>
            <Button
              disabled={!canCreate}
              size="sm"
              variant="default"
              className="rounded-sm md:hidden"
            >
              <Plus className="size-4" />
            </Button>
          </FormPopover>
        </div>

        <div className="ml-auto flex items-center gap-x-2">
          <Suspense fallback={<TeamSwitcherSkeleton />}>
            <HydrateClient>
              <TeamSwitcher
                sessionId={session.id}
                teamId={teamId}
                teams={teams}
                afterSelectTeamUrl="/dashboard/:id"
                afterLeaveTeamUrl="/dashboard"
              />
            </HydrateClient>
          </Suspense>
          <UserButton user={user} />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
