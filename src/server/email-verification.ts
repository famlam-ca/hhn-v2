import { cookies } from "next/headers"

import { generateOTP } from "@/lib/utils"
import { getSession } from "@/server/session"
import { db } from "@/server/db"
import { sendEmail } from "@/server/email"

export async function createEmailVerificationRequest(
  userId: string,
  email: string,
): Promise<EmailVerificationRequest> {
  await deleteUserEmailVerificationRequest(userId)
  const code = generateOTP()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10)
  const request = await db.emailVerificationRequest.create({
    data: { email, code, userId, expiresAt },
  })
  return request
}

export async function getUserEmailVerificationRequest(
  userId: string,
  id: string,
): Promise<EmailVerificationRequest | null> {
  const row = await db.emailVerificationRequest.findUnique({
    where: { id, userId },
  })
  if (row === null) {
    return row
  }
  const request: EmailVerificationRequest = {
    id: row.id,
    email: row.email,
    code: row.code,
    userId: row.userId,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  }
  return request
}

export async function deleteUserEmailVerificationRequest(
  userId: string,
): Promise<void> {
  await db.emailVerificationRequest.deleteMany({
    where: { userId },
  })
}

export async function sendVerificationEmail(
  name: string,
  email: string,
  code: string,
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Verify your email",
    template: "verify-email-request",
    data: { name, code },
  })
}

export async function setEmailVerificationRequestCookie(
  request: EmailVerificationRequest,
): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("email_verification", request.id, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: request.expiresAt,
  })
}

export async function deleteEmailVerificationRequestCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("email_verification", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })
}

export async function getUserEmailVerificationRequestFromRequest(): Promise<EmailVerificationRequest | null> {
  const { user } = await getSession()
  if (user === null) {
    return null
  }
  const id = (await cookies()).get("email_verification")?.value ?? null
  if (id === null) {
    return null
  }
  const request = await getUserEmailVerificationRequest(user.id, id)
  if (request === null) {
    deleteEmailVerificationRequestCookie()
  }
  return request
}

interface EmailVerificationRequest {
  id: string
  email: string
  code: string
  userId: string
  expiresAt: Date
}
