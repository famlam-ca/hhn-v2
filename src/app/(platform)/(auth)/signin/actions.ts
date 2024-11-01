"use server"

import { compare } from "bcrypt"
import { redirect } from "next/navigation"
import { z } from "zod"

import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/server/session"
import { getTeamByUserId } from "@/server/team"
import { getUserByEmail } from "@/server/user"
import { type ActionResult } from "@/types"

import { SignInSchema } from "./schema"

export async function SignIn(
  values: z.infer<typeof SignInSchema>,
): Promise<ActionResult> {
  try {
    SignInSchema.parse(values)
  } catch {
    return {
      success: false,
      message: "Invalid email or password",
      key: "invalid_email_or_password",
    }
  }

  const user = await getUserByEmail(values.email)
  if (user === null) {
    return {
      success: false,
      message: "No user with that email found",
      key: "no_user_found",
    }
  }

  const isPasswordValid = await compare(values.password, user.password)
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid password",
      key: "invalid_password",
    }
  }

  const sessionToken = generateSessionToken()
  const team = await getTeamByUserId(user.id)
  const session = await createSession(sessionToken, user.id, team?.id)
  setSessionTokenCookie(sessionToken, session.expiresAt)

  if (!user.emailVerified) {
    return redirect("/verify-email")
  }

  return redirect(`/dashboard/${team?.id}`)
}
