import { ACTION, ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { List } from "@/types"
import {
  CopyListSchema,
  CreateListSchema,
  DeleteListSchema,
  GetListsSchema,
  UpdateListPositionSchema,
  UpdateListSchema,
} from "@/validators/list"
import { TRPCError } from "@trpc/server"

export const listRouter = createTRPCRouter({
  createList: protectedProcedure
    .input(CreateListSchema)
    .mutation(async ({ ctx, input }) => {
      const board = await ctx.db.board.findUnique({
        where: { id: input.boardId },
      })
      if (board === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Board not found",
        })
      }

      const lastList = await ctx.db.list.findFirst({
        where: { boardId: input.boardId },
        orderBy: { position: "desc" },
        select: { position: true },
      })

      const newPosition = lastList ? lastList.position + 1 : 1

      const list = await ctx.db.list.create({
        data: {
          boardId: input.boardId,
          title: input.title,
          position: newPosition,
        },
        include: { cards: true, board: true },
      })

      await createAuditLog({
        teamId: board.teamId,
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.CREATE,
      })

      return (list as List) ?? null
    }),

  getLists: protectedProcedure
    .input(GetListsSchema)
    .query(async ({ ctx, input }) => {
      const { boardId } = input

      const lists = await ctx.db.list.findMany({
        where: {
          boardId: boardId,
          board: {
            team: {
              members: {
                some: {
                  userId: ctx.user.id,
                },
              },
            },
          },
        },
        include: {
          board: true,
          cards: {
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      })
      if (lists === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lists not found",
        })
      }

      return (lists as List[]) ?? null
    }),

  updateList: protectedProcedure
    .input(UpdateListSchema)
    .mutation(async ({ ctx, input }) => {
      const list = await ctx.db.list.update({
        where: { id: input.listId, boardId: input.boardId },
        data: { title: input.title.trim() },
        include: { cards: true, board: true },
      })
      if (list === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        })
      }

      await createAuditLog({
        teamId: list.board.teamId,
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.UPDATE,
      })

      return (list as List) ?? null
    }),

  deleteList: protectedProcedure
    .input(DeleteListSchema)
    .mutation(async ({ ctx, input }) => {
      const list = await ctx.db.list.delete({
        where: { id: input.listId, boardId: input.boardId },
        include: { cards: true, board: true },
      })
      if (list === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        })
      }

      await createAuditLog({
        teamId: list.board.teamId,
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.DELETE,
      })

      return (list as List) ?? null
    }),

  copyList: protectedProcedure
    .input(CopyListSchema)
    .mutation(async ({ ctx, input }) => {
      const listToCopy = await ctx.db.list.findUnique({
        where: { id: input.listId, boardId: input.boardId },
        include: { cards: true, board: true },
      })
      if (listToCopy === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        })
      }

      const lastList = await ctx.db.list.findFirst({
        where: { boardId: input.boardId },
        orderBy: { position: "desc" },
        select: { position: true },
      })

      const newPosition = lastList ? lastList.position + 1 : 1

      const newList = await ctx.db.list.create({
        data: {
          boardId: listToCopy.boardId,
          title: `${listToCopy.title} copy`,
          position: newPosition,
          cards: {
            createMany: {
              data: listToCopy.cards.map((card) => ({
                title: card.title,
                description: card.description,
                position: card.position,
              })),
            },
          },
        },
        include: { cards: true, board: true },
      })

      await createAuditLog({
        teamId: listToCopy.board.teamId,
        entityId: newList.id,
        entityTitle: newList.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.CREATE,
      })

      return (newList as List) ?? null
    }),

  updateListPosition: protectedProcedure
    .input(UpdateListPositionSchema)
    .mutation(async ({ ctx, input }) => {
      const transaction = input.items.map((list) =>
        ctx.db.list.update({
          where: { id: list.id, board: { id: input.boardId } },
          data: { position: list.position },
          include: { cards: true, board: true },
        }),
      )
      const lists = await ctx.db.$transaction(transaction)

      return (lists as List[]) ?? null
    }),
})
