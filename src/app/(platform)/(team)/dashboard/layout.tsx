import { PropsWithChildren } from "react"

import { api, HydrateClient } from "@/trpc/server"

export default function TeamLayout({ children }: PropsWithChildren) {
  void api.team.getUserTeams()

  return <HydrateClient>{children}</HydrateClient>
}
