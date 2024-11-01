import { PLAN } from "@prisma/client"

import {
  MAX_FREE_BOARDS,
  MAX_BASIC_BOARDS,
  MAX_PRO_BOARDS,
} from "@/constants/boards"
import {
  MAX_FREE_TEAMS,
  MAX_BASIC_TEAMS,
  MAX_PRO_TEAMS,
} from "@/constants/teams"
import { db } from "@/server/db"
import { getSession } from "@/server/session"
import { checkSubscription } from "@/lib/subscription"

export async function incrementAvailableTeamCount() {
  const { session, user } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const userLimit = await db.userLimit.findUnique({
    where: { userId: user.id },
  })
  if (userLimit) {
    await db.userLimit.update({
      where: { userId: user.id },
      data: {
        teamCount: userLimit.teamCount + 1,
      },
    })
  } else {
    await db.userLimit.create({
      data: {
        userId: user.id,
        teamCount: 1,
      },
    })
  }
}

export async function incrementAvailableBoardCount(teamId: string) {
  const { session } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const teamLimit = await db.teamLimit.findUnique({
    where: { teamId },
  })
  if (teamLimit) {
    await db.teamLimit.update({
      where: { teamId },
      data: {
        boardCount: teamLimit.boardCount + 1,
      },
    })
  } else {
    await db.teamLimit.create({
      data: {
        teamId,
        boardCount: 1,
      },
    })
  }
}

export async function decrementAvailableTeamCount() {
  const { session, user } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const userLimit = await db.userLimit.findUnique({
    where: { userId: user.id },
  })
  if (userLimit) {
    await db.userLimit.update({
      where: { userId: user.id },
      data: {
        teamCount: userLimit.teamCount > 0 ? userLimit.teamCount - 1 : 0,
      },
    })
  } else {
    await db.userLimit.create({
      data: {
        userId: user.id,
        teamCount: 1,
      },
    })
  }
}

export async function decrementAvailableBoardCount(teamId: string) {
  const { session } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const teamLimit = await db.teamLimit.findUnique({
    where: { teamId },
  })
  if (teamLimit) {
    await db.teamLimit.update({
      where: { teamId },
      data: {
        boardCount: teamLimit.boardCount > 0 ? teamLimit.boardCount - 1 : 0,
      },
    })
  } else {
    await db.teamLimit.create({
      data: {
        teamId,
        boardCount: 0,
      },
    })
  }
}

export async function hasAvailableTeamCount() {
  const { session, user } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const { plan } = await checkSubscription()
  const maxTeams =
    plan === PLAN.PRO
      ? MAX_PRO_TEAMS
      : plan === PLAN.BASIC
        ? MAX_BASIC_TEAMS
        : MAX_FREE_TEAMS

  const userLimit = await db.userLimit.findUnique({
    where: { userId: user.id },
  })
  if (!userLimit || userLimit.teamCount < maxTeams) {
    return true
  } else {
    return false
  }
}

export async function hasAvailableBoardCount(teamId: string) {
  const { session } = await getSession()
  if (session === null) {
    throw new Error("Unauthorized")
  }

  const { plan } = await checkSubscription()
  const maxBoards =
    plan === PLAN.PRO
      ? MAX_PRO_BOARDS
      : plan === PLAN.BASIC
        ? MAX_BASIC_BOARDS
        : MAX_FREE_BOARDS

  const teamLimit = await db.teamLimit.findUnique({
    where: { teamId },
  })
  if (!teamLimit || teamLimit.boardCount < maxBoards) {
    return true
  } else {
    return false
  }
}

export async function getAvailableTeamCount() {
  const { session, user } = await getSession()
  if (session === null) {
    return 0
  }

  const { plan } = await checkSubscription()
  const maxTeams =
    plan === PLAN.PRO
      ? MAX_PRO_TEAMS
      : plan === PLAN.BASIC
        ? MAX_BASIC_TEAMS
        : MAX_FREE_TEAMS

  const userLimit = await db.userLimit.findUnique({
    where: { userId: user.id },
  })

  const currentTeamCount = userLimit ? userLimit.teamCount : 0

  const availableTeams = maxTeams - currentTeamCount

  return Math.max(availableTeams, 0)
}

export async function getAvailableBoardCount(teamId: string) {
  const { session } = await getSession()
  if (session === null) {
    return 0
  }

  const teamLimit = await db.teamLimit.findUnique({
    where: { teamId },
  })
  if (teamLimit === null) {
    return 0
  }
  return teamLimit.boardCount
}
