import type {
  Board as BoardModal,
  Card as CardModal,
  List as ListModal,
  TeamMember as TeamMemberModal,
  Team as TeamModal,
  User as UserModal,
  Session as SessionModal,
} from "@prisma/client"

export type ActionResult = {
  success: boolean
  message: string
  key: string
}

export type Session = SessionModal & {
  teamId: string
}

export type User = UserModal & {
  teamMember: TeamMember
}

export type Board = BoardModal & {
  team: Team
  lists: List[]
}

export type List = ListModal & {
  board: Board
  cards: Card[]
}

export type Card = CardModal & {
  list: List
}

export type Team = TeamModal & {
  boards: Board[]
  members: TeamMember[]
}

export type TeamMember = TeamMemberModal & {
  user: UserModal
  team: Team
}
