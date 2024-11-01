import { ACTION, AuditLog } from "@prisma/client"

export function generateLogMessage(log: AuditLog) {
  const { action, entityTitle, entityType } = log

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`
  }
}
