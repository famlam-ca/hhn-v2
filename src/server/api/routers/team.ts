import {
  decrementAvailableTeamCount,
  hasAvailableTeamCount,
  incrementAvailableTeamCount,
} from "@/lib/user-limit"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { setActiveTeam } from "@/server/team"
import { Team } from "@/types"
import {
  CreateTeamSchema,
  GetActiveTeamSchema,
  LeaveTeamSchema,
  SetActiveTeamSchema,
} from "@/validators/team"
import { TRPCError } from "@trpc/server"

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(CreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const session = await ctx.db.session.findFirst({
        where: { userId: ctx.user.id },
        select: { id: true },
      })
      if (session === null) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not signed in",
        })
      }

      const canCreate = await hasAvailableTeamCount()
      if (!canCreate) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "You have reached the maximum number of boards. Upgrade to the Pro plan to create more.",
        })
      }

      const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUsername,
      ] = input.image.split("|")
      if (
        !imageId ||
        !imageThumbUrl ||
        !imageFullUrl ||
        !imageLinkHtml ||
        !imageUsername
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please select an image",
        })
      }

      const team = await ctx.db.team.create({
        data: {
          title: input.title,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageLinkHtml,
          imageUsername,
          members: {
            create: {
              userId: ctx.user.id,
              role: "OWNER",
            },
          },
        },
      })

      await setActiveTeam(team.id, session.id)

      await incrementAvailableTeamCount()

      return team
    }),

  getUserTeams: protectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.db.team.findMany({
      where: { members: { some: { userId: ctx.user.id } } },
      include: { boards: true, members: true },
    })
    return (teams as Team[]) ?? null
  }),

  getActiveTeam: protectedProcedure
    .input(GetActiveTeamSchema)
    .query(async ({ ctx, input }) => {
      const { teamId } = input

      const team = await ctx.db.team.findUnique({
        where: { id: teamId },
      })
      if (team === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        })
      }
      return (team as Team) ?? null
    }),

  leaveTeam: protectedProcedure
    .input(LeaveTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const { teamId } = input

      const team = await ctx.db.team.findUnique({
        where: { id: teamId },
        include: { members: true },
      })
      if (team === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        })
      }
      await ctx.db.teamMember.delete({
        where: {
          userId_teamId: {
            userId: ctx.user.id,
            teamId: teamId,
          },
        },
      })

      const remainingMembers = await ctx.db.teamMember.count({
        where: { teamId: teamId },
      })
      if (remainingMembers === 0) {
        await ctx.db.team.delete({
          where: { id: teamId },
        })
      }

      await decrementAvailableTeamCount()
    }),

  setActiveTeam: protectedProcedure
    .input(SetActiveTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const { sessionId, teamId } = input
      await ctx.db.session.update({
        where: { id: sessionId },
        data: { teamId },
      })
    }),
})
