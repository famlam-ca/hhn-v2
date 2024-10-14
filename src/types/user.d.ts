import { User as UserModel } from "@prisma/client"

export type User = UserModel & {
  // Add custom fields here
}
