import { z } from "zod"

export const CreateTeamSchema = z.object({
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

export const GetActiveTeamSchema = z.object({
  teamId: z.string(),
})

export const LeaveTeamSchema = z.object({
  teamId: z.string(),
})

export const SetActiveTeamSchema = z.object({
  sessionId: z.string(),
  teamId: z.string(),
})
