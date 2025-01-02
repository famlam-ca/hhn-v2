import { createAuditLog } from "@/lib/create-audit-log"
import {
  decrementAvailableBoardCount,
  hasAvailableBoardCount,
  incrementAvailableBoardCount,
} from "@/lib/user-limit"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import {
  CreateBoardSchema,
  DeleteBoardSchema,
  GetBoardsByTeamIdSchema,
  UpdateBoardTitleSchema,
} from "@/validators/board"
import { TRPCError } from "@trpc/server"

export const boardRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(CreateBoardSchema)
    .mutation(async ({ ctx, input }) => {
      const { teamId, ...values } = input

      const canCreate = await hasAvailableBoardCount(teamId)
      if (!canCreate) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You have reached the maximum number of boards.",
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
          message: "Missing fields. Failed to create board.",
        })
      }

      const board = await ctx.db.board.create({
        data: {
          title: values.title.trim(),
          teamId: teamId,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageLinkHtml,
          imageUsername,
        },
      })

      await incrementAvailableBoardCount(teamId)

      await createAuditLog({
        teamId: teamId,
        entityId: board.id,
        entityTitle: board.title,
        entityType: "BOARD",
        action: "CREATE",
      })

      return board ?? null
    }),

  updateBoardTitle: protectedProcedure
    .input(UpdateBoardTitleSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, title } = input

      const board = await ctx.db.board.update({
        where: { id: boardId },
        data: { title: title.trim() },
      })
      if (board === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      await createAuditLog({
        teamId: board.teamId,
        entityId: board.id,
        entityTitle: board.title,
        entityType: "BOARD",
        action: "UPDATE",
      })

      return board ?? null
    }),

  deleteBoard: protectedProcedure
    .input(DeleteBoardSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId } = input

      const existingBoard = await ctx.db.board.findUnique({
        where: { id: boardId },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const board = await ctx.db.board.delete({
        where: { id: boardId },
      })

      await decrementAvailableBoardCount(existingBoard.teamId)

      await createAuditLog({
        teamId: existingBoard.teamId,
        entityId: board.id,
        entityTitle: board.title,
        entityType: "BOARD",
        action: "DELETE",
      })

      return board ?? null
    }),

  getBoardsByTeamId: protectedProcedure
    .input(GetBoardsByTeamIdSchema)
    .query(async ({ ctx, input }) => {
      const { teamId } = input
      return await ctx.db.board.findMany({
        where: { teamId },
        orderBy: { createdAt: "desc" },
      })
    }),
})
