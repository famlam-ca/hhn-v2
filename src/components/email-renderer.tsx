"use server"

import { render } from "@react-email/components"

import { EmailTemplates } from "@/validators/email"

import PasswordChanged from "../../emails/password-was-reset"
import ResetPassword from "../../emails/reset-password"
import SupportTicket from "../../emails/support-ticket"
import TestEmail from "../../emails/test-email"
import VerifyEmail from "../../emails/verify-email"

type EmailComponentsType = {
  [key in EmailTemplates]: React.ComponentType<{ data: {} }>
}

const emailComponents: EmailComponentsType = {
  "test-email": TestEmail,
  "verify-email": VerifyEmail,
  "reset-password": ResetPassword,
  "password-changed": PasswordChanged,
  "support-ticket": SupportTicket,
}

type EmailRendererProps = {
  template: EmailTemplates
  data: {}
}

export const emailRenderer = async ({
  template,
  data = {},
}: EmailRendererProps) => {
  const EmailComponents =
    emailComponents[template as keyof typeof emailComponents]

  return render(<EmailComponents data={data} />)
}
