import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),

    DATABASE_URL: z.string(),

    NEXT_URL: z.string().url(),

    RESEND_API_KEY: z.string(),
    EMAIL_USER: z.string(),

    STRIPE_API_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    DATABASE_URL: process.env.DATABASE_URL,

    NEXT_URL: process.env.NEXT_URL,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_USER: process.env.EMAIL_USER,

    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY:
      process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
})
