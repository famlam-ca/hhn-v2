"use client"

import { ROLE } from "@prisma/client"
import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAction } from "@/hooks/use-action"
import { User } from "@/types"

import {
  changeUserRole,
  deleteUserAction,
  deleteUserSessions,
} from "../actions"

export default function UserActions({ row }: { row: Row<User> }) {
  const router = useRouter()

  const user = row.original
  const currentUser = {
    id: "999",
    role: "ADMIN",
  }

  const { execute: changeRole, isLoading: isChangingRole } =
    useAction(changeUserRole)
  const { execute: deleteSessions, isLoading: isDeletingSessions } =
    useAction(deleteUserSessions)
  const { execute: deleteUser, isLoading: isDeletingUser } =
    useAction(deleteUserAction)

  const handleChangeRole = async (role: ROLE) => {
    await changeRole(
      { id: user.id, role },
      {
        onSuccess: () => {
          toast.success("Role changed successfully")
        },
        onError: (error) => {
          toast.error("Oops!", { description: error })
        },
      },
    )
  }

  const handleDeleteSessions = async () => {
    await deleteSessions({ id: user.id })
  }

  const handleDeleteUser = async () => {
    await deleteUser(
      { id: user.id },
      {
        onSuccess: (data) => {
          toast.success(`${data.deletedUser.name} deleted successfully`)
        },
        onError: (error) => {
          toast.error("Oops!", { description: error })
        },
      },
    )
  }

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${user.id}`)}
          >
            View user
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              disabled={isChangingRole || user.id === currentUser.id}
            >
              <span>Change role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  disabled={isChangingRole || user.role === "ADMIN"}
                  onClick={() => handleChangeRole("ADMIN")}
                >
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={isChangingRole || user.role === "USER"}
                  onClick={() => handleChangeRole("USER")}
                >
                  User
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            disabled={isDeletingSessions || user.sessions.length === 0}
            onClick={handleDeleteSessions}
          >
            Delete Sessions
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => {}}>Edit User</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={isDeletingUser || user.id === currentUser.id}
            onClick={handleDeleteUser}
            className="text-alert-foreground"
          >
            <Trash2 className="size-4" />
            <span className="mt-1">Delete User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
