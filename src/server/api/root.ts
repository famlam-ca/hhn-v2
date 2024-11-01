import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

import { auditLogsRouter } from "./routers/audit-logs"
import { boardRouter } from "./routers/board"
import { cardRouter } from "./routers/card"
import { listRouter } from "./routers/list"
import { teamRouter } from "./routers/team"

export const appRouter = createTRPCRouter({
  team: teamRouter,
  board: boardRouter,
  list: listRouter,
  card: cardRouter,
  auditLogs: auditLogsRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
