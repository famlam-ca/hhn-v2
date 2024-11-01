import { z } from "zod"

export const CreateCardSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
})

export const GetCardByIdSchema = z.object({
  cardId: z.string(),
})

export const UpdateCardPositionSchema = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      position: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
})

export const UpdateCardTitleSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .min(3, { message: "Title must be at least 3 characters" }),
  ),
})

export const UpdateCardDescriptionSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
  ),
})

export const CopyCardSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
})

export const DeleteCardSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
})
