"use server"

import { z } from "zod"

import { checkEmailAvailability } from "@/server/email"
import { checkNameAvailability, createUser } from "@/server/user"

import {
  createEmailVerificationRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/server/email-verification"
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/server/session"
import { createFirstUserTeam } from "@/server/user"
import { type ActionResult } from "@/types"

import { SignUpSchema1, SignUpSchema2 } from "./schema"

export async function signUp(
  values: z.infer<typeof SignUpSchema1> & z.infer<typeof SignUpSchema2>,
): Promise<ActionResult> {
  const isEmailAvailable = await checkEmailAvailability(values.email)
  if (!isEmailAvailable) {
    return {
      success: false,
      message: "Email is already taken",
      key: "email_taken",
    }
  }
  const isNameAvailable = await checkNameAvailability(values.name)
  if (!isNameAvailable) {
    return {
      success: false,
      message: "Username is already taken",
      key: "username_taken",
    }
  }

  try {
    const user = await createUser(values)
    const emailVerification = await createEmailVerificationRequest(
      user.id,
      user.email,
    )
    sendVerificationEmail(
      user.name,
      emailVerification.email,
      emailVerification.code,
    )
    setEmailVerificationRequestCookie(emailVerification)

    const sessionToken = generateSessionToken()
    const team = await createFirstUserTeam(user.id)
    const session = await createSession(sessionToken, user.id, team.id)
    setSessionTokenCookie(sessionToken, session.expiresAt)

    return {
      success: true,
      message: "Redirecting to email verification",
      key: "email_verification",
    }
  } catch {
    return {
      success: false,
      message: "Something went wrong",
      key: "unknown_error",
    }
  }
}
