import { redirect } from "next/navigation"

import { Team } from "@/types"

export function TeamControl({ teams }: { teams: Team[] }) {
  return redirect(`/dashboard/${teams[0].id}`)
}
