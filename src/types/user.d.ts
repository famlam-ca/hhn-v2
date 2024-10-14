import { FavoritedBoard, User as UserModel } from "@prisma/client"

import { Board } from "./board"
import { Team } from "./team"

export type User = UserModel & {
  teams: Team[]
  boards: Board[]
  favoritedBoards: FavoritedBoard[]
}
