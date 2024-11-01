import { PLAN } from "@prisma/client"
import { z } from "zod"

export const VerifyEmailSchema = z.object({
  code: z.string({
    invalid_type_error: "Invalid code",
    required_error: "Code is required",
  }),
  plan: z.nativeEnum(PLAN).optional(),
  interval: z.enum(["month", "year"]).optional(),
})
