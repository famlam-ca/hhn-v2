import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { GetAuditLogsByCardIdSchema } from "@/validators/auditlog"

export const auditLogsRouter = createTRPCRouter({
  getAuditLogsByCardId: protectedProcedure
    .input(GetAuditLogsByCardIdSchema)
    .query(async ({ ctx, input }) => {
      const auditLogs = await ctx.db.auditLog.findMany({
        where: {
          teamId: input.teamId,
          entityId: input.cardId,
          entityType: "CARD",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      })
      return auditLogs
    }),
})
