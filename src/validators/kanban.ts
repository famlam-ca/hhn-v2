import { BoardVisibility } from "@prisma/client"
import { z } from "zod"

export const CreateBoardSchema = z.object({
  title: z.string().min(3).max(255),
  visibility: z.nativeEnum(BoardVisibility),
  teamId: z.string(),
})
