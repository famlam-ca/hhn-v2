import {
  TeamInvite as TeamInviteModel,
  TeamMember as TeamMemberModel,
  Team as TeamModel,
} from "@prisma/client"

import { Board } from "./board"
import { User } from "./user"

export type Team = TeamModel & {
  boards: Board[]
}

export type TeamMember = TeamMemberModel & {
  user: User
}

export type TeamInvite = TeamInviteModel & {
  team: Team
  creator: User
}
