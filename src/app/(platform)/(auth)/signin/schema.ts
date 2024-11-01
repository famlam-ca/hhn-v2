import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().min(2).max(50),
  password: z
    .string()
    .min(12, { message: "Password must be at least 12 characters long" }),
})
