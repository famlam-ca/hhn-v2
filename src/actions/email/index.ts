"use server"

import jwt from "jsonwebtoken"
import { Resend } from "resend"

import { emailRenderer } from "@/components/email-renderer"
import { env } from "@/env"
import { db } from "@/server/db"
import { EmailTemplates } from "@/validators/email"

type EmailProps = {
  to: string
  subject: string
  template?: EmailTemplates
  data: {}
}

export const sendEmail = async ({
  to,
  subject,
  template = "test-email",
  data,
}: EmailProps) => {
  const body = await emailRenderer({ template, data })
  if (!body) {
    return {
      succes: false,
      message: "Invalid email template",
    }
  }

  const resend = new Resend(env.RESEND_API_KEY)

  await resend.emails.send({
    from: `HHN <${env.EMAIL_USER}>`,
    to,
    subject,
    html: body,
  })

  return {
    success: true,
    message: "Email sent",
  }
}

export const resendVerificationEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    })
    if (!user) {
      return {
        success: false,
        message: "User not found!",
      }
    }

    if (user.isEmailVerified === true) {
      return {
        success: true,
        message: "Email already verified",
      }
    }

    const existingCode = await db.emailVerificationToken.findFirst({
      where: { userId: user.id },
    })
    if (!existingCode) {
      return {
        success: false,
        message: "Verification code not found!",
      }
    }

    const sentAt = new Date(existingCode.sentAt)
    const isOneMinutePassed = new Date().getTime() - sentAt.getTime() > 60000
    if (!isOneMinutePassed) {
      return {
        success: false,
        message:
          "Please wait " +
          (60 - Math.floor(new Date().getTime() - sentAt.getTime()) / 1000) +
          " second(s) before resending the email.",
      }
    }

    const token = Math.random().toString().substring(2, 8)

    await db.emailVerificationToken.update({
      where: {
        id: existingCode.id,
        userId: user.id,
      },
      data: {
        token,
        sentAt: new Date(Date.now()),
      },
    })

    const jwtToken = jwt.sign(
      { email, userId: user.id, token },
      process.env.JWT_SECRET!,
      { expiresIn: "5m" },
    )

    const url = `${process.env.NEXT_URL}/api/verify-email?token=${jwtToken}`

    const data = {
      url,
      username: user.username,
    }

    await sendEmail({
      to: email,
      subject: "Verify your email.",
      template: "verify-email",
      data,
    })

    await db.session.deleteMany({
      where: { userId: user.id },
    })

    return {
      success: true,
      message: `Verification email sent to ${email}!`,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const isEmailVerified = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user) {
    return {
      success: false,
      message: "Account not found!",
    }
  }

  if (user.isEmailVerified === true) {
    return {
      success: true,
      message: "Email already verified!",
      key: "email_already_verified",
    }
  }

  return {
    success: false,
    message: "Email not verified!",
    key: "email_not_verified",
  }
}
