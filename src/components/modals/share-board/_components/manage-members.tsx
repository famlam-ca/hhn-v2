"use client"

import { MemberRole } from "@prisma/client"
import { Dot } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { BoardMember } from "@/types/board"
import { MEMBER_ROLE } from "@/constants/kanban"

interface ManageMembersProps {
  member: BoardMember
  currentMember: BoardMember
  updateMemberRole: (memberId: string, role: MemberRole | "remove") => void
  isLoading?: boolean
}

export const ManageMembers = ({
  member,
  currentMember,
  updateMemberRole,
  isLoading,
}: ManageMembersProps) => {
  const [memberRole, setMemberRole] = useState<MemberRole | "remove">(
    member.role,
  )

  return (
    <div className="flex items-center">
      <div className="flex flex-grow items-center gap-3">
        <Avatar>
          <AvatarImage
            src={member.user.image || ""}
            alt={member.user.username}
          />
          <AvatarFallback>{member.user.username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-muted-foreground">
          <p className="text-sm">
            {member.user.display_name}{" "}
            {member.userId === currentMember.userId ? (
              <span> (You)</span>
            ) : null}
          </p>
          <div className="flex justify-center text-xs">
            <p>@{member.user.username}</p>
            <Dot className="mt-0.5 size-4 stroke-muted-foreground" />
            <p>Board {memberRole}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[8rem] flex-grow">
        <Select
          defaultValue={memberRole}
          onValueChange={(role: MemberRole | "remove") => {
            setMemberRole(role)
            updateMemberRole(member.id, role)
          }}
        >
          <SelectTrigger className="capitalize">{memberRole}</SelectTrigger>
          <SelectContent className="max-w-xs">
            {MEMBER_ROLE.map((role) => (
              <SelectItem
                key={role.value}
                disabled={
                  role.disabled ||
                  member.userId === currentMember.userId ||
                  (currentMember.role === "admin" && member.role === "owner") ||
                  (currentMember.role === "admin" && role.value === "admin")
                }
                value={role.value}
              >
                <p>{role.label}</p>
                <span className="text-muted-foreground">
                  {role.description}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
