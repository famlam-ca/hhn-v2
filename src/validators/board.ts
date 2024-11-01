import { z } from "zod"

export const CreateBoardSchema = z.object({
  teamId: z.string(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
})

export const UpdateBoardTitleSchema = z.object({
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

export const DeleteBoardSchema = z.object({
  boardId: z.string(),
})

export const GetBoardsByTeamIdSchema = z.object({
  teamId: z.string(),
})
