import {
  BoardInvite as BoardInviteModel,
  BoardMember as BoardMemberModel,
  Board as BoardModel,
  FavoritedBoard,
  Task as TaskModel,
} from "@prisma/client"

import { Team } from "@/types/team"
import { User } from "@/types/user"

export type Board = BoardModel & {
  team: Team
  favoritedBy: FavoritedBoard[]
  members: BoardMember[]
  invites: BoardInvite[]
  tasks: TaskModel[]
}

export type BoardMember = BoardMemberModel & {
  user: User
}

export type BoardInvite = BoardInviteModel & {
  board: Board
  creator: User
}
