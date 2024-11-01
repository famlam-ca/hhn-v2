import { z } from "zod"

export const CreateListSchema = z.object({
  boardId: z.string(),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
})

export const GetListsSchema = z.object({
  boardId: z.string(),
})

export const UpdateListSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
})

export const CopyListSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
})

export const DeleteListSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
})

export const UpdateListPositionSchema = z.object({
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      position: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
})
