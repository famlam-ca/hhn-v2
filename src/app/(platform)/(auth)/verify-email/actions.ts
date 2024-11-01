"use server"

import { getSession } from "@/server/session"
import { z } from "zod"

import { stripeRedirect } from "@/actions/stripe-redirect"
import {
  createEmailVerificationRequest,
  deleteEmailVerificationRequestCookie,
  deleteUserEmailVerificationRequest,
  getUserEmailVerificationRequestFromRequest,
  sendVerificationEmail,
  setEmailVerificationRequestCookie,
} from "@/server/email-verification"
import { updateUserEmailAndSetEmailAsVerified } from "@/server/user"
import { type ActionResult } from "@/types"

import { VerifyEmailSchema } from "./schema"

export async function verifyEmail(
  values: z.infer<typeof VerifyEmailSchema>,
): Promise<ActionResult> {
  const { session, user } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Not authenticated",
      key: "not_authenticated",
    }
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null) {
    return {
      success: false,
      message: "No verification request found",
      key: "no_verification_request",
    }
  }

  if (Date.now() >= verificationRequest.expiresAt.getTime()) {
    verificationRequest = await createEmailVerificationRequest(
      verificationRequest.userId,
      verificationRequest.email,
    )
    await sendVerificationEmail(
      user.name,
      verificationRequest.email,
      verificationRequest.code,
    )
    return {
      success: false,
      message: "The code has expired. We sent you a new one.",
      key: "code_expired",
    }
  }
  if (verificationRequest.code !== values.code) {
    return {
      success: false,
      message: "Invalid code",
      key: "invalid_code",
    }
  }

  await deleteUserEmailVerificationRequest(user.id)
  // TODO: Implement password reset requests
  // TODO: Invalidate all password reset requests
  // await invalidateUserPasswordResetRequests(user.id)
  await updateUserEmailAndSetEmailAsVerified(user.id, verificationRequest.email)
  await deleteEmailVerificationRequestCookie()

  await stripeRedirect({ interval: values.interval, plan: values.plan })

  return {
    success: true,
    message: "Email verified",
    key: "email_verified",
  }
}

export async function resendEmailVerificationCode(): Promise<ActionResult> {
  const { session, user } = await getSession()
  if (session === null) {
    return {
      success: false,
      message: "Not authenticated",
      key: "not_authenticated",
    }
  }

  let verificationRequest = await getUserEmailVerificationRequestFromRequest()
  if (verificationRequest === null) {
    if (user.emailVerified) {
      return {
        success: false,
        message: "Email already verified",
        key: "email_already_verified",
      }
    }
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      user.email,
    )
  } else {
    verificationRequest = await createEmailVerificationRequest(
      user.id,
      verificationRequest.email,
    )
  }
  sendVerificationEmail(
    user.name,
    verificationRequest.email,
    verificationRequest.code,
  )
  setEmailVerificationRequestCookie(verificationRequest)

  return {
    success: true,
    message: "New verification code sent",
    key: "verification_code_sent",
  }
}
