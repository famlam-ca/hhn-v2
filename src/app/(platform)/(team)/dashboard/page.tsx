import { redirect } from "next/navigation"

import { api, HydrateClient } from "@/trpc/server"

import { TeamControl } from "./_components/team-control"

export default async function DashboardPage() {
  const teams = await api.team.getUserTeams()
  if (teams.length === 0) {
    return redirect("/onboarding")
  }

  return (
    <HydrateClient>
      <TeamControl teams={teams} />
    </HydrateClient>
  )
}
