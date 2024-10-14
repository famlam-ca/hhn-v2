import { postRouter } from "@/server/api/routers/post"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

import { kanbanRouter } from "./routers/kanban"
import { teamRouter } from "./routers/team"

export const appRouter = createTRPCRouter({
  post: postRouter,
  kanban: kanbanRouter,
  team: teamRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
