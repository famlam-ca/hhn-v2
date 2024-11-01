import { z } from "zod"

export const GetAuditLogsByCardIdSchema = z.object({
  cardId: z.string(),
  teamId: z.string(),
})
