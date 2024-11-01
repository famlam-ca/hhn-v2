import { ACTION, ENTITY_TYPE } from "@prisma/client"

import { createAuditLog } from "@/lib/create-audit-log"
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { Card } from "@/types"
import {
  CopyCardSchema,
  CreateCardSchema,
  DeleteCardSchema,
  GetCardByIdSchema,
  UpdateCardDescriptionSchema,
  UpdateCardPositionSchema,
  UpdateCardTitleSchema,
} from "@/validators/card"
import { TRPCError } from "@trpc/server"

export const cardRouter = createTRPCRouter({
  createCard: protectedProcedure
    .input(CreateCardSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, listId, ...values } = input

      const list = await ctx.db.list.findUnique({
        where: {
          id: listId,
          boardId,
        },
        include: { board: true },
      })
      if (list === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "List not found",
        })
      }

      const lastCard = await ctx.db.card.findFirst({
        where: { listId: listId },
        orderBy: { position: "desc" },
        select: { position: true },
      })

      const newPosition = lastCard ? lastCard.position + 1 : 1

      const card = await ctx.db.card.create({
        data: {
          ...values,
          position: newPosition,
          listId: listId,
        },
        include: { list: true },
      })

      await createAuditLog({
        teamId: list.board.teamId,
        entityId: card.id,
        entityTitle: card.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.CREATE,
      })

      return (card as Card) ?? null
    }),

  getCardById: protectedProcedure
    .input(GetCardByIdSchema)
    .query(async ({ ctx, input }) => {
      const { cardId } = input

      const card = await ctx.db.card.findUnique({
        where: {
          id: cardId,
        },
        include: {
          list: {
            include: {
              board: true,
            },
          },
        },
      })
      if (card === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Card not found",
        })
      }
      return (card as Card) ?? null
    }),

  updateCardPosition: protectedProcedure
    .input(UpdateCardPositionSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, items } = input

      const transaction = items.map((card) =>
        ctx.db.card.update({
          where: {
            id: card.id,
            list: {
              boardId,
            },
          },
          data: {
            position: card.position,
            listId: card.listId,
          },
        }),
      )
      const card = await ctx.db.$transaction(transaction)

      return (card as Card[]) ?? null
    }),

  updateCardTitle: protectedProcedure
    .input(UpdateCardTitleSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, cardId, title } = input

      const card = await ctx.db.card.update({
        where: {
          id: cardId,
          list: {
            boardId,
          },
        },
        data: {
          title,
        },
        include: {
          list: {
            include: {
              board: {
                select: {
                  teamId: true,
                },
              },
            },
          },
        },
      })

      await createAuditLog({
        teamId: card.list.board.teamId,
        entityId: card.id,
        entityTitle: card.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.UPDATE,
      })

      return card.title
    }),

  updateCardDescription: protectedProcedure
    .input(UpdateCardDescriptionSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, cardId, description } = input

      const card = await ctx.db.card.update({
        where: {
          id: cardId,
          list: {
            boardId,
          },
        },
        data: {
          description,
        },
        include: {
          list: {
            include: {
              board: true,
            },
          },
        },
      })

      await createAuditLog({
        teamId: card.list.board.teamId,
        entityId: card.id,
        entityTitle: card.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.UPDATE,
      })

      return card.description ?? ""
    }),

  copyCard: protectedProcedure
    .input(CopyCardSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, cardId } = input

      const cardToCopy = await ctx.db.card.findUnique({
        where: {
          id: cardId,
          list: {
            boardId,
          },
        },
        include: {
          list: {
            include: {
              board: true,
            },
          },
        },
      })
      if (cardToCopy === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Card not found",
        })
      }

      const lastCard = await ctx.db.card.findFirst({
        where: { listId: cardToCopy.listId },
        orderBy: { position: "desc" },
        select: { position: true },
      })

      const newPosition = lastCard ? lastCard.position + 1 : 1

      const newCard = await ctx.db.card.create({
        data: {
          title: `${cardToCopy.title} copy`,
          description: cardToCopy.description,
          position: newPosition,
          listId: cardToCopy.listId,
        },
      })

      await createAuditLog({
        teamId: cardToCopy.list.board.teamId,
        entityId: newCard.id,
        entityTitle: newCard.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.CREATE,
      })

      return newCard
    }),

  deleteCard: protectedProcedure
    .input(DeleteCardSchema)
    .mutation(async ({ ctx, input }) => {
      const { boardId, cardId } = input

      const card = await ctx.db.card.delete({
        where: {
          id: cardId,
          list: {
            boardId,
          },
        },
      })

      return card ?? null
    }),
})
