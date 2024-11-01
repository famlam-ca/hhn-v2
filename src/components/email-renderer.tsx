import { render } from "@react-email/components"

import PasswordResetEmail from "../../emails/reset-password"
import VerificationEmail from "../../emails/verify-email"

export type EmailTemplates = "verify-email-request" | "password-reset-request"

const emails: Record<EmailTemplates, React.ComponentType<{ data: object }>> = {
  "verify-email-request": VerificationEmail,
  "password-reset-request": PasswordResetEmail,
}

export async function emailRenderer({
  template,
  data,
}: {
  template: EmailTemplates
  data: object
}) {
  const EmailComponents = emails[template]
  return render(<EmailComponents data={data} />)
}
