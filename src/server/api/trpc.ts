import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { db } from "@/server/db"

import { getSession } from "@/server/session"

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { session, user } = await getSession()
  return {
    db,
    session,
    user,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now()

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  const result = await next()

  const end = Date.now()
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

  return result
})

export const publicProcedure = t.procedure.use(timingMiddleware)

export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return next({
      ctx: {
        session: { ...ctx.session },
        user: { ...ctx.user },
      },
    })
  })
