"use server"

import {
  deleteSessionTokenCookie,
  getSession,
  invalidateSession,
} from "@/server/session"
import { type ActionResult } from "@/types"

export async function signOut(): Promise<ActionResult> {
  const { session } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Not authenticated",
      key: "not_authenticated",
    }
  }
  await invalidateSession(session.id)
  deleteSessionTokenCookie()

  return {
    success: true,
    message: "Signed out",
    key: "signed_out",
  }
}
