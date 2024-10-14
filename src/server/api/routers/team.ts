import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { Team } from "@/types/team"
import { CreateTeamSchema } from "@/validators/team"
import { TRPCError } from "@trpc/server"

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(CreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const existingTeam = await ctx.db.team.findUnique({
        where: { name: input.name },
      })
      if (existingTeam) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Team with this name already exists",
        })
      } else {
        const team = await ctx.db.team.create({
          data: { name: input.name, ownerId: ctx.user.id },
          select: { id: true },
        })

        await ctx.db.teamMember.create({
          data: { role: "owner", userId: ctx.user.id, teamId: team.id },
        })

        return (team as Team) ?? null
      }
    }),

  getUserTeams: protectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.db.team.findMany({
      where: { members: { some: { userId: ctx.user.id } } },
      include: { boards: true },
    })
    return (teams as Team[]) ?? null
  }),

  getUserTeamsAsOwnerOrAdmin: protectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.db.team.findMany({
      where: {
        OR: [
          { ownerId: ctx.user.id },
          { members: { some: { userId: ctx.user.id, role: "admin" } } },
        ],
      },
      include: { boards: true },
    })
    return (teams as Team[]) ?? null
  }),
})
