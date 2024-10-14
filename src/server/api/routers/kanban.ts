import { BoardVisibility, InvitePermission, MemberRole } from "@prisma/client"
import jwt from "jsonwebtoken"
import { z } from "zod"

import { env } from "@/env"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { Board, BoardMember } from "@/types/board"
import { CreateBoardSchema } from "@/validators/kanban"
import { TRPCError } from "@trpc/server"

export const kanbanRouter = createTRPCRouter({
  createBoard: protectedProcedure
    .input(CreateBoardSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.teamId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Team ID is required",
        })
      }

      const existingBoard = await ctx.db.board.findFirst({
        where: { title: input.title, teamId: input.teamId },
      })
      if (existingBoard) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Board with this title already exists",
        })
      } else {
        const board = await ctx.db.board.create({
          data: {
            title: input.title,
            visibility: input.visibility,
            ownerId: ctx.user.id,
            teamId: input.teamId,
          },
        })

        await ctx.db.boardMember.create({
          data: { role: "owner", userId: ctx.user.id, boardId: board.id },
        })

        return board.id ?? null
      }
    }),

  closeBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.ownerId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the owner of this board",
        })
      }

      const board = await ctx.db.board.update({
        where: { id: input },
        data: { closed: true, closedAt: new Date() },
        select: { closed: true, closedAt: true },
      })

      return board ?? null
    }),

  reopenBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.ownerId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the owner of this board",
        })
      }

      const board = await ctx.db.board.update({
        where: { id: input },
        data: { closed: false, closedAt: null },
        select: { closed: true, closedAt: true },
      })

      return board ?? null
    }),

  deleteBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input },
        select: { ownerId: true, closed: true, teamId: true },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (!existingBoard.closed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Board must be closed before deletion",
        })
      }
      if (existingBoard.ownerId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the owner of this board",
        })
      }

      const teamBoards = await ctx.db.board.findMany({
        where: { teamId: existingBoard.teamId, ownerId: ctx.user.id },
      })
      if (teamBoards.length === 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete the last board in a team",
        })
      }

      const board = await ctx.db.board.delete({
        where: { id: input },
        select: { id: true },
      })

      return board ?? null
    }),

  moveBoard: protectedProcedure
    .input(z.object({ boardId: z.string(), teamId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input.boardId },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.ownerId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the owner of this board",
        })
      }

      const team = await ctx.db.team.findUnique({
        where: { id: input.teamId },
      })
      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        })
      }
      if (team.id === existingBoard.teamId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Board is already in this team",
        })
      }
      if (team.ownerId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the owner of this team",
        })
      }

      const board = await ctx.db.board.update({
        where: { id: input.boardId },
        data: { teamId: input.teamId },
        select: { teamId: true, team: { select: { name: true } } },
      })

      return board ?? null
    }),

  getBoard: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const board = await ctx.db.board.findUnique({
        where: { id: input },
        include: {
          team: true,
          favoritedBy: true,
          members: { include: { user: true } },
          invites: true,
          tasks: true,
        },
      })
      return (board as Board) ?? null
    }),

  getUserBoards: protectedProcedure.query(async ({ ctx }) => {
    const boards = await ctx.db.board.findMany({
      where: {
        OR: [
          { members: { some: { userId: ctx.user.id } } },
          {
            AND: [
              { team: { members: { some: { userId: ctx.user.id } } } },
              { visibility: { not: "private" } },
            ],
          },
          { AND: [{ visibility: "private" }, { ownerId: ctx.user.id }] },
        ],
        closed: false,
      },
      include: {
        team: true,
        favoritedBy: true,
        members: { include: { user: true } },
        invites: true,
        tasks: true,
      },
    })
    return (boards as Board[]) ?? null
  }),

  getCurrentMember: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.boardMember.findFirst({
        where: { boardId: input, userId: ctx.user.id },
      })
      if (!member) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found",
        })
      }

      return (member as BoardMember) ?? null
    }),

  updateBoardTitle: protectedProcedure
    .input(z.object({ boardId: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input.boardId },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.title === input.title) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "New title is the same as the old one",
        })
      }

      const title = await ctx.db.board.update({
        where: { id: input.boardId },
        data: { title: input.title },
        select: { title: true },
      })

      return title ?? null
    }),

  updateBoardDescription: protectedProcedure
    .input(
      z.object({ boardId: z.string(), description: z.string().nullable() }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: {
          id: input.boardId,
          OR: [
            { ownerId: ctx.user.id },
            { members: { some: { userId: ctx.user.id, role: "admin" } } },
          ],
        },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.description === input.description) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "New description is the same as the old one",
        })
      }

      const description = await ctx.db.board.update({
        where: { id: input.boardId },
        data: { description: input.description },
        select: { description: true },
      })

      return description ?? null
    }),

  updateBoardCover: protectedProcedure
    .input(
      z.object({ boardId: z.string(), coverUrl: z.string().url().nullable() }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: {
          id: input.boardId,
          OR: [
            { ownerId: ctx.user.id },
            { members: { some: { userId: ctx.user.id, role: "admin" } } },
          ],
        },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const coverUrl = await ctx.db.board.update({
        where: { id: input.boardId },
        data: { coverUrl: input.coverUrl },
        select: { coverUrl: true },
      })

      return coverUrl ?? null
    }),

  favoriteBoard: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const existingFavorite = await ctx.db.favoritedBoard.findUnique({
        where: { userId_boardId: { userId: ctx.user.id, boardId: input } },
      })
      if (existingFavorite) {
        return ctx.db.favoritedBoard.update({
          where: { userId_boardId: { userId: ctx.user.id, boardId: input } },
          data: { favorited: !existingFavorite.favorited },
        })
      } else {
        return ctx.db.favoritedBoard.create({
          data: { userId: ctx.user.id, boardId: input },
          select: { favorited: true },
        })
      }
    }),

  updateBoardVisibility: protectedProcedure
    .input(
      z.object({
        boardId: z.string(),
        visibility: z.nativeEnum(BoardVisibility),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input.boardId },
        include: { members: true },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }
      if (existingBoard.visibility === input.visibility) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Visibility is the same as the current one",
        })
      }

      const currentMember = existingBoard.members.find(
        (member) => member.userId === ctx.user.id,
      )
      if (!currentMember) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of this board",
        })
      }
      if (currentMember.role !== "owner" && currentMember.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to change visibility",
        })
      }

      const visibility = await ctx.db.board.update({
        where: { id: input.boardId },
        data: { visibility: input.visibility },
        select: { visibility: true },
      })

      return visibility ?? null
    }),

  updateMemberRole: protectedProcedure
    .input(
      z.object({
        boardId: z.string(),
        memberId: z.string(),
        role: z.union([z.nativeEnum(MemberRole), z.literal("remove")]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.role === "owner") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot update role to owner",
        })
      }

      const existingMember = await ctx.db.boardMember.findFirst({
        where: { id: input.memberId, boardId: input.boardId },
      })
      console.log(existingMember)
      if (!existingMember) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found",
        })
      }

      const currentMember = await ctx.db.boardMember.findFirst({
        where: { boardId: input.boardId, userId: ctx.user.id },
      })
      if (!currentMember) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of this board",
        })
      }
      if (currentMember.role !== "owner" && currentMember.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to update member roles",
        })
      }

      if (currentMember.role === "admin") {
        if (existingMember.role === "owner" || input.role === "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to update this member",
          })
        }
      }
      if (currentMember.userId === input.memberId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot update your own role",
        })
      }

      if (input.role === "remove") {
        await ctx.db.boardMember.delete({
          where: { id: input.memberId },
        })
      } else {
        const boardMember = await ctx.db.boardMember.update({
          where: { id: input.memberId },
          data: { role: input.role },
        })
        return (boardMember as BoardMember) ?? null
      }
    }),

  getBoardMembers: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (!input) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Board ID is required",
        })
      }

      const members = await ctx.db.boardMember.findMany({
        where: { boardId: input },
        include: { user: true },
      })

      return (members as BoardMember[]) ?? null
    }),

  createInvite: protectedProcedure
    .input(
      z.object({
        boardId: z.string(),
        permission: z.nativeEnum(InvitePermission),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input.boardId },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const token = Math.random().toString().substring(2, 8)
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
      const jwtToken = jwt.sign(
        { boardId: input.boardId, permission: input.permission, token },
        env.JWT_SECRET,
        { expiresIn: expiresAt.getTime() },
      )

      const url = `${env.NEXT_URL}/kanban/invite?token=${jwtToken}`

      const existingInvite = await ctx.db.boardInvite.findFirst({
        where: { boardId: input.boardId },
      })
      if (existingInvite) {
        return ctx.db.boardInvite.update({
          where: { id: existingInvite.id },
          data: { url, permission: input.permission, expiresAt },
        })
      } else {
        const boardMember = await ctx.db.boardMember.findFirst({
          where: { boardId: input.boardId, userId: ctx.user.id },
        })
        if (!boardMember) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not a member of this board",
          })
        }

        const invite = await ctx.db.boardInvite.create({
          data: {
            url,
            permission: input.permission,
            boardId: input.boardId,
            creatorId: boardMember.id,
            expiresAt,
          },
          select: { url: true },
        })

        return invite ?? null
      }
    }),

  deleteInvite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingBoard = await ctx.db.board.findUnique({
        where: { id: input },
      })
      if (!existingBoard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const existingInvite = await ctx.db.boardInvite.findFirst({
        where: { boardId: input },
      })
      if (!existingInvite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invite not found",
        })
      }

      return await ctx.db.boardInvite.delete({
        where: {
          id: existingInvite.id,
          OR: [
            { creatorId: ctx.user.id },
            {
              board: {
                OR: [
                  { ownerId: ctx.user.id },
                  { members: { some: { userId: ctx.user.id, role: "admin" } } },
                ],
              },
            },
          ],
        },
      })
    }),

  getInvites: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const invites = await ctx.db.boardInvite.findMany({
        where: { boardId: input },
        include: { creator: { include: { user: true } } },
      })
      return invites ?? null
    }),
})
