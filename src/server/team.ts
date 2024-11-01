import { Team } from "@prisma/client"

import { db } from "@/server/db"

export async function getTeamByUserId(userId: string): Promise<Team | null> {
  return db.team.findFirst({
    where: { members: { some: { userId } } },
  })
}

export async function setActiveTeam(teamId: string, sessionId: string) {
  await db.session.update({
    where: { id: sessionId },
    data: { teamId },
  })
}
