import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    JWT_SECRET: z.string(),
    NEXT_URL: z.string().url(),

    RESEND_API_KEY: z.string(),
    EMAIL_USER: z.string(),

    UPLOADTHING_TOKEN: z.string(),

    PROXMOX_API_URL: z.string().url(),
    PROXMOX_API_TOKEN: z.string(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_URL: process.env.NEXT_URL,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_USER: process.env.EMAIL_USER,

    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,

    PROXMOX_API_URL: process.env.PROXMOX_API_URL,
    PROXMOX_API_TOKEN: process.env.PROXMOX_API_TOKEN,

    NODE_ENV: process.env.NODE_ENV,

    // Client
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
