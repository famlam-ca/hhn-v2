import { sha256 } from "@oslojs/crypto/sha2"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"
import type { Session, User } from "@prisma/client"
import { cookies } from "next/headers"
import { cache } from "react"

import { db } from "@/server/db"

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })
  if (session === null) {
    return { session: null, user: null, teamId: null }
  }
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.session.delete({
      where: { id: session.id },
    })
    return { session: null, user: null, teamId: null }
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db.session.update({
      where: { id: session.id },
      data: { expiresAt: session.expiresAt },
    })
  }
  return { session, user: session.user, teamId: session.teamId }
}

export const getSession = cache(async (): Promise<SessionValidationResult> => {
  const token = (await cookies()).get("session")?.value ?? null
  if (token === null) {
    return { session: null, user: null, teamId: null }
  }
  const result = await validateSessionToken(token)
  return result
})

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.session.delete({
    where: { id: sessionId },
  })
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await db.session.deleteMany({
    where: { userId },
  })
}

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  })
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("session", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })
}

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20) // 160 bits
  crypto.getRandomValues(tokenBytes)
  const token = encodeBase32LowerCaseNoPadding(tokenBytes).toLowerCase()
  return token
}

export async function createSession(
  token: string,
  userId: string,
  teamId?: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  return await db.session.create({
    data: {
      id: sessionId,
      userId,
      teamId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  })
}

type SessionValidationResult =
  | { session: Session; user: User; teamId: string | null }
  | { session: null; user: null; teamId: null }
