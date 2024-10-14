import { BoardVisibility, MemberRole } from "@prisma/client"

export const BOARD_VISIBILITY = [
  { label: "Private", value: BoardVisibility.private },
  { label: "Team", value: BoardVisibility.team },
  { label: "Public", value: BoardVisibility.public },
]

export const MEMBER_ROLE = [
  {
    label: "Owner",
    value: MemberRole.owner,
    description: "There can only be one board owner.",
    disabled: true,
  },
  {
    label: "Admin",
    value: MemberRole.admin,
    description:
      "Board admins can view and edit cards, lists, and some board settings.",
  },
  {
    label: "Member",
    value: MemberRole.member,
    description:
      "Board members can view and edit cards, lists, and some board.",
  },
  {
    label: "Observer",
    value: MemberRole.observer,
    description: "Board observers can view and comment.",
  },
  {
    label: "Remove",
    value: "remove",
  },
]
