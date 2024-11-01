import { z } from "zod"

export const SignUpSchema1 = z.object({
  displayName: z
    .string()
    .refine(
      (v) => /.{3,}/.test(v),
      "Display name must be at least 3 characters long",
    )
    .refine(
      (v) => /^[a-zA-Z0-9_.]+$/i.test(v),
      "Display Name must contain only letters, numbers, underscores, and periods",
    )
    .refine(
      (v) => /^.{1,20}$/.test(v),
      "Display name must be at most 20 characters long",
    )
    .refine(
      (v) => /^(?!.*[_.]{2,})[^._].*[^._]$/.test(v),
      "Display name cannot contain consecutive, leadning or trailing underscores or periods",
    ),
  name: z.string(),
})

export const SignUpSchema2 = z
  .object({
    firstName: z
      .string()
      .transform((v) => v.trim())
      .refine(
        (v) => /^[A-Za-z\s]*$/i.test(v),
        "First Name may only contain letters",
      )
      .optional(),
    lastName: z
      .string()
      .transform((v) => v.trim())
      .refine(
        (v) => /^[A-Za-z\s]*$/i.test(v),
        "Last Name may only contain letters",
      )
      .optional(),
    email: z
      .string()
      .email()
      .refine(
        (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
        "Must be a valid email address",
      ),
    password: z
      .string()
      .refine(
        (v) => /.{12,}/.test(v),
        "Password must be at least 12 characters long",
      )
      .refine(
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    passwordConfirmation: z
      .string()
      .refine(
        (v) => /.{12,}/.test(v),
        "Password must be at least 12 characters long",
      )
      .refine(
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  })
