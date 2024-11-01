import { startCase } from "lodash"
import { redirect } from "next/navigation"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Separator } from "@/components/ui/separator"
import { checkSubscription } from "@/lib/subscription"
import { getAvailableTeamCount } from "@/lib/user-limit"
import { getSession } from "@/server/session"
import { api } from "@/trpc/server"

import { Sidebar } from "../_components/sidebar"
import { Info } from "./_components/info"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamId: string }>
}) {
  const { teamId } = await params
  const team = await api.team.getActiveTeam({ teamId })
  return {
    title: startCase(team.title || "Team"),
  }
}

export default async function TeamIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ teamId: string }>
}) {
  const { teamId } = await params
  const { session } = await getSession()
  if (session === null) {
    redirect("/sign-in")
  }
  const { plan } = await checkSubscription()
  const availableCount = await getAvailableTeamCount()

  return (
    <MaxWidthWrapper className="pt-20 md:pt-24">
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:block">
          <Sidebar
            plan={plan}
            availableCount={availableCount}
            sessionId={session.id}
          />
        </div>
        <div className="w-full">
          <Info teamId={teamId} plan={plan} />
          <Separator className="my-4" />
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
