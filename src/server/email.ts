import { Resend } from "resend"

import { emailRenderer, EmailTemplates } from "@/components/email-renderer"
import { env } from "@/env"
import { db } from "@/server/db"

export async function sendEmail({
  to,
  subject,
  template,
  data,
}: {
  to: string
  subject: string
  template: EmailTemplates
  data: object
}): Promise<void> {
  const body = await emailRenderer({ template, data })
  if (body === null) {
    throw new Error("Invalid email template")
  }
  const resend = new Resend(env.RESEND_API_KEY)
  await resend.emails.send({
    from: `HHN <${env.EMAIL_USER}>`,
    to,
    subject,
    html: body,
  })
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
  const row = await db.user.findUnique({
    where: { email },
  })
  if (row === null) {
    return true
  }
  return false
}
