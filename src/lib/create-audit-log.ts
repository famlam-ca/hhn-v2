import { db } from "@/server/db"
import { getSession } from "@/server/session"
import { ACTION, ENTITY_TYPE } from "@/types"

interface Props {
  teamId: string
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export async function createAuditLog(props: Props) {
  try {
    const { session, user } = await getSession()
    if (session === null || user === null) {
      throw new Error("User not found")
    }

    const { entityId, entityType, entityTitle, action } = props

    await db.auditLog.create({
      data: {
        teamId: props.teamId,
        action,
        entityId,
        entityType,
        entityTitle,
        userId: user.id,
        userImage: user?.image ?? "",
        username: user.name,
      },
    })
  } catch (error) {
    console.error("[AUDIT_LOG_ERROR]", error)
  }
}
